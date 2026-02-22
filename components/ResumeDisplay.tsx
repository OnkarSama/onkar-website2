'use client';

import React, { JSX, useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Resume(): JSX.Element {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

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

    return (
        <>
            <style>{`
        .rv-root {
          margin-top:    -1.5rem;
          margin-left:   -2rem;
          margin-right:  -2rem;
          margin-bottom: -2.5rem;
          min-height: calc(100vh - 64px);
        }
        .rv-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 56px 56px 72px;
        }
        @media (max-width: 768px) { .rv-inner { padding: 36px 20px 48px; } }

        .rv-section {
          background: ${card};
          border: 1px solid ${cardBdr};
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
          transition: border-color .25s;
        }
        .rv-section:hover { border-color: ${p}40; }

        .rv-section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-bottom: 1px solid ${cardBdr};
          background: ${codeBg};
        }

        .rv-section-body {
          padding: 22px 24px;
        }

        .rv-entry {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid ${cardBdr};
        }
        .rv-entry:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }

        .rv-tag {
          display: inline-block;
          padding: 3px 10px;
          background: ${tagBg};
          border: 1px solid ${tagBdr};
          border-radius: 4px;
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .65rem;
          letter-spacing: .07em;
          color: ${sub};
        }

        .rv-bullet {
          display: flex;
          gap: 10px;
          margin-bottom: 6px;
          font-family: var(--font-sans), Inter, sans-serif;
          font-size: .875rem;
          line-height: 1.65;
          color: ${txt};
        }
        .rv-bullet:last-child { margin-bottom: 0; }

        .rv-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          background: ${p}15;
          border: 1px solid ${p}50;
          border-radius: 6px;
          color: ${sub};
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .72rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s;
        }
        .rv-download-btn:hover {
          background: ${p};
          border-color: ${p};
          color: #fff;
        }

        @keyframes _rv {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .rv1 { animation: _rv .5s .05s ease both; }
        .rv2 { animation: _rv .5s .12s ease both; }
        .rv3 { animation: _rv .5s .19s ease both; }
        .rv4 { animation: _rv .5s .26s ease both; }
        .rv5 { animation: _rv .5s .33s ease both; }
        .rv6 { animation: _rv .5s .4s  ease both; }
      `}</style>

            <div className="rv-root">
                <div className="rv-inner">

                    {/* ── Header ── */}
                    <div className="rv1" style={{ marginBottom: 40 }}>
            <span style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: ".7rem", letterSpacing: ".15em",
                color: p, textTransform: "uppercase",
            }}>{"// resume"}</span>

                        <div style={{
                            display: "flex", alignItems: "flex-end",
                            justifyContent: "space-between", flexWrap: "wrap",
                            gap: 16, marginTop: 6,
                        }}>
                            <div>
                                <h1 style={{
                                    fontFamily: "var(--font-sans), Inter, sans-serif",
                                    fontSize: "clamp(2rem, 5vw, 3.2rem)",
                                    fontWeight: 800, letterSpacing: "-.02em",
                                    color: txt, lineHeight: 1, margin: 0,
                                }}>
                                    Onkar <span style={{ color: p }}>Dhillon</span>
                                </h1>
                                <div style={{
                                    display: "flex", flexWrap: "wrap", gap: 16, marginTop: 10,
                                    fontFamily: "var(--font-mono), monospace",
                                    fontSize: ".72rem", color: dim, letterSpacing: ".04em",
                                }}>
                                    <span>onkardhillon73@gmail.com</span>
                                    <span style={{ color: cardBdr }}>·</span>
                                    <span>(718) 223-3637</span>
                                    <span style={{ color: cardBdr }}>·</span>
                                    <span>South Ozone Park, NY</span>
                                </div>
                            </div>
                            <a href="/Dhillon_Onkar_Resume.pdf" download className="rv-download-btn">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                Download PDF
                            </a>
                        </div>
                    </div>

                    {/* ── Education ── */}
                    <div className="rv-section rv2">
                        <div className="rv-section-header">
                            <span style={{ color: p, fontSize: ".9em" }}>▸</span>
                            <span style={{
                                fontFamily: "var(--font-mono), monospace",
                                fontSize: ".7rem", letterSpacing: ".12em",
                                color: p, textTransform: "uppercase",
                            }}>Education</span>
                        </div>
                        <div className="rv-section-body">
                            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                                <div>
                                    <p style={{
                                        fontFamily: "var(--font-sans), Inter, sans-serif",
                                        fontWeight: 700, fontSize: ".95rem", color: sub, margin: 0,
                                    }}>Adelphi University</p>
                                    <p style={{
                                        fontFamily: "var(--font-sans), Inter, sans-serif",
                                        fontSize: ".875rem", color: txt, marginTop: 3,
                                    }}>
                                        B.S. Computer Science & Artificial Intelligence
                                    </p>
                                    <p style={{
                                        fontFamily: "var(--font-sans), Inter, sans-serif",
                                        fontSize: ".82rem", color: dim, marginTop: 2,
                                    }}>
                                        Cybersecurity & SWE Specialization · Mathematics Minor
                                    </p>
                                </div>
                                <span className="rv-tag" style={{ alignSelf: "flex-start" }}>Expected May 2026</span>
                            </div>
                            <div style={{
                                background: codeBg, border: `1px solid ${cardBdr}`,
                                borderRadius: 6, padding: "12px 16px", marginTop: 12,
                            }}>
                                <p style={{
                                    fontFamily: "var(--font-mono), monospace",
                                    fontSize: ".65rem", letterSpacing: ".08em",
                                    color: dim, textTransform: "uppercase", marginBottom: 8,
                                }}>Relevant Coursework</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {["Intro to ML", "Artificial Intelligence", "Algorithms & Complexity", "ML & AI Algorithms", "Probability Theory", "Data Science"].map(c => (
                                        <span key={c} className="rv-tag">{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Experience ── */}
                    <div className="rv-section rv3">
                        <div className="rv-section-header">
                            <span style={{ color: p, fontSize: ".9em" }}>▸</span>
                            <span style={{
                                fontFamily: "var(--font-mono), monospace",
                                fontSize: ".7rem", letterSpacing: ".12em",
                                color: p, textTransform: "uppercase",
                            }}>Experience</span>
                        </div>
                        <div className="rv-section-body">

                            {[
                                {
                                    role: "Lead Student IT Service Specialist",
                                    org: "Adelphi University",
                                    date: "Sept 2024 – Present",
                                    bullets: [
                                        "Manage a team of 3–8 technicians resolving student & staff IT issues.",
                                        "Train new hires and maintain organized work order system; ranked 2nd in opened & closed tickets.",
                                        "Developed HTML email automation and Gen-AI chatbot scripts for university systems.",
                                        "Provide AV troubleshooting and classroom technical support.",
                                    ],
                                },
                                {
                                    role: "Research Mentor",
                                    org: "Adelphi Summer Institute in Mathematical Epidemiology",
                                    date: "Jul–Aug 2024 & 2025",
                                    bullets: [
                                        "Led an 8-person team teaching Python, Pandas, data cleaning, and core ML techniques.",
                                        "Prepared 6–7 research assistants to support student projects and develop effective workflows.",
                                        "Built Logistic Regression, k-NN, and Decision Tree models for collaborative research.",
                                    ],
                                },
                                {
                                    role: "Program Coordinator & STEM Instructor",
                                    org: "NYC FIRST",
                                    date: "Jul 2022 – Jul 2024",
                                    bullets: [
                                        "Part of a 3-member team running a robotics program at a newly established high school.",
                                        "Trained teachers and students in FIRST Robotics; taught CAD, CAM, and Java programming.",
                                        "Ran open fabrication workshops for students from a wide range of schools and backgrounds.",
                                    ],
                                },
                            ].map((exp, i) => (
                                <div key={i} className="rv-entry">
                                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                                        <div>
                                            <p style={{
                                                fontFamily: "var(--font-sans), Inter, sans-serif",
                                                fontWeight: 700, fontSize: ".95rem", color: sub, margin: 0,
                                            }}>{exp.role}</p>
                                            <p style={{
                                                fontFamily: "var(--font-sans), Inter, sans-serif",
                                                fontSize: ".82rem", color: dim, marginTop: 3,
                                            }}>{exp.org}</p>
                                        </div>
                                        <span className="rv-tag" style={{ alignSelf: "flex-start" }}>{exp.date}</span>
                                    </div>
                                    {exp.bullets.map((b, j) => (
                                        <div key={j} className="rv-bullet">
                                            <span style={{ color: p, flexShrink: 0, marginTop: 2 }}>▸</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Research ── */}
                    <div className="rv-section rv4">
                        <div className="rv-section-header">
                            <span style={{ color: p, fontSize: ".9em" }}>▸</span>
                            <span style={{
                                fontFamily: "var(--font-mono), monospace",
                                fontSize: ".7rem", letterSpacing: ".12em",
                                color: p, textTransform: "uppercase",
                            }}>Research</span>
                        </div>
                        <div className="rv-section-body">
                            {[
                                {
                                    title: "Feature Selecting & Weighting in k-NN using Information Gain",
                                    status: "paper in prep",
                                    bullets: [
                                        "Reduced dimensionality using Information Gain–based feature selection and weighting.",
                                        "Improved runtime by lowering distance-calculation complexity in k-NN.",
                                        "Outperformed GA-based feature selection in both accuracy and execution speed.",
                                    ],
                                },
                                {
                                    title: "SI(R) Epidemic Modeling — Deterministic, Policy-Driven & Stochastic",
                                    status: "active",
                                    bullets: [
                                        "Built deterministic and stochastic SIR models to simulate infectious disease dynamics.",
                                        "Modeled policy interventions as time-dependent parameter changes.",
                                        "Implemented graph-theoretic SI network models across structured and random populations.",
                                    ],
                                },
                                {
                                    title: "Local Hypothesis Testing Classification (LHTC) Algorithm",
                                    status: "active",
                                    bullets: [
                                        "Co-developed the classifier using Z-score hypothesis testing on local label distributions.",
                                        "Applied the Central Limit Theorem to statistically justify decision boundaries.",
                                    ],
                                },
                                {
                                    title: "Dynamic Neural Pathway Architectures",
                                    status: "starting next semester",
                                    bullets: [
                                        "Proposing neural networks with connections that grow, decay, disappear, and regenerate.",
                                        "Inspired by biological neuronal plasticity and real neural connectivity.",
                                        "Exploring effects on generalization, robustness, and learning efficiency.",
                                    ],
                                },
                            ].map((r, i) => (
                                <div key={i} className="rv-entry">
                                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                                        <p style={{
                                            fontFamily: "var(--font-sans), Inter, sans-serif",
                                            fontWeight: 700, fontSize: ".9rem", color: sub, margin: 0,
                                        }}>{r.title}</p>
                                        <span style={{
                                            fontFamily: "var(--font-mono), monospace",
                                            fontSize: ".62rem", letterSpacing: ".08em", textTransform: "uppercase",
                                            color: r.status === "active" ? "#34D399" :
                                                r.status === "paper in prep" ? sub : dim,
                                            whiteSpace: "nowrap", alignSelf: "flex-start",
                                        }}>
                      {r.status === "active" && <span style={{ marginRight: 4 }}>◉</span>}
                                            {r.status}
                    </span>
                                    </div>
                                    {r.bullets.map((b, j) => (
                                        <div key={j} className="rv-bullet">
                                            <span style={{ color: p, flexShrink: 0, marginTop: 2 }}>▸</span>
                                            <span>{b}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Skills ── */}
                    <div className="rv-section rv5">
                        <div className="rv-section-header">
                            <span style={{ color: p, fontSize: ".9em" }}>▸</span>
                            <span style={{
                                fontFamily: "var(--font-mono), monospace",
                                fontSize: ".7rem", letterSpacing: ".12em",
                                color: p, textTransform: "uppercase",
                            }}>Skills</span>
                        </div>
                        <div className="rv-section-body">
                            {[
                                { label: "Languages", items: ["Java", "C++", "Python", "PHP", "C", "MySQL"] },
                                { label: "Web", items: ["React", "Next.js", "Node.js", "HTML", "CSS", "JavaScript"] },
                                { label: "ML / AI", items: ["Machine Learning", "Pandas", "scikit-learn", "Jupyter"] },
                                { label: "Tools", items: ["Git", "Linux", "Google Suite", "Excel", "PowerPoint"] },
                                { label: "Design", items: ["CAD", "Autodesk Fusion 360", "Adobe Creative Cloud"] },
                            ].map(group => (
                                <div key={group.label} style={{
                                    display: "flex", gap: 16, alignItems: "flex-start",
                                    flexWrap: "wrap", marginBottom: 14,
                                }}>
                  <span style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: ".63rem", letterSpacing: ".1em",
                      color: dim, textTransform: "uppercase",
                      minWidth: 80, paddingTop: 4,
                  }}>{group.label}</span>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                        {group.items.map(item => (
                                            <span key={item} className="rv-tag">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
