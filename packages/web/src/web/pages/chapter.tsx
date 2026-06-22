import { useParams } from "wouter";
import { useEffect, useRef, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  getMetaBySlug,
  getNextMeta,
  getPrevMeta,
  fetchChapterContent,
  partChapters,
} from "../lib/book";
import { renderMarkdown } from "../lib/markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";

const partColors: Record<number, string> = {
  1: "#5a9e4a",
  2: "#d4a853",
  3: "#e07830",
  4: "#5878d8",
  5: "#9858c8",
};

export default function ChapterPage() {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  const meta = useMemo(() => getMetaBySlug(slug), [slug]);
  const next = useMemo(() => getNextMeta(slug), [slug]);
  const prev = useMemo(() => getPrevMeta(slug), [slug]);

  const { data: content, isLoading, isError } = useQuery({
    queryKey: ["chapter", slug],
    queryFn: () => fetchChapterContent(slug),
    staleTime: Infinity, // content never changes — keep in cache forever
  });

  const html = useMemo(() => (content ? renderMarkdown(content) : ""), [content]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!meta) {
    return (
      <div className="chapter-notfound">
        <h1>Page not found</h1>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const partColor = partColors[meta.part] ?? "var(--accent)";
  const partInfo = partChapters.find(p => p.num === meta.part);

  return (
    <div className="chapter-page">
      {/* Header */}
      <header className="chapter-header">
        <div className="chapter-eyebrow">
          {partInfo && (
            <span className="chapter-part" style={{ color: partColor }}>
              Part {meta.part}: {partInfo.title}
            </span>
          )}
          {partInfo && meta.chapterLabel && <span className="chapter-eyebrow-sep">·</span>}
          {meta.chapterLabel && (
            <span className="chapter-label">{meta.chapterLabel}</span>
          )}
          {!partInfo && meta.part === 99 && (
            <span className="chapter-label" style={{ color: "var(--text-muted)" }}>Reference</span>
          )}
        </div>
        <h1 className="chapter-title">{meta.title}</h1>
        {meta.subtitle && <p className="chapter-subtitle">{meta.subtitle}</p>}
        <div className="chapter-title-bar" style={{ background: partColor }} />
      </header>

      {/* Content */}
      {isLoading && (
        <div className="chapter-loading">
          <div className="chapter-skeleton" />
          <div className="chapter-skeleton" style={{ width: "85%" }} />
          <div className="chapter-skeleton" style={{ width: "92%" }} />
          <div className="chapter-skeleton short" />
          <div className="chapter-skeleton" />
          <div className="chapter-skeleton" style={{ width: "78%" }} />
        </div>
      )}

      {isError && (
        <div className="chapter-error">
          Failed to load chapter. <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!isLoading && !isError && (
        <div
          ref={contentRef}
          className="prose chapter-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {/* Navigation */}
      <nav className="chapter-nav">
        {prev ? (
          <Link to={`/read/${prev.slug}`}>
            <div className="chapter-nav-btn chapter-nav-prev">
              <ArrowLeft size={14} />
              <div>
                <div className="chapter-nav-label">Previous</div>
                <div className="chapter-nav-title">
                  {prev.chapterLabel ? `${prev.chapterLabel}: ` : ""}{prev.title}
                </div>
              </div>
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link to={`/read/${next.slug}`}>
            <div className="chapter-nav-btn chapter-nav-next">
              <div>
                <div className="chapter-nav-label">Next</div>
                <div className="chapter-nav-title">
                  {next.chapterLabel ? `${next.chapterLabel}: ` : ""}{next.title}
                </div>
              </div>
              <ArrowRight size={14} />
            </div>
          </Link>
        ) : <div />}
      </nav>

      <style>{`
        .chapter-notfound {
          padding: 4rem 2rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }
        .chapter-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 2.5rem 5rem;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chapter-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border);
        }
        .chapter-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .chapter-part {
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .chapter-eyebrow-sep { color: var(--border); }
        .chapter-label {
          font-size: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .chapter-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 900;
          color: var(--text);
          margin: 0 0 0.8rem;
          line-height: 1.15;
        }
        .chapter-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          margin: 0 0 1.2rem;
          font-style: italic;
          font-family: 'Lora', serif;
        }
        .chapter-title-bar {
          height: 3px;
          width: 60px;
          border-radius: 2px;
          margin-top: 1.2rem;
        }
        /* Hide duplicate h1 and italic opener from markdown */
        .chapter-content h1 { display: none; }
        .chapter-content > p:first-of-type { display: none; }

        /* Loading skeletons */
        .chapter-loading {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          padding: 0.5rem 0;
        }
        .chapter-skeleton {
          height: 1rem;
          background: linear-gradient(90deg, var(--surface) 25%, var(--surface-raised) 50%, var(--surface) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 4px;
          width: 100%;
        }
        .chapter-skeleton.short { width: 40%; margin-top: 0.5rem; }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .chapter-error {
          padding: 2rem;
          color: var(--text-muted);
          background: var(--surface);
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .chapter-error button {
          background: none;
          border: 1px solid var(--border);
          color: var(--accent);
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 0.5rem;
        }

        /* Nav */
        .chapter-nav {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          align-items: stretch;
        }
        .chapter-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1rem 1.2rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
          flex:1;
          min-width: 0;
          box-sizing: border-box;
        }
        .chapter-nav-btn:hover { border-color: var(--accent); background: var(--surface-raised); }
        .chapter-nav-next { margin-left: auto; text-align: right; }
        .chapter-nav-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
          font-family: 'JetBrains Mono', monospace;
        }
        .chapter-nav-title {
          font-size: 0.85rem;
          color: var(--text);
          line-height: 1.3;
          font-family: 'Lora', serif;
          word-break: break-word;
        }

        @media (max-width: 600px) {
          .chapter-page { padding: 2rem 1.2rem 3rem; }
          .chapter-nav { flex-direction: column; }
          .chapter-nav-btn { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}
