'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const SKILLS = [
    { category: "Languages", items: ["Python", "Java", "C++", "C", "JavaScript", "PHP"] },
    { category: "Web",       items: ["React", "Next.js", "Node.js", "HTML", "CSS"] },
    { category: "ML / AI",  items: ["Machine Learning", "Jupyter", "Pandas", "scikit-learn"] },
    { category: "Other",    items: ["Arduino", "Robotics", "Git", "Linux"] },
];

const STATS = [
    { value: "3+",  label: "Years Research" },
    { value: "4",   label: "Active Projects" },
    { value: "2x",  label: "Research Mentor" },
    { value: "PhD", label: "Track" },
];

const PROJECTS = [
    { title: "Feature Selection in k-NN via Information Gain",       status: "paper in prep" },
    { title: "SI(R) Epidemic Modeling — Stochastic & Graph-Theoretic", status: "active" },
    { title: "Local Hypothesis Testing Classification (LHTC)",        status: "active" },
    { title: "Dynamic Neural Pathway Architectures",                  status: "starting next semester" },
];

export default function AboutMe() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = mounted ? resolvedTheme !== 'light' : true;

    const p   = '#8B5CF6';
    const sub = isDark ? '#C4B5FD' : '#7C3AED';
    const txt = isDark ? '#D1D5DB' : '#374151';
    const dim = isDark ? '#9CA3AF' : '#6B7280';
    const card    = isDark ? '#111111' : '#ffffff';
    const cardBdr = isDark ? '#1f1f1f' : '#E9D5FF';
    const tagBg   = isDark ? '#8B5CF610' : '#8B5CF610';
    const tagBdr  = isDark ? '#8B5CF645' : '#8B5CF645';
    const codeBg  = isDark ? '#0d0d0d'   : '#F5F3FF';

    return (
        <>
            <style>{`
        /* ── escape layout.tsx pt-6 px-8 pb-10 ── */
        .ab-root {
          margin-top:    -1.5rem;
          margin-left:   -2rem;
          margin-right:  -2rem;
          margin-bottom: -2.5rem;
          min-height: calc(100vh - 64px);
        }
        .ab-inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 56px 56px 72px;
        }
        @media (max-width: 768px) { .ab-inner { padding: 36px 24px 48px; } }

        .ab-card {
          background: ${card};
          border: 1px solid ${cardBdr};
          border-radius: 8px;
          transition: border-color .25s, transform .2s;
        }
        .ab-card:hover { border-color: ${p}55; transform: translateY(-2px); }

        .ab-stat {
          background: ${card};
          border: 1px solid ${cardBdr};
          border-radius: 8px;
          padding: 22px 16px;
          text-align: center;
          flex: 1; min-width: 90px;
          transition: border-color .25s, transform .2s;
        }
        .ab-stat:hover { border-color: ${p}55; transform: translateY(-2px); }

        .ab-tag {
          display: inline-block;
          padding: 4px 12px;
          background: ${tagBg};
          border: 1px solid ${tagBdr};
          border-radius: 4px;
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .71rem; letter-spacing: .06em;
          color: ${sub};
          transition: background .2s, border-color .2s;
        }
        .ab-tag:hover { background: ${p}20; border-color: ${p}70; }

        .ab-proj {
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          padding: 13px 18px;
          background: ${codeBg};
          border: 1px solid ${cardBdr};
          border-radius: 6px;
          flex-wrap: wrap;
          transition: border-color .2s;
        }
        .ab-proj:hover { border-color: ${p}50; }

        .ab-li-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 20px;
          background: ${p}15;
          border: 1px solid ${p}50;
          border-radius: 6px;
          color: ${sub};
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .72rem; letter-spacing: .1em; text-transform: uppercase;
          text-decoration: none; cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
        }
        .ab-li-btn:hover { background: ${p}; border-color: ${p}; color: #fff; }

        @keyframes _au {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .au1 { animation: _au .55s .05s ease both; }
        .au2 { animation: _au .55s .15s ease both; }
        .au3 { animation: _au .55s .25s ease both; }
        .au4 { animation: _au .55s .38s ease both; }
        .au5 { animation: _au .55s .5s  ease both; }
      `}</style>

            <div className="ab-root">
                <div className="ab-inner">

                    {/* ── Header ── */}
                    <div className="au1" style={{ marginBottom: 44 }}>
            <span style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '.7rem', letterSpacing: '.15em',
                color: p, textTransform: 'uppercase',
            }}>
              {'// about'}
            </span>
                        <h1 style={{
                            fontFamily: 'var(--font-sans), Inter, sans-serif',
                            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                            fontWeight: 800, letterSpacing: '-.02em',
                            color: txt, marginTop: 6, lineHeight: 1,
                        }}>
                            About <span style={{ color: p }}>Me</span>
                        </h1>
                    </div>

                    {/* ── Photo + Bio ── */}
                    <div className="au2" style={{
                        display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap',
                    }}>
                        {/* Photo */}
                        <div className="ab-card" style={{ flex: '0 0 auto', width: 230, overflow: 'hidden' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/MyPhoto.jpeg"
                                alt="Onkar Dhillon"
                                style={{ width: '100%', height: 270, objectFit: 'cover', display: 'block' }}
                            />
                            <div style={{ padding: '16px 18px' }}>
                                <p style={{
                                    fontFamily: 'var(--font-sans), Inter, sans-serif',
                                    fontWeight: 700, fontSize: '.95rem', color: txt, margin: 0,
                                }}>Onkar Dhillon</p>
                                <p style={{
                                    fontFamily: 'var(--font-mono), monospace',
                                    fontSize: '.67rem', color: sub, marginTop: 4, letterSpacing: '.05em',
                                }}>CS + AI · Adelphi University</p>
                                <div style={{ marginTop: 14 }}>
                                    <a
                                        href="https://www.linkedin.com/in/0nkardhillon/"
                                        target="_blank" rel="noopener noreferrer"
                                        className="ab-li-btn"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="ab-card" style={{ flex: 1, minWidth: 260, padding: '28px 32px' }}>
                            <p style={{
                                fontFamily: 'var(--font-mono), monospace',
                                fontSize: '.68rem', letterSpacing: '.12em',
                                color: p, textTransform: 'uppercase', marginBottom: 16,
                            }}>{'// background'}</p>
                            {[
                                `I'm a Computer Science and AI student at Adelphi University, specializing in Software Engineering, Cybersecurity, and Mathematics. I'm actively applying to PhD programs, fascinated by a question the industry hasn't answered yet — why do these models work, and what's actually happening inside them when they do?"`,
                                `My research spans k-NN with information gain, epidemic modeling with stochastic and graph-theoretic approaches, and dynamic neural pathway architectures — networks where connections grow, decay, and regenerate like biological neurons.`,
                                `Outside research I lead IT teams, mentor students in Python and ML, and have taught robotics and CAD/CAM at NYC FIRST programs.`,
                            ].map((para, i) => (
                                <p key={i} style={{
                                    fontFamily: 'var(--font-sans), Inter, sans-serif',
                                    fontSize: '.95rem', lineHeight: 1.78,
                                    color: txt, marginBottom: i < 2 ? 16 : 0,
                                }}>{para}</p>
                            ))}
                        </div>
                    </div>

                    {/* ── Stats ── */}
                    <div className="au3" style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
                        {STATS.map(s => (
                            <div key={s.label} className="ab-stat">
                                <p style={{
                                    fontFamily: 'var(--font-sans), Inter, sans-serif',
                                    fontWeight: 800, fontSize: '1.9rem', color: p, margin: 0, lineHeight: 1,
                                }}>{s.value}</p>
                                <p style={{
                                    fontFamily: 'var(--font-mono), monospace',
                                    fontSize: '.63rem', letterSpacing: '.1em',
                                    color: dim, marginTop: 7, textTransform: 'uppercase',
                                }}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── Skills ── */}
                    <div className="au4 ab-card" style={{ padding: '28px 32px', marginBottom: 24 }}>
                        <p style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '.68rem', letterSpacing: '.12em',
                            color: p, textTransform: 'uppercase', marginBottom: 20,
                        }}>{'// skills & tools'}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {SKILLS.map(group => (
                                <div key={group.category} style={{
                                    display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap',
                                }}>
                  <span style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '.63rem', letterSpacing: '.1em',
                      color: dim, textTransform: 'uppercase',
                      minWidth: 80, paddingTop: 5,
                  }}>{group.category}</span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {group.items.map(item => (
                                            <span key={item} className="ab-tag">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Currently working on ── */}
                    <div className="au5 ab-card" style={{ padding: '28px 32px' }}>
                        <p style={{
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '.68rem', letterSpacing: '.12em',
                            color: p, textTransform: 'uppercase', marginBottom: 20,
                        }}>{'// currently working on'}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {PROJECTS.map(proj => (
                                <div key={proj.title} className="ab-proj">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ color: p, fontSize: '.9em' }}>▸</span>
                                        <span style={{
                                            fontFamily: 'var(--font-sans), Inter, sans-serif',
                                            fontSize: '.88rem', color: txt,
                                        }}>{proj.title}</span>
                                    </div>
                                    <span style={{
                                        fontFamily: 'var(--font-mono), monospace',
                                        fontSize: '.63rem', letterSpacing: '.08em',
                                        color: proj.status === 'active' ? '#34D399' :
                                            proj.status === 'paper in prep' ? sub : dim,
                                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                                    }}>
                    {proj.status === 'active' && <span style={{ marginRight: 5 }}>◉</span>}
                                        {proj.status}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
