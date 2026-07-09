'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sources?: string[];
}

interface DocumentRef {
  id: string;
  name: string;
  pages: number;
  uploadedAt: Date;
  status: 'indexed' | 'processing' | 'error';
}

type UploadState = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface HealthStatus {
  indexed: boolean;
  char_count: number;
}

// API base: use same-origin proxy via Next.js rewrites (/api/* → backend)
const API = typeof window !== 'undefined'
  ? '/api'
  : 'http://localhost:8000';

const WELCOME_MSG: Message = {
  id: 0,
  content: 'Upload a PDF or TXT file to build a knowledge base. Once indexed, ask questions and I will retrieve relevant passages then generate a natural-language answer using AI.',
  role: 'assistant',
  timestamp: new Date(),
};

const MODEL = 'deepseek-chat';

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

async function fetchHealth(): Promise<HealthStatus> {
  const res = await fetch(`${API}/health/`);
  if (!res.ok) return { indexed: false, char_count: 0 };
  const data = await res.json();
  return { indexed: data.indexed, char_count: data.char_count };
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ChatbotInterface() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [documents, setDocuments] = useState<DocumentRef[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [health, setHealth] = useState<HealthStatus>({ indexed: false, char_count: 0 });
  const [queryError, setQueryError] = useState<string | null>(null);
  const [dark, setDark] = useState(true);
  const [lastTime, setLastTime] = useState<string | null>(null);
  const [lastTokens, setLastTokens] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* init */
  useEffect(() => {
    fetchHealth().then(setHealth);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ---- handlers ---- */

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || isTyping) return;

    setQueryError(null);
    const userMsg: Message = { id: Date.now(), content: text, role: 'user', timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);
    const t0 = performance.now();

    try {
      const res = await fetch(`${API}/query/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || `Server error (${res.status})`);
      }

      const data = await res.json();
      const elapsed = ((performance.now() - t0) / 1000).toFixed(1);
      setLastTime(elapsed);

      let reply = data.answer || (
        data.chunks?.length
          ? `Found ${data.matches} relevant passages:\n\n${data.chunks[0]}`
          : 'No relevant content found. Try a different query or upload another document.'
      );

      const tokEstimate = reply.length / 4;
      setLastTokens(Math.round(tokEstimate));

      const botMsg: Message = {
        id: Date.now() + 1,
        content: reply,
        role: 'assistant',
        timestamp: new Date(),
        sources: data.chunks?.slice(0, 3) ?? [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to query document';
      setQueryError(msg);
      const errMsg: Message = {
        id: Date.now() + 1,
        content: `Error: ${msg}. Make sure the backend is running and a document is indexed.`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [chatInput, isTyping]);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadState('uploading');
    setUploadProgress(0);
    const tempDoc: DocumentRef = {
      id: `d${Date.now()}`,
      name: file.name,
      pages: 1,
      uploadedAt: new Date(),
      status: 'processing',
    };
    setDocuments((prev) => [tempDoc, ...prev]);

    try {
      const data = await new Promise<any>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);

        xhr.upload.addEventListener('progress', (evt) => {
          if (evt.lengthComputable) {
            const pct = Math.round((evt.loaded / evt.total) * 100);
            setUploadProgress(pct);
          }
        });

        xhr.upload.addEventListener('load', () => {
          // Upload complete — server is now processing
          setUploadState('processing');
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch {
              reject(new Error('Invalid server response'));
            }
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              reject(new Error(err.detail || `Upload failed (${xhr.status})`));
            } catch {
              reject(new Error(`Upload failed (${xhr.status})`));
            }
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
        xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));

        xhr.open('POST', `${API}/upload/`);
        xhr.send(formData);
      });

      setUploadState('success');
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === tempDoc.id ? { ...d, status: 'indexed' as const, pages: Math.ceil(data.extracted_chars / 2000) || 1 } : d
        )
      );
      const confirmMsg: Message = {
        id: Date.now(),
        content: `Document indexed: ${file.name} (${data.extracted_chars} characters extracted). You can now ask questions.`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, confirmMsg]);
      setHealth((await fetchHealth()));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploadState('error');
      setDocuments((prev) =>
        prev.map((d) => (d.id === tempDoc.id ? { ...d, status: 'error' as const } : d))
      );
      const errMsg: Message = {
        id: Date.now(),
        content: `Upload failed: ${msg}. Is the backend running at ${API}?`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setTimeout(() => { setUploadState('idle'); setUploadProgress(0); }, 2000);
    }
  }, []);

  /* theme */
  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleReset = useCallback(async () => {
    setMessages([WELCOME_MSG]);
    setDocuments([]);
    setQueryError(null);
    setLastTime(null);
    setLastTokens(null);
    setChatInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    try {
      await fetch(`${API}/reset/`, { method: 'POST' });
    } catch {}
    setHealth({ indexed: false, char_count: 0 });
  }, []);

  const isWelcome = messages.length === 1 && messages[0].id === 0;

  /* ---- render ---- */
  return (
    <div
      className="h-[100dvh] flex flex-col"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* ============ SIMPLE HEADER ============ */}
      <header
        className="h-14 flex items-center shrink-0 px-4"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center text-[12px] font-bold" style={{ background: 'var(--accent)', color: '#09090b' }}>
            RAG
          </div>
          <span className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>RAGPDF!RAG!</span>
        </div>
        <button
          onClick={handleReset}
          className="ml-auto text-[11px] px-3 py-1.5 cursor-pointer"
          style={{ background: 'var(--accent)', border: '1px solid var(--border)', color: '#09090b', borderRadius: 2 }}
          title="Reset documents & chat"
        >
          RESET DOKUMEN DAN CHAT
        </button>
      </header>

      {/* ============ MAIN CONTENT ============ */}
      <main className="flex-1 flex flex-col min-w-0" style={{ background: 'var(--bg-primary)' }}>

          {/* breadcrumb */}
          <div
            className="flex items-center h-8 px-4 text-[11px] shrink-0"
            style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <span>/</span>
            <span style={{ color: 'var(--border-light)' }}>/</span>
            <span style={{ color: 'var(--text-primary)' }}>query</span>
          </div>

          {/* ---- UPLOAD PROGRESS ---- */}
          {(uploadState === 'uploading' || uploadState === 'processing') && (
            <div
              className="flex items-center gap-3 px-4 py-2 text-[11px] shrink-0"
              style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}
            >
              {uploadState === 'uploading' ? (
                <>
                  <div className="flex-1 h-2 rounded-[2px]" style={{ background: 'var(--border)' }}>
                    <div
                      className="h-full rounded-[2px] transition-all duration-200"
                      style={{
                        width: `${uploadProgress}%`,
                        background: 'var(--accent)',
                      }}
                    />
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums', minWidth: 48, textAlign: 'right' }}>
                    {uploadProgress}%
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
                  <span style={{ color: 'var(--text-muted)' }}>Processing document...</span>
                </>
              )}
            </div>
          )}

          {/* ---- WELCOME / EMPTY ---- */}
          {isWelcome && (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <pre
                className="text-[10px] leading-[1.15] select-none"
                style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.15 }}
              >
{`  ____   ___   ____  ____  ___  _    ____   ___  ____ 
 / ___) / _ \\ / _  |/ _  |/ _ \\| |  / / _ \\ / _ \\|  _ \\
| |  _| |_| ( (_| ( (_| | |_| | | / / |_| | |_| | |_) )
| |_|  \\__  \\__,_|\\__,_|\\__,_| |/ / \\__/ \\__,_|  __/ 
 \\____|   )_/      |_____/      |_/        |_|      
`}</pre>
              <div className="text-[14px]" style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                $ <span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite' }}>_</span>
              </div>
              <div className="text-[12px] max-w-md text-center leading-relaxed font-sans" style={{ color: 'var(--text-muted)' }}>
                RAG document query interface. Upload PDF or TXT files, then ask questions using natural language. Powered by keyword retrieval and AI.
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[12px] cursor-pointer px-4 py-2"
                  style={{
                    fontFamily: 'var(--font-sans), Inter, sans-serif',
                    fontWeight: 500,
                    background: 'var(--accent)',
                    color: '#09090b',
                    border: 'none',
                  }}
                >
                  UPLOAD DOCUMENT
                </button>
                {/* Hidden file input — triggered by the upload button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  className="hidden"
                  onChange={handleUpload}
                />
                </div>
              {!health.indexed && (
                <p className="text-[10px] mt-4 font-sans" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  No documents indexed &middot; start by uploading
                </p>
              )}
            </div>
          )}

          {/* ---- CHAT THREAD ---- */}
          {!isWelcome && (
            <div className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
              <div className="max-w-3xl mx-auto">
                {messages.slice(1).map((msg) => (
                  <div key={msg.id} className="flex flex-col">
                    {/* header */}
                    <div
                      className="flex items-center gap-2 px-4 pt-4 pb-1 text-[11px] select-none"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.06em]"
                        style={{ color: msg.role === 'user' ? 'var(--user-accent)' : 'var(--accent)' }}
                      >
                        {msg.role === 'user' ? '\u25B6 INPUT' : '\u25B6 RAGPDF'}
                      </span>
                      <span className="flex-1" style={{ borderTop: '1px solid var(--border)' }} />
                      <span className="font-sans">{formatTime(msg.timestamp)}</span>
                    </div>

                    {/* body */}
                    <div className="px-4 pb-4 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <p style={{ margin: '4px 0', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 pt-2 text-[11px]" style={{ borderTop: '1px solid var(--border)' }}>
                          {msg.sources.slice(0, 2).map((src, i) => (
                            <div key={i} className="flex items-start gap-1.5 mt-1" style={{ color: 'var(--text-muted)' }}>
                              <span className="text-[9px]">\u25B6</span>
                              <span className="line-clamp-2 font-sans">{src}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* typing */}
                {isTyping && (
                  <div className="flex items-center gap-2 px-4 py-3 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)' }}>\u25B6 RAGPDF</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5" style={{ background: 'var(--text-muted)', opacity: 0.4 }} />
                      <span className="w-1.5 h-1.5" style={{ background: 'var(--text-muted)', opacity: 0.6 }} />
                      <span className="w-1.5 h-1.5" style={{ background: 'var(--text-muted)', opacity: 0.8 }} />
                    </div>
                  </div>
                )}

                {/* error */}
                {queryError && (
                  <div
                    className="flex items-center gap-2 mx-4 my-2 px-3 py-2 text-[12px]"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid #ef4444', color: '#ef4444' }}
                  >
                    <span>{queryError}</span>
                    <button
                      onClick={() => setQueryError(null)}
                      className="ml-auto cursor-pointer"
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}
                    >
                      X
                    </button>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {/* ---- REPL INPUT ---- */}
          <div
            className="flex items-center gap-2 px-4 py-2 shrink-0"
            style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}
          >
            <span className="text-[14px] font-medium select-none" style={{ color: 'var(--accent)' }}>$</span>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="type a query..."
              maxLength={2000}
              className="flex-1 text-[13px] outline-none"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                caretColor: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit(e);
              }}
            />
            <div
              className="flex items-center gap-1 text-[10px]"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>{chatInput.length}/2000</span>
            </div>
            <button
              disabled={!chatInput.trim() || isTyping}
              style={{
                padding: '4px 10px',
                background: chatInput.trim() && !isTyping ? 'var(--accent)' : 'var(--bg-elevated)',
                color: chatInput.trim() && !isTyping ? '#09090b' : 'var(--text-muted)',
                border: 'none',
                cursor: chatInput.trim() && !isTyping ? 'pointer' : 'not-allowed',
                fontSize: 12,
              }}
            >
              SEND
            </button>
          </div>

      </main>
    </div>
  );
}
