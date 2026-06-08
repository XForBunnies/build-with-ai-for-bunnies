import { Link } from "wouter";
import { partChapters } from "../lib/book";
import { ArrowRight } from "lucide-react";

const partColors = ["#5a9e4a", "#d4a853", "#e07830", "#5878d8", "#9858c8"];

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-label">A beginner's guide</div>
        <h1 className="hero-title">
          Building Apps<br />
          <span className="hero-title-accent">with AI</span>
        </h1>
        <p className="hero-subtitle">
          for Bunnies 🐇
        </p>
        <p className="hero-desc">
          No computer science degree required. Build real, working AI-powered apps — 
          step by step, with plain English and zero condescension.
        </p>
        <Link to="/read/about-the-author">
          <div className="hero-author">
            <div className="hero-author-avatar">SG</div>
            <div>
              <div className="hero-author-name">Sunny R Gupta</div>
              <div className="hero-author-role">Engineering Leader, JioHotstar · Founder, TeamShiksha & LithSocial</div>
            </div>
          </div>
        </Link>
        <div className="hero-actions">
          <Link to="/read/foreword">
            <button className="btn-primary">
              Start Reading <ArrowRight size={16} />
            </button>
          </Link>
          <Link to="/read/chapter-01">
            <button className="btn-secondary">
              Jump to Chapter 1
            </button>
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><strong>20</strong> Chapters</div>
          <div className="hero-stat-div" />
          <div className="hero-stat"><strong>5</strong> Parts</div>
          <div className="hero-stat-div" />
          <div className="hero-stat"><strong>Free</strong> to read</div>
        </div>
      </section>

      {/* Decorative line */}
      <div className="home-divider" />

      {/* Parts overview */}
      <section className="parts-section">
        <div className="parts-header">
          <div className="parts-label">The Journey</div>
          <h2 className="parts-title">Five Parts. One Goal: Ship Something Real.</h2>
        </div>
        <div className="parts-grid">
          {partChapters.map((part, i) => (
            <Link key={part.num} to={`/read/${part.chapters[0].slug}`}>
              <div className="part-card">
                <div className="part-card-accent" style={{ background: partColors[i] }} />
                <div className="part-card-num" style={{ color: partColors[i] }}>
                  Part {part.num}
                </div>
                <div className="part-card-title">{part.title}</div>
                <div className="part-card-chapters">
                  {part.chapters.length} chapter{part.chapters.length > 1 ? "s" : ""}
                </div>
                <ul className="part-card-list">
                  {part.chapters.slice(0, 3).map(ch => (
                    <li key={ch.id}>{ch.title}</li>
                  ))}
                  {part.chapters.length > 3 && (
                    <li className="more">+{part.chapters.length - 3} more</li>
                  )}
                </ul>
                <div className="part-card-cta" style={{ color: partColors[i] }}>
                  Read Part {part.num} <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="quote-section">
        <blockquote className="home-quote">
          "The best time to build an AI app was two years ago.<br />
          The second best time is right now."
        </blockquote>
        <p className="home-quote-attr">— Every developer, probably</p>
      </section>

      {/* Quick links */}
      <section className="quicklinks-section">
        <Link to="/read/cheatsheet">
          <div className="quicklink-card">
            <div className="quicklink-icon">📋</div>
            <div>
              <div className="quicklink-title">Cheat Sheet</div>
              <div className="quicklink-sub">API patterns, prompt templates, deployment commands</div>
            </div>
            <ArrowRight size={16} className="quicklink-arrow" />
          </div>
        </Link>
        <Link to="/read/glossary">
          <div className="quicklink-card">
            <div className="quicklink-icon">📖</div>
            <div>
              <div className="quicklink-title">Glossary</div>
              <div className="quicklink-sub">Every term explained in plain English</div>
            </div>
            <ArrowRight size={16} className="quicklink-arrow" />
          </div>
        </Link>
        <Link to="/read/about-the-author">
          <div className="quicklink-card quicklink-card-wide">
            <div className="quicklink-icon">🐇</div>
            <div>
              <div className="quicklink-title">About the Author</div>
              <div className="quicklink-sub">Sunny R Gupta — engineering leader at JioHotstar, founder, and the person behind the "for Bunnies" series</div>
            </div>
            <ArrowRight size={16} className="quicklink-arrow" />
          </div>
        </Link>
      </section>

      <style>{`
        .home {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 2.5rem 4rem;
        }

        /* Hero */
        .hero {
          padding: 5rem 0 3rem;
        }
        .hero-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          font-family: 'Lora', serif;
          margin-bottom: 1.2rem;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 900;
          line-height: 1.05;
          margin: 0;
          color: var(--text);
        }
        .hero-title-accent { color: var(--accent); }
        .hero-subtitle {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 400;
          color: var(--text-muted);
          margin: 0.3rem 0 1.5rem;
          line-height: 1.2;
        }
        .hero-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 540px;
          line-height: 1.7;
          margin: 0 0 2rem;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .btn-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--accent);
          color: #0e0e0c;
          border: none;
          padding: 0.75rem 1.6rem;
          font-family: 'Lora', serif;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); }
        .btn-secondary {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 0.75rem 1.4rem;
          font-family: 'Lora', serif;
          font-size: 0.95rem;
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .hero-stat strong { color: var(--text); font-family: 'Playfair Display', serif; font-size: 1rem; }
        .hero-stat-div { width: 1px; height: 1rem; background: var(--border); }

        /* Author card */
        .hero-author {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.8rem;
          padding: 0.6rem 1rem 0.6rem 0.6rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s;
        }
        .hero-author:hover { border-color: var(--accent); }
        .hero-author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), #b87a30);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #0e0e0c;
          flex-shrink: 0;
        }
        .hero-author-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
          font-family: 'Lora', serif;
        }
        .hero-author-role {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.2;
        }

        .home-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border), transparent);
          margin: 1rem 0 3rem;
        }

        /* Parts */
        .parts-section { margin-bottom: 4rem; }
        .parts-header { margin-bottom: 2rem; }
        .parts-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .parts-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0;
          color: var(--text);
          line-height: 1.3;
        }
        .parts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }
        .part-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.4rem;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
        }
        .part-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          background: var(--surface-raised);
        }
        .part-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 8px 8px 0 0;
        }
        .part-card-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
          margin-top: 0.3rem;
        }
        .part-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.3rem;
          line-height: 1.3;
        }
        .part-card-chapters {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }
        .part-card-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .part-card-list li { padding: 0.1rem 0; }
        .part-card-list li.more { color: var(--accent); font-style: italic; }
        .part-card-cta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Quote */
        .quote-section {
          text-align: center;
          padding: 3rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-bottom: 3rem;
        }
        .home-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          font-style: italic;
          color: var(--text-muted);
          margin: 0 0 0.8rem;
          line-height: 1.5;
          max-width: 600px;
          margin: 0 auto 0.8rem;
        }
        .home-quote-attr {
          font-size: 0.85rem;
          color: var(--text-muted);
          opacity: 0.6;
          margin: 0;
        }

        /* Quick links */
        .quicklinks-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .quicklink-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.2rem 1.4rem;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .quicklink-card:hover { border-color: var(--accent); background: var(--surface-raised); }
        .quicklink-icon { font-size: 1.5rem; }
        .quicklink-title {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.2rem;
        }
        .quicklink-sub { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; }
        .quicklink-arrow { color: var(--text-muted); margin-left: auto; }
        .quicklink-card:hover .quicklink-arrow { color: var(--accent); }
        .quicklink-card-wide { grid-column: 1 / -1; }

        @media (max-width: 600px) {
          .home { padding: 0 1.2rem 3rem; }
          .hero { padding: 4rem 0 2rem; }
          .quicklinks-section { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
