import os
import json
import time
from pathlib import Path
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pypdf import PdfReader
from openai import OpenAI
from dotenv import load_dotenv
import faiss
from fastembed import TextEmbedding

load_dotenv()

# ---------------------------------------------------------------------------
# LLM Configuration
# ---------------------------------------------------------------------------
OPENCODE_API_KEY = os.environ.get("OPENCODE_API_KEY", "")
OPENCODE_BASE_URL = os.environ.get("OPENCODE_BASE_URL", "https://api.deepseek.com")
OPENCODE_MODEL = os.environ.get("OPENCODE_MODEL", "deepseek-chat")

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = os.environ.get("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
OPENROUTER_MODEL = os.environ.get("OPENROUTER_MODEL", "openrouter/auto")

opencode_client = OpenAI(api_key=OPENCODE_API_KEY, base_url=OPENCODE_BASE_URL) if OPENCODE_API_KEY else None
openrouter_client = OpenAI(api_key=OPENROUTER_API_KEY, base_url=OPENROUTER_BASE_URL) if OPENROUTER_API_KEY else None

# ---------------------------------------------------------------------------
# Vector store – FAISS + dense embeddings (multilingual)
# ---------------------------------------------------------------------------
EMBED_MODEL = TextEmbedding(model_name="BAAI/bge-small-en-v1.5")
EMBED_DIM = 384
TOP_K = 10

doc_metadata: str = ""
chunk_texts: list[str] = []
embedding_index: faiss.Index | None = None

BASE_DIR = Path(__file__).parent
CHUNKS_FILE = BASE_DIR / ".chunks.jsonl"
METADATA_FILE = BASE_DIR / ".metadata.txt"
VECTORS_FILE = BASE_DIR / ".vectors.faiss"


def _init_index() -> faiss.Index:
    """Return a fresh FAISS IndexFlatIP (Inner Product ≈ cosine similarity)."""
    return faiss.IndexFlatIP(EMBED_DIM)


def _load_state() -> None:
    """Reload persisted vectors, chunks & metadata from disk.

    If vectors file is absent but chunks exist, the index is rebuilt
    lazily on the first query (not at startup) to avoid blocking boot.
    """
    global doc_metadata, chunk_texts, embedding_index
    try:
        if METADATA_FILE.exists():
            doc_metadata = METADATA_FILE.read_text(encoding="utf-8")
        if CHUNKS_FILE.exists():
            chunk_texts = [
                json.loads(line)["text"]
                for line in CHUNKS_FILE.read_text(encoding="utf-8").splitlines()
                if line.strip()
            ]
        if VECTORS_FILE.exists():
            embedding_index = faiss.read_index(str(VECTORS_FILE))
        else:
            embedding_index = _init_index()
    except Exception:
        chunk_texts = []
        doc_metadata = ""
        embedding_index = _init_index()


def _save_state() -> None:
    """Persist vectors, chunks & metadata to disk."""
    METADATA_FILE.write_text(doc_metadata, encoding="utf-8")
    with open(CHUNKS_FILE, "w", encoding="utf-8") as f:
        for ch in chunk_texts:
            f.write(json.dumps({"text": ch}, ensure_ascii=False) + "\n")
    if embedding_index is not None and embedding_index.ntotal > 0:
        faiss.write_index(embedding_index, str(VECTORS_FILE))
    elif VECTORS_FILE.exists():
        VECTORS_FILE.unlink()


# ---------------------------------------------------------------------------
# Document-aware chunking — LlamaIndex MarkdownNodeParser
# ---------------------------------------------------------------------------
import re
from llama_index.core.node_parser import MarkdownNodeParser
from llama_index.core.schema import Document


def chunk_by_document(text: str, target_words: int = 200, max_words: int = 300) -> list[str]:
    """Chunk text respecting document structure (headings, paragraphs).

    Uses LlamaIndex MarkdownNodeParser under the hood.
    Detects Indonesian document headings (BAB, Pasal, Bagian, dll)
    and uses them as natural chunk boundaries.
    """
    # Preprocess common Indonesian heading patterns → markdown headings
    # so MarkdownNodeParser can split on them
    _preprocessed = re.sub(
        r"(?m)^(BAB\s+[IVXLCDM\d]+|Pasal\s+\d+|Bagian\s+\d+|Subbab\s+\d+)\.?\s*$",
        r"# \1",
        text,
    )

    doc = Document(text=_preprocessed)
    parser = MarkdownNodeParser()
    nodes = parser.get_nodes_from_documents([doc])

    chunks: list[str] = []
    for node in nodes:
        content = node.get_content().strip()
        if not content:
            continue

        wc = len(content.split())
        # Single short chunk → keep as-is
        if wc <= max_words:
            chunks.append(content)
            continue

        # Long section → split per paragraph, merge up to target_words
        paragraphs = [p.strip() for p in re.split(r"\n\s*\n", content) if p.strip()]
        current: list[str] = []
        cw = 0
        for para in paragraphs:
            pw = len(para.split())
            if current and cw + pw > target_words and cw >= target_words * 0.5:
                chunks.append("\n\n".join(current))
                current = []
                cw = 0
            current.append(para)
            cw += pw
        if current:
            chunks.append("\n\n".join(current))

    return chunks if chunks else [text]


# ---------------------------------------------------------------------------
# Embedding helpers (multilingual-e5 needs passage:/query: prefixes)
# ---------------------------------------------------------------------------
def _embed_texts(texts: list[str]) -> np.ndarray:
    """Generate normalised dense embeddings for a list of texts."""
    vecs = np.array(list(EMBED_MODEL.embed(texts)), dtype=np.float32)
    faiss.normalize_L2(vecs)
    return vecs


def _embed_query(query: str) -> np.ndarray:
    """Generate normalised embedding for a single query."""
    vecs = np.array(list(EMBED_MODEL.query_embed(query)), dtype=np.float32)
    faiss.normalize_L2(vecs)
    return vecs


# ---------------------------------------------------------------------------
# Greeting detection
# ---------------------------------------------------------------------------
_GREETINGS = {
    "halo", "hai", "hi", "hey", "pagi", "siang", "sore", "malam",
    "tes", "test", "hallo", "helo", "hello", "selamat",
}


def _is_greeting(text: str) -> bool:
    t = text.lower().strip().rstrip(".!?")
    words = t.split()
    if len(words) > 3:
        return False
    return all(w in _GREETINGS or not w.isalpha() for w in words)


def _greeting_reply(query: str) -> str:
    q = query.strip().lower().rstrip(".!?")
    if "pagi" in q:
        return "Selamat pagi! Ada yang bisa saya bantu dari dokumen yang sudah diunggah?"
    if "siang" in q:
        return "Selamat siang! Silakan tanya sesuatu tentang isi dokumen."
    if "sore" in q:
        return "Selamat sore! Ada informasi yang ingin Anda cari?"
    if "malam" in q:
        return "Selamat malam! Silakan ajukan pertanyaan tentang dokumen."
    if q in ("tes", "test"):
        return "Halo! Sistem siap. Ada pertanyaan tentang dokumen yang bisa saya bantu?"
    return "Halo! Ada yang bisa saya bantu dari dokumen yang sudah diunggah?"


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
STATIC_DIR = BASE_DIR / "static"
STATIC_DIR.mkdir(exist_ok=True)

app = FastAPI(title="RAG Document Assistant — Vector RAG")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Warm up: load persisted state + download embedding model
_load_state()
_ = EMBED_MODEL  # trigger model download on first start


# ---------------------------------------------------------------------------
# POST /upload/
# ---------------------------------------------------------------------------
@app.post("/upload")
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    filename = file.filename
    if not filename:
        raise HTTPException(status_code=400, detail="Filename is missing.")

    ext = os.path.splitext(filename)[1].lower()
    if ext not in (".pdf", ".txt"):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type: {ext}. Only .pdf and .txt are allowed.",
        )

    try:
        text_content = ""
        if ext == ".pdf":
            reader = PdfReader(file.file)
            parts = []
            for page in reader.pages:
                txt = page.extract_text()
                if txt:
                    parts.append(txt)   
            text_content = "\n".join(parts)
            if not text_content.strip():
                raise ValueError("PDF has no extractable text.")
        else:
            content_bytes = await file.read()
            text_content = content_bytes.decode("utf-8")

        # --- Word‑based chunking ---
        global doc_metadata, chunk_texts, embedding_index
        doc_metadata = " ".join(text_content.split()[:200]).strip()
        chunks = chunk_by_document(text_content)

        if not chunks:
            raise HTTPException(status_code=400, detail="No extractable content in file.")

        # --- Generate embeddings & build FAISS index ---
        chunk_texts = chunks
        embeddings = _embed_texts(chunks)
        embedding_index = _init_index()
        embedding_index.add(embeddings)

        # --- Persist ---
        _save_state()

        # Backup full text to AGENTS.md
        (BASE_DIR / "AGENTS.md").write_text(
            f"# DOKUMEN REFERENSI UTAMA\n\n{text_content}\n", encoding="utf-8"
        )

        return {
            "status": "success",
            "message": f"Successfully processed and stored {filename}.",
            "extracted_chars": len(text_content),
            "chunks": len(chunks),
            "metadata_chars": len(doc_metadata),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")


# ---------------------------------------------------------------------------
# POST /query/
# ---------------------------------------------------------------------------
@app.post("/query")
@app.post("/query/")
async def query_documents(data: dict):
    global embedding_index
    query = data.get("query", "").strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query is required.")

    # --- Greeting detection (runs even without indexed doc) ---
    if _is_greeting(query):
        return {
            "status": "success",
            "query": query,
            "answer": _greeting_reply(query),
            "matches": 0,
            "chunks": [],
        }

    # Ensure state is loaded
    if not chunk_texts:
        _load_state()

    # Lazy rebuild: chunks exist but no saved FAISS index
    if chunk_texts and (embedding_index is None or embedding_index.ntotal == 0):
        print(f"Lazily rebuilding FAISS index from {len(chunk_texts)} chunks...")
        embedding_index = _init_index()
        embedding_index.add(_embed_texts(chunk_texts))
        _save_state()

    if not chunk_texts or embedding_index is None or embedding_index.ntotal == 0:
        raise HTTPException(status_code=404, detail="No document indexed yet. Upload a file first.")

    # --- Vector similarity search (top‑10) ---
    q_vec = _embed_query(query)                         # shape (1, 384)
    distances, indices = embedding_index.search(q_vec, TOP_K)

    top_chunks = []
    for idx in indices[0]:
        if 0 <= idx < len(chunk_texts):
            top_chunks.append(chunk_texts[idx])

    if not top_chunks:
        # fallback: take first few chunks
        top_chunks = chunk_texts[:3]

    # --- LLM answer ---
    answer = generate_answer(query, top_chunks, doc_metadata)

    return {
        "status": "success",
        "query": query,
        "answer": answer,
        "matches": len(top_chunks),
        "chunks": top_chunks,
    }


# ---------------------------------------------------------------------------
# LLM Answer Generation
# ---------------------------------------------------------------------------
def generate_answer(query: str, chunks: list[str], metadata: str) -> str:
    """Send query + vector‑retrieved context to LLM with semantic metadata injection."""

    def _try_client(c, model, label, retries=2):
        if not c:
            return False, "Client not configured", False

        context = "\n\n---\n\n".join(chunks[:10]) if chunks else "(Tidak ada konteks yang relevan.)"

        system_prompt = f"""Kamu adalah asisten dokumen AI yang cerdas, ramah, dan natural dalam berbahasa Indonesia.

Aturan:
1. Jawab berdasarkan informasi yang ada di [INFO DOKUMEN] dan [KONTEKS] di bawah ini.
2. Tulis jawaban dengan bahasa Indonesia yang alami dan mengalir, seperti orang ngobrol biasa. Jangan kaku, jangan formal berlebihan.
3. Jika informasi tidak ditemukan di konteks, jawab dengan wajar: "Maaf, info itu tidak ada di dokumen yang saya punya."
4. Kalau ada data spesifik (nomor surat, tanggal, lokasi, dll), sampaikan secara jelas tapi tetap mengalir, bukan seperti daftar.

[INFO DOKUMEN]
{metadata}

[KONTEKS]
{context}"""

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query},
        ]

        for attempt in range(retries):
            try:
                resp = c.chat.completions.create(
                    model=model,
                    messages=messages,
                    temperature=0.3,
                    max_tokens=4096,
                )
                return True, resp.choices[0].message.content.strip(), False
            except Exception as e:
                error_str = str(e).lower()
                is_limit = any(
                    kw in error_str
                    for kw in [
                        "rate limit", "rate_limit", "quota", "429", "402",
                        "limit exceeded", "insufficient_quota", "insufficient credits",
                        "billing", "credit limit", "credit balance", "exceeded",
                        "api_limit", "too many requests", "exhausted",
                        "free tier limit", "payment required", "out of credits",
                        "usage limit", "api key limit",
                    ]
                )
                if is_limit:
                    return False, str(e), True
                if attempt < retries - 1:
                    wait = 1.5 * (2**attempt)
                    print(f"{label} error (attempt {attempt+1}/{retries}), "
                          f"retry in {wait:.0f}s: {e}")
                    time.sleep(wait)
                    continue
                return False, str(e), False
        return False, "Max retries exceeded", False

    fail_reason = ""

    # Primary: OpenCode
    if opencode_client:
        ok, result, is_limit = _try_client(opencode_client, OPENCODE_MODEL, "OpenCode")
        if ok:
            return result
        fail_reason = f"OpenCode: {'limit' if is_limit else 'error'}"
        print(f"OpenCode gagal ({fail_reason}), fallback ke OpenRouter...")
        if openrouter_client:
            ok, result, _ = _try_client(openrouter_client, OPENROUTER_MODEL, "OpenRouter")
            if ok:
                return f"[Fallback ke OpenRouter] {result}"
            fail_reason += "; OpenRouter: error"

    # Backup: OpenRouter as primary
    elif openrouter_client:
        ok, result, is_limit = _try_client(openrouter_client, OPENROUTER_MODEL, "OpenRouter")
        if ok:
            return result
        fail_reason = f"OpenRouter: {'limit' if is_limit else 'error'}"

    if not fail_reason:
        fail_reason = "Tidak ada klien LLM yang dikonfigurasi"
    print(f"Semua LLM gagal: {fail_reason}")
    return _keyword_fallback(query, chunks, fail_reason)


