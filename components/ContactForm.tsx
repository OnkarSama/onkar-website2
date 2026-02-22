"use client";

import React, { useState, useRef, useEffect } from "react";
import { addToast } from "@heroui/react";
import { useTheme } from "next-themes";

type FormDataType = {
    name: string;
    email: string;
    subject: string;
    type: string;
    message: string;
};

const CONTACT_TYPES = [
    { value: "general",     label: "General Inquiry" },
    { value: "research",    label: "Research Collaboration" },
    { value: "opportunity", label: "Job / Opportunity" },
    { value: "openSource",  label: "Open Source" },
    { value: "other",       label: "Other" },
];

const SOCIALS = [
    {
        label: "GitHub",
        handle: "@OnkarSama",
        href: "https://github.com/OnkarSama",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        handle: "0nkardhillon",
        href: "https://www.linkedin.com/in/0nkardhillon/",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ),
    },
    {
        label: "Email",
        handle: "onkardhillon73@gmail.com",
        href: "mailto:onkardhillon73@gmail.com",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
            </svg>
        ),
    },
];

export default function ContactForm() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const [loading, setLoading]       = useState(false);
    const [selectedType, setType]     = useState("general");
    const [charCount, setCharCount]   = useState(0);
    const [focused, setFocused]       = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    const isDark = mounted ? resolvedTheme !== "light" : true;

    const p      = "#8B5CF6";
    const sub    = isDark ? "#C4B5FD" : "#7C3AED";
    const txt    = isDark ? "#D1D5DB" : "#374151";
    const dim    = isDark ? "#6B7280" : "#9CA3AF";
    const card   = isDark ? "#111111" : "#ffffff";
    const cardBdr= isDark ? "#1f1f1f" : "#E9D5FF";
    const codeBg = isDark ? "#0d0d0d" : "#F5F3FF";
    const inputBg= isDark ? "#0a0a0a" : "#faf8ff";
    const tagBg  = isDark ? "#8B5CF610" : "#8B5CF610";
    const tagBdr = isDark ? "#8B5CF640" : "#8B5CF640";

    const fieldStyle = (name: string) => ({
        width: "100%",
        padding: "11px 14px",
        background: inputBg,
        border: `1px solid ${focused === name ? p + "80" : cardBdr}`,
        borderRadius: 6,
        color: txt,
        fontFamily: "var(--font-sans), Inter, sans-serif",
        fontSize: ".9rem",
        outline: "none",
        transition: "border-color .2s",
        boxShadow: focused === name ? `0 0 0 3px ${p}15` : "none",
    });

    const labelStyle = {
        fontFamily: "var(--font-mono), monospace",
        fontSize: ".67rem",
        letterSpacing: ".1em",
        color: dim,
        textTransform: "uppercase" as const,
        marginBottom: 7,
        display: "block",
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;
        setLoading(true);

        const formData = new FormData(formRef.current);
        const data = {
            ...Object.fromEntries(formData.entries()),
            type: selectedType,
        } as FormDataType;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                addToast({ title: "Message Sent", description: "Thanks! I'll reply soon.", color: "success" });
                formRef.current.reset();
                setCharCount(0);
                setType("general");
            } else {
                let errorMsg = "Something went wrong";
                try { const err = await res.json(); errorMsg = err?.error || errorMsg; } catch {}
                addToast({ title: "Error", description: errorMsg, color: "danger" });
            }
        } catch {
            addToast({ title: "Network Error", description: "Could not send message.", color: "danger" });
        }

        setLoading(false);
    };

    return (
        <>
            <style>{`
        .ct-root {
          margin-top:    -1.5rem;
          margin-left:   -2rem;
          margin-right:  -2rem;
          margin-bottom: -2.5rem;
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
        }
        .ct-inner {
          max-width: 1000px;
          width: 100%;
          margin: 0 auto;
          padding: 56px 56px 72px;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .ct-inner {
            grid-template-columns: 1fr;
            padding: 36px 20px 48px;
          }
        }

        .ct-card {
          background: ${card};
          border: 1px solid ${cardBdr};
          border-radius: 8px;
          overflow: hidden;
          transition: border-color .25s;
        }

        .ct-social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 6px;
          text-decoration: none;
          color: ${txt};
          transition: background .2s, color .2s;
          border: 1px solid transparent;
        }
        .ct-social-link:hover {
          background: ${tagBg};
          border-color: ${tagBdr};
          color: ${sub};
        }

        .ct-type-btn {
          padding: 6px 14px;
          background: ${tagBg};
          border: 1px solid ${tagBdr};
          border-radius: 4px;
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .65rem;
          letter-spacing: .07em;
          color: ${dim};
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s;
          white-space: nowrap;
        }
        .ct-type-btn:hover, .ct-type-btn.active {
          background: ${p}20;
          border-color: ${p}60;
          color: ${sub};
        }

        .ct-submit {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 28px;
          background: ${p}20;
          border: 1px solid ${p}60;
          border-radius: 6px;
          color: ${sub};
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .75rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
        }
        .ct-submit:hover:not(:disabled) {
          background: ${p};
          border-color: ${p};
          color: #fff;
        }
        .ct-submit:disabled { opacity: .5; cursor: not-allowed; }

        .ct-reset {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          background: transparent;
          border: 1px solid ${cardBdr};
          border-radius: 6px;
          color: ${dim};
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .75rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color .2s, color .2s;
        }
        .ct-reset:hover { border-color: ${p}50; color: ${sub}; }

        @keyframes _ct {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ct1 { animation: _ct .5s .05s ease both; }
        .ct2 { animation: _ct .5s .15s ease both; }

        @keyframes _spin {
          to { transform: rotate(360deg); }
        }
        .ct-spinner {
          width: 14px; height: 14px;
          border: 2px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: _spin .7s linear infinite;
        }
      `}</style>

            <div className="ct-root">
                <div className="ct-inner">

                    {/* ── Left: Info ── */}
                    <div className="ct1">
            <span style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: ".7rem", letterSpacing: ".15em",
                color: p, textTransform: "uppercase",
            }}>{"// contact"}</span>
                        <h1 style={{
                            fontFamily: "var(--font-sans), Inter, sans-serif",
                            fontSize: "clamp(2rem, 4vw, 2.8rem)",
                            fontWeight: 800, letterSpacing: "-.02em",
                            color: txt, lineHeight: 1, margin: "6px 0 16px",
                        }}>
                            Get in <span style={{ color: p }}>Touch</span>
                        </h1>
                        <p style={{
                            fontFamily: "var(--font-sans), Inter, sans-serif",
                            fontSize: ".9rem", lineHeight: 1.75, color: dim,
                            marginBottom: 32,
                        }}>
                            Whether it's a research collaboration, job opportunity, or just a question — I'm always open to connecting.
                        </p>

                        {/* Socials */}
                        <div className="ct-card" style={{ marginBottom: 20 }}>
                            <div style={{
                                padding: "12px 18px",
                                borderBottom: `1px solid ${cardBdr}`,
                                background: codeBg,
                            }}>
                <span style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: ".65rem", letterSpacing: ".12em",
                    color: p, textTransform: "uppercase",
                }}>{"// find me"}</span>
                            </div>
                            <div style={{ padding: "8px" }}>
                                {SOCIALS.map(s => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ct-social-link">
                                        <span style={{ color: sub }}>{s.icon}</span>
                                        <div>
                                            <p style={{
                                                fontFamily: "var(--font-mono), monospace",
                                                fontSize: ".7rem", letterSpacing: ".08em",
                                                color: dim, textTransform: "uppercase", margin: 0,
                                            }}>{s.label}</p>
                                            <p style={{
                                                fontFamily: "var(--font-sans), Inter, sans-serif",
                                                fontSize: ".85rem", color: txt, margin: "2px 0 0",
                                            }}>{s.handle}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="ct-card" style={{ padding: "16px 18px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", display: "inline-block", flexShrink: 0 }} />
                                <span style={{
                                    fontFamily: "var(--font-mono), monospace",
                                    fontSize: ".65rem", letterSpacing: ".1em",
                                    color: "#34D399", textTransform: "uppercase",
                                }}>Available</span>
                            </div>
                            <p style={{
                                fontFamily: "var(--font-sans), Inter, sans-serif",
                                fontSize: ".82rem", color: dim, margin: 0, lineHeight: 1.6,
                            }}>
                                Open to research collaborations, internships, and PhD program discussions.
                            </p>
                        </div>
                    </div>

                    {/* ── Right: Form ── */}
                    <div className="ct2 ct-card">
                        <div style={{
                            padding: "14px 24px",
                            borderBottom: `1px solid ${cardBdr}`,
                            background: codeBg,
                        }}>
              <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: ".65rem", letterSpacing: ".12em",
                  color: p, textTransform: "uppercase",
              }}>{"// send a message"}</span>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} style={{ padding: "24px" }}>

                            {/* Inquiry type */}
                            <div style={{ marginBottom: 22 }}>
                                <label style={labelStyle}>Inquiry Type</label>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {CONTACT_TYPES.map(t => (
                                        <button
                                            key={t.value}
                                            type="button"
                                            className={`ct-type-btn ${selectedType === t.value ? "active" : ""}`}
                                            onClick={() => setType(t.value)}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Name + Email row */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                                <div>
                                    <label style={labelStyle} htmlFor="name">Name</label>
                                    <input
                                        id="name" name="name" required placeholder="Your name"
                                        style={fieldStyle("name")}
                                        onFocus={() => setFocused("name")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="email">Email</label>
                                    <input
                                        id="email" name="email" type="email" required placeholder="you@example.com"
                                        style={fieldStyle("email")}
                                        onFocus={() => setFocused("email")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div style={{ marginBottom: 16 }}>
                                <label style={labelStyle} htmlFor="subject">Subject</label>
                                <input
                                    id="subject" name="subject" required placeholder="What's this about?"
                                    style={fieldStyle("subject")}
                                    onFocus={() => setFocused("subject")}
                                    onBlur={() => setFocused(null)}
                                />
                            </div>

                            {/* Message */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                                    <label style={{ ...labelStyle, marginBottom: 0 }} htmlFor="message">Message</label>
                                    <span style={{
                                        fontFamily: "var(--font-mono), monospace",
                                        fontSize: ".6rem", color: charCount > 450 ? "#F87171" : dim,
                                        letterSpacing: ".05em",
                                    }}>{charCount}/500</span>
                                </div>
                                <textarea
                                    id="message" name="message" required
                                    placeholder="Tell me what's on your mind..."
                                    maxLength={500}
                                    rows={5}
                                    onChange={e => setCharCount(e.target.value.length)}
                                    style={{
                                        ...fieldStyle("message"),
                                        resize: "vertical",
                                        minHeight: 130,
                                        fontFamily: "var(--font-sans), Inter, sans-serif",
                                    }}
                                    onFocus={() => setFocused("message")}
                                    onBlur={() => setFocused(null)}
                                />
                            </div>

                            {/* Actions */}
                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                <button type="submit" disabled={loading} className="ct-submit">
                                    {loading
                                        ? <><span className="ct-spinner" /> Sending...</>
                                        : <>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                            </svg>
                                            Send Message
                                        </>
                                    }
                                </button>
                                <button
                                    type="button"
                                    className="ct-reset"
                                    onClick={() => { formRef.current?.reset(); setCharCount(0); setType("general"); }}
                                >
                                    Reset
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}
