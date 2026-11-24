# Hermes Chatbot with RAG

Chatbot tanya jawab berbasis **Retrieval-Augmented Generation (RAG)**: pengguna mengunggah dokumen PDF, lalu dapat bertanya dan menerima jawaban yang disusun oleh model bahasa (LLM) berdasarkan isi dokumen tersebut, bukan berdasarkan pengetahuan umum model.

Repositori ini memuat dua bagian: antarmuka web (Next.js) dan backend RAG (FastAPI, Python) yang menangani pemrosesan dokumen, pencarian vektor, dan penyusunan jawaban.

## Fitur Utama

- **Unggah dokumen PDF** melalui endpoint `/upload`; teks diekstrak dan dipecah menjadi potongan (chunk) yang menghormati struktur dokumen.
- **Chunking sadar struktur dokumen** dengan LlamaIndex `MarkdownNodeParser`, termasuk pengenalan pola judul dokumen Indonesia (BAB, Pasal, Bagian, Subbab) sebagai batas alami antar-chunk, dengan ukuran sasaran sekitar 200 kata dan maksimum 300 kata per chunk.
- **Embedding multibahasa** menggunakan FastEmbed (`BAAI/bge-small-en-v1.5`, 384 dimensi).
- **Pencarian kemiripan vektor** dengan FAISS (`IndexFlatIP`, inner product setara cosine similarity), mengambil 10 chunk paling relevan (top-K = 10) untuk setiap pertanyaan.
- **Penyusunan jawaban oleh LLM** melalui API yang kompatibel dengan OpenAI, dengan mekanisme fallback berlapis: klien LLM utama dicoba terlebih dahulu, kemudian klien cadangan, dan apabila keduanya gagal tersedia fallback pencarian kata kunci dari chunk yang tersimpan.
- **Deteksi sapaan** agar pertanyaan ringan seperti salam dijawab tanpa memanggil LLM.
- **Persistensi lokal**: chunk, metadata dokumen, dan indeks vektor disimpan ke berkas `.chunks.jsonl`, `.metadata.txt`, dan `.vectors.faiss`, sehingga data tetap tersedia setelah server dimulai ulang.
- **Endpoint pendukung**: `/query` untuk bertanya, `/reset` untuk mengosongkan dokumen dan indeks, serta `/health` untuk memeriksa status server.

## Cara Kerja

1. Pengguna mengunggah berkas PDF melalui antarmuka web atau endpoint `/upload`.
2. Backend mengekstrak teks PDF (pypdf), lalu memecahnya menjadi chunk berdasarkan struktur dokumen.
3. Setiap chunk diubah menjadi vektor embedding dan disimpan ke dalam indeks FAISS.
4. Saat pengguna bertanya melalui `/query`, pertanyaan diubah menjadi vektor dan dicocokkan dengan indeks untuk mengambil 10 chunk paling relevan.
5. Chunk terpilih dikirim sebagai konteks kepada LLM, yang menyusun jawaban berdasarkan konteks tersebut.
6. Apabila LLM tidak tersedia, sistem menjawab dengan fallback kata kunci dari chunk yang tersimpan.

## Dokumen Bawaan

Indeks bawaan pada repositori ini berisi cerita rakyat berbahasa Madura, **"Jokothole Aperrang Alaban Pangeran Nagare Kelling"**, sebagai dokumen contoh. Dokumen tersebut dapat diganti dengan PDF lain melalui fitur unggah, atau dikosongkan melalui endpoint `/reset`.

## Tumpukan Teknologi

| Bagian | Teknologi |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Backend | FastAPI, Uvicorn, Python |
| Pencarian vektor | FAISS |
| Embedding | FastEmbed, `BAAI/bge-small-en-v1.5` |
| Chunking | LlamaIndex `MarkdownNodeParser` |
| Ekstraksi PDF | pypdf |
| LLM | API yang kompatibel dengan OpenAI (dikonfigurasi melalui environment variable) |

## Struktur Proyek

```
.
├── app/                # Halaman dan komponen antarmuka (Next.js App Router)
├── components/         # Komponen UI
├── main.py             # Backend FastAPI: upload, chunking, embedding, retrieval, jawaban LLM
├── docs/               # Dokumentasi alur (diagram upload-query-flow.puml)
├── .chunks.jsonl       # Chunk dokumen yang tersimpan
├── .metadata.txt       # Teks/metadata dokumen yang sedang aktif
├── .vectors.faiss      # Indeks vektor FAISS yang tersimpan
└── package.json        # Skrip dan dependensi frontend
```

## Menjalankan Secara Lokal

### Backend

```bash
pip install fastapi uvicorn faiss-cpu fastembed llama-index-core pypdf openai python-dotenv numpy
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
npm install
npm run dev
```

Antarmuka web kemudian dapat diakses melalui alamat yang ditampilkan Next.js (bawaan `http://localhost:3000`).

## Konfigurasi

Backend membaca konfigurasi LLM dari environment variable (gunakan berkas `.env`, jangan pernah menulis kunci API secara langsung di dalam kode):

| Variable | Keterangan |
|---|---|
| `OPENCODE_API_KEY` | Kunci API untuk klien LLM utama (contoh nilai: `api....`) |
| `OPENCODE_BASE_URL` | Alamat dasar API LLM utama (contoh format: `https://url.com/v1`) |
| `OPENCODE_MODEL` | Nama model untuk klien LLM utama |
| `OPENROUTER_API_KEY` | Kunci API untuk klien LLM cadangan (contoh nilai: `api....`) |
| `OPENROUTER_BASE_URL` | Alamat dasar API LLM cadangan (contoh format: `https://url.com/v1`) |
| `OPENROUTER_MODEL` | Nama model untuk klien LLM cadangan |

## Endpoint API

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/upload` | Mengunggah PDF, mengekstrak teks, membuat chunk dan embedding, lalu menyimpan indeks |
| POST | `/query` | Mengirim pertanyaan dan menerima jawaban berdasarkan chunk paling relevan |
| POST | `/reset` | Menghapus dokumen, chunk, dan indeks yang tersimpan |
| GET | `/health` | Memeriksa status server |
| GET | `/` | Menyajikan antarmuka web |

## Status

Proyek ini merupakan implementasi RAG yang berjalan secara lokal dengan penyimpanan vektor berbasis berkas. Untuk kebutuhan produksi berskala besar, penyimpanan vektor dan dokumen perlu dipindahkan ke layanan basis data vektor yang terdedikasi.