def _keyword_fallback(query: str, chunks: list[str], error: str | None = None) -> str:
    prefix = f"[LLM tidak tersedia: {error}]\n\n" if error else ""
    if chunks:
        return f"{prefix}Ditemukan {len(chunks)} bagian relevan:\n\n{chunks[0]}"
    return f"{prefix}Tidak ditemukan bagian yang relevan."


# ---------------------------------------------------------------------------
# POST /reset/
# ---------------------------------------------------------------------------
@app.post("/reset")
@app.post("/reset/")
async def reset_all():
    """Clear all indexed documents, vectors, and persisted state."""
    global doc_metadata, chunk_texts, embedding_index
    doc_metadata = ""
    chunk_texts = []
    embedding_index = _init_index()
    try:
        if CHUNKS_FILE.exists():
            CHUNKS_FILE.unlink()
        if METADATA_FILE.exists():
            METADATA_FILE.unlink()
        if VECTORS_FILE.exists():
            VECTORS_FILE.unlink()
        agents_md = BASE_DIR / "AGENTS.md"
        if agents_md.exists():
            agents_md.write_text("# DOKUMEN REFERENSI UTAMA\n\n", encoding="utf-8")
    except Exception:
        pass
    return {"status": "ok", "message": "All documents, vectors, and chat state have been reset."}


# ---------------------------------------------------------------------------
# Health & root
# ---------------------------------------------------------------------------
@app.get("/health")
@app.get("/health/")
async def health():
    n = embedding_index.ntotal if embedding_index is not None else 0
    return {
        "status": "ok",
        "indexed": len(chunk_texts) > 0,
        "char_count": sum(len(c) for c in chunk_texts),
        "chunks": len(chunk_texts),
        "vectors": n,
    }


@app.get("/")
async def serve_frontend():
    index = STATIC_DIR / "index.html"
    if index.exists():
        return FileResponse(str(index))
    return {
        "status": "ok",
        "message": "RAG Document Assistant API (Vector RAG). Upload at /upload/, query at /query/, health at /health/.",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
