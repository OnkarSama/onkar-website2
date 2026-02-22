"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Repo = {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    languages_url: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
};

type LanguagesMap = { [repoName: string]: string[] };

export default function OpenSource() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted]     = useState(false);
    const [projects, setProjects]   = useState<Repo[]>([]);
    const [languages, setLanguages] = useState<LanguagesMap>({});
    const [loading, setLoading]     = useState(true);
    const [filter, setFilter]       = useState<string>("all");

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        fetch("https://api.github.com/users/OnkarSama/repos?per_page=100&sort=updated")
            .then(r => r.json())
            .then((data: Repo[]) => {
                setProjects(data);
                setLoading(false);
                data.forEach(async repo => {
                    try {
                        const res  = await fetch(repo.languages_url);
                        const data: Record<string, number> = await res.json();
                        setLanguages(prev => ({ ...prev, [repo.name]: Object.keys(data) }));
                    } catch {}
                });
            })
            .catch(() => setLoading(false));
    }, []);

    const isDark = mounted ? resolvedTheme !== "light" : true;

    const p      = "#8B5CF6";
    const sub    = isDark ? "#C4B5FD" : "#7C3AED";
    const txt    = isDark ? "#D1D5DB" : "#374151";
    const dim    = isDark ? "#6B7280" : "#9CA3AF";
    const card   = isDark ? "#111111" : "#ffffff";
    const cardBdr= isDark ? "#1f1f1f" : "#E9D5FF";
    const codeBg = isDark ? "#0d0d0d" : "#F5F3FF";
    const tagBg  = isDark ? "#8B5CF610" : "#8B5CF610";
    const tagBdr = isDark ? "#8B5CF640" : "#8B5CF640";

    // Collect all unique languages for filter
    const allLangs = Array.from(
        new Set(Object.values(languages).flat())
    ).sort();

    const filtered = filter === "all"
        ? projects
        : projects.filter(p => (languages[p.name] || []).includes(filter));

    const timeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const days = Math.floor(diff / 86400000);
        if (days < 1)  return "today";
        if (days < 7)  return `${days}d ago`;
        if (days < 30) return `${Math.floor(days / 7)}w ago`;
        if (days < 365) return `${Math.floor(days / 30)}mo ago`;
        return `${Math.floor(days / 365)}y ago`;
    };

    const langColor = (lang: string): string => {
        const map: Record<string, string> = {
            Python:     "#3B82F6", JavaScript: "#F59E0B", TypeScript: "#06B6D4",
            Java:       "#EF4444", "C++":      "#8B5CF6", C:          "#A78BFA",
            HTML:       "#F97316", CSS:        "#EC4899", Shell:      "#10B981",
            Jupyter:    "#F59E0B",
        };
        return map[lang] || "#6B7280";
    };

    return (
        <>
            <style>{`
        .os-root {
          margin-top:    -1.5rem;
          margin-left:   -2rem;
          margin-right:  -2rem;
          margin-bottom: -2.5rem;
          min-height: calc(100vh - 64px);
        }
        .os-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 56px 72px;
        }
        @media (max-width: 768px) { .os-inner { padding: 36px 20px 48px; } }

        .repo-card {
          background: ${card};
          border: 1px solid ${cardBdr};
          border-radius: 8px;
          padding: 22px 24px;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color .2s, transform .2s, background .2s;
          position: relative;
          overflow: hidden;
        }
        .repo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, ${p}, #06B6D4);
          opacity: 0;
          transition: opacity .2s;
        }
        .repo-card:hover {
          border-color: ${p}55;
          transform: translateY(-3px);
          background: ${isDark ? "#161616" : "#fafafa"};
        }
        .repo-card:hover::before { opacity: 1; }

        .lang-dot {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .65rem; letter-spacing: .05em;
          color: ${dim};
        }

        .filter-btn {
          display: inline-block;
          padding: 4px 12px;
          background: ${tagBg};
          border: 1px solid ${tagBdr};
          border-radius: 4px;
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .67rem; letter-spacing: .07em;
          color: ${dim};
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s;
          white-space: nowrap;
        }
        .filter-btn:hover, .filter-btn.active {
          background: ${p}20;
          border-color: ${p}60;
          color: ${sub};
        }

        .repo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        .stat-pill {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .63rem; color: ${dim};
        }

        @keyframes _ou {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ou1 { animation: _ou .5s .05s ease both; }
        .ou2 { animation: _ou .5s .15s ease both; }
        .ou3 { animation: _ou .5s .25s ease both; }

        .skeleton {
          background: linear-gradient(90deg, ${cardBdr} 25%, ${isDark ? "#2a2a2a" : "#f0e6ff"} 50%, ${cardBdr} 75%);
          background-size: 200% 100%;
          animation: _shimmer 1.4s infinite;
          border-radius: 6px;
        }
        @keyframes _shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

            <div className="os-root">
                <div className="os-inner">

                    {/* ── Header ── */}
                    <div className="ou1" style={{ marginBottom: 44 }}>
            <span style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: ".7rem", letterSpacing: ".15em",
                color: p, textTransform: "uppercase",
            }}>{"// open source"}</span>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
                            <h1 style={{
                                fontFamily: "var(--font-sans), Inter, sans-serif",
                                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                                fontWeight: 800, letterSpacing: "-.02em",
                                color: txt, lineHeight: 1, margin: 0,
                            }}>
                                My <span style={{ color: p }}>Projects</span>
                            </h1>
                            <a
                                href="https://github.com/OnkarSama"
                                target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    padding: "9px 20px",
                                    background: tagBg,
                                    border: `1px solid ${tagBdr}`,
                                    borderRadius: 6,
                                    color: sub,
                                    fontFamily: "var(--font-mono), monospace",
                                    fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase",
                                    textDecoration: "none",
                                    transition: "background .2s, border-color .2s",
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${p}20`; (e.currentTarget as HTMLAnchorElement).style.borderColor = `${p}60`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = tagBg; (e.currentTarget as HTMLAnchorElement).style.borderColor = tagBdr; }}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub Profile
                            </a>
                        </div>
                    </div>

                    {/* ── Filter bar ── */}
                    {!loading && allLangs.length > 0 && (
                        <div className="ou2" style={{ marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: ".63rem", letterSpacing: ".1em",
                  color: dim, textTransform: "uppercase", marginRight: 4,
              }}>filter:</span>
                            <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
                                all ({projects.length})
                            </button>
                            {allLangs.map(lang => (
                                <button
                                    key={lang}
                                    className={`filter-btn ${filter === lang ? "active" : ""}`}
                                    onClick={() => setFilter(lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ── Loading skeletons ── */}
                    {loading && (
                        <div className="repo-grid ou3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} style={{
                                    background: card, border: `1px solid ${cardBdr}`,
                                    borderRadius: 8, padding: "22px 24px",
                                    display: "flex", flexDirection: "column", gap: 12,
                                }}>
                                    <div className="skeleton" style={{ height: 16, width: "60%" }} />
                                    <div className="skeleton" style={{ height: 12, width: "90%" }} />
                                    <div className="skeleton" style={{ height: 12, width: "70%" }} />
                                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                                        <div className="skeleton" style={{ height: 20, width: 60 }} />
                                        <div className="skeleton" style={{ height: 20, width: 50 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Repo grid ── */}
                    {!loading && (
                        <div className="repo-grid ou3">
                            {filtered.map(repo => (
                                <a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="repo-card"
                                >
                                    {/* Name row */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill={dim}>
                                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        <span style={{
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: ".85rem", fontWeight: 600,
                                            color: sub, letterSpacing: ".02em",
                                        }}>{repo.name}</span>
                                    </div>

                                    {/* Description */}
                                    <p style={{
                                        fontFamily: "var(--font-sans), Inter, sans-serif",
                                        fontSize: ".82rem", lineHeight: 1.6,
                                        color: txt, margin: 0, flexGrow: 1,
                                    }}>
                                        {repo.description || <span style={{ color: dim, fontStyle: "italic" }}>No description</span>}
                                    </p>

                                    {/* Languages */}
                                    {languages[repo.name] && languages[repo.name].length > 0 && (
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {languages[repo.name].slice(0, 4).map(lang => (
                                                <span key={lang} className="lang-dot">
                          <span style={{
                              width: 8, height: 8, borderRadius: "50%",
                              background: langColor(lang), display: "inline-block", flexShrink: 0,
                          }} />
                                                    {lang}
                        </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer stats */}
                                    <div style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        paddingTop: 10,
                                        borderTop: `1px solid ${cardBdr}`,
                                    }}>
                                        <div style={{ display: "flex", gap: 14 }}>
                      <span className="stat-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                          {repo.stargazers_count}
                      </span>
                                            <span className="stat-pill">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/>
                        </svg>
                                                {repo.forks_count}
                      </span>
                                        </div>
                                        <span style={{
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: ".6rem", color: dim, letterSpacing: ".05em",
                                        }}>
                      {timeAgo(repo.updated_at)}
                    </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && filtered.length === 0 && (
                        <div style={{
                            textAlign: "center", padding: "64px 24px",
                            fontFamily: "var(--font-mono), monospace",
                            color: dim, fontSize: ".85rem",
                        }}>
                            <p style={{ fontSize: "2rem", marginBottom: 12 }}>∅</p>
                            no repos found for <span style={{ color: sub }}>{filter}</span>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
