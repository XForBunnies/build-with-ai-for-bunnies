import { Link, useLocation } from "wouter";
import { partChapters } from "../lib/book";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentSlug = location === "/" ? null : location.replace("/read/", "");

  const navContent = (
    <div className="sidebar-inner">
      {/* Logo */}
      <Link to="/" onClick={() => setMobileOpen(false)}>
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🐇</span>
          <div>
            <div className="sidebar-logo-title">Building Apps with AI</div>
            <div className="sidebar-logo-sub">for Bunnies · Sunny R Gupta</div>
          </div>
        </div>
      </Link>

      <div className="sidebar-divider" />

      {/* Front matter */}
      {[
        { slug: "foreword", label: "Foreword" },
        { slug: "introduction", label: "Introduction" },
      ].map(item => (
        <Link key={item.slug} to={`/read/${item.slug}`} onClick={() => setMobileOpen(false)}>
          <div className={`sidebar-item sidebar-item-special ${currentSlug === item.slug ? "active" : ""}`}>
            <span>{item.label}</span>
          </div>
        </Link>
      ))}

      <div className="sidebar-divider" />

      {/* Parts & Chapters */}
      {partChapters.map(part => (
        <div key={part.num} className="sidebar-part">
          <div className="sidebar-part-label" style={{ borderLeftColor: part.color }}>
            Part {part.num}: {part.title}
          </div>
          {part.chapters.map(ch => (
            <Link key={ch.id} to={`/read/${ch.slug}`} onClick={() => setMobileOpen(false)}>
              <div className={`sidebar-item ${currentSlug === ch.slug ? "active" : ""}`}>
                <span className="sidebar-ch-num">{ch.chapterNum}</span>
                <span className="sidebar-ch-title">{ch.title}</span>
              </div>
            </Link>
          ))}
        </div>
      ))}

      <div className="sidebar-divider" />

      {/* Reference */}
      <div className="sidebar-part-label" style={{ borderLeftColor: "#8a8478" }}>Reference</div>
      {[
        { slug: "glossary", label: "Glossary" },
        { slug: "cheatsheet", label: "Cheat Sheet" },
        { slug: "about-the-author", label: "About the Author" },
      ].map(item => (
        <Link key={item.slug} to={`/read/${item.slug}`} onClick={() => setMobileOpen(false)}>
          <div className={`sidebar-item sidebar-item-special ${currentSlug === item.slug ? "active" : ""}`}>
            <span>{item.label}</span>
          </div>
        </Link>
      ))}

      <div style={{ height: "2rem" }} />
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop sidebar */}
      <aside className="sidebar">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <aside className="sidebar sidebar-mobile" onClick={e => e.stopPropagation()}>
            {navContent}
          </aside>
        </div>
      )}

      <style>{`
        .sidebar {
          width: 280px;
          min-width: 280px;
          height: 100vh;
          position: sticky;
          top: 0;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--border);
          overflow-y: auto;
          flex-shrink: 0;
        }
        .sidebar-inner {
          padding: 1.5rem 0;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1.5rem;
          cursor: pointer;
          text-decoration: none;
          margin-bottom: 0.5rem;
        }
        .sidebar-logo:hover .sidebar-logo-title { color: var(--accent); }
        .sidebar-logo-icon { font-size: 1.6rem; line-height: 1; }
        .sidebar-logo-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.2;
          transition: color 0.2s;
        }
        .sidebar-logo-sub {
          font-size: 0.68rem;
          color: var(--text-muted);
          line-height: 1.2;
        }
        .sidebar-divider {
          height: 1px;
          background: var(--border);
          margin: 0.75rem 1.5rem;
        }
        .sidebar-part {
          margin-bottom: 0.5rem;
        }
        .sidebar-part-label {
          font-size: 0.68rem;
          font-family: 'Lora', serif;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          padding: 0.5rem 1.5rem 0.3rem 1.2rem;
          border-left: 2px solid var(--border);
          margin: 0.3rem 0 0.1rem 0;
        }
        .sidebar-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 0.35rem 1.5rem 0.35rem 1.2rem;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          border-left: 2px solid transparent;
          text-decoration: none;
        }
        .sidebar-item:hover {
          background: var(--surface);
          border-left-color: var(--border);
        }
        .sidebar-item.active {
          background: rgba(212, 168, 83, 0.1);
          border-left-color: var(--accent);
        }
        .sidebar-item.active .sidebar-ch-title,
        .sidebar-item.active span {
          color: var(--accent);
        }
        .sidebar-item-special {
          font-size: 0.88rem;
          color: var(--text-muted);
          gap: 0.5rem;
          align-items: center;
          padding: 0.4rem 1.5rem;
        }
        .sidebar-item-special:hover span { color: var(--text); }
        .sidebar-item-special.active span { color: var(--accent) !important; }
        .sidebar-ch-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--text-muted);
          min-width: 1.4rem;
          margin-top: 0.15rem;
          line-height: 1.5;
        }
        .sidebar-ch-title {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
          transition: color 0.15s;
        }
        .sidebar-item:hover .sidebar-ch-title { color: var(--text); }

        /* Mobile */
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1000;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .mobile-overlay { display: none; }
        .sidebar-mobile {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 999;
          height: 100vh;
        }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .mobile-menu-btn { display: flex; }
          .mobile-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.7);
            z-index: 998;
          }
        }
      `}</style>
    </>
  );
}
