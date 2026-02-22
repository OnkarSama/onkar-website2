"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface NodeItem {
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    pulseOffset: number;
}
interface Connection {
    line: THREE.Line;
    a: number;
    b: number;
    life: number;
    maxLife: number;
    firing: boolean;
    fireProgress: number;
}

const NODE_COUNT      = 72;
const MAX_CONNECTIONS = 150;
const CONN_DIST       = 3.6;
const FIRE_SPEED      = 0.016;

const DARK  = { node: 0x8B5CF6, line: 0x7C3AED, fire: 0xDDD6FE };
const LIGHT = { node: 0x8B5CF6, line: 0xA78BFA, fire: 0x4C1D95 };

export default function HeroSection() {
    // Point directly at the <canvas> element — no wrapper div needed
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const [typed,  setTyped]  = useState("");
    const [cursor, setCursor] = useState(true);
    const [mounted, setMounted] = useState(false);

    const tagline = "Researching the edges of machine learning. Building what comes next.";

    useEffect(() => setMounted(true), []);

    // Typewriter
    useEffect(() => {
        let i = 0;
        const delay = setTimeout(() => {
            const iv = setInterval(() => {
                setTyped(tagline.slice(0, ++i));
                if (i >= tagline.length) clearInterval(iv);
            }, 30);
            return () => clearInterval(iv);
        }, 900);
        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {
        const iv = setInterval(() => setCursor(p => !p), 520);
        return () => clearInterval(iv);
    }, []);

    // ── Three.js — runs once, canvas ref always exists ──────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const W = window.innerWidth;
        const H = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H, false); // false = don't set style, we handle that via CSS
        renderer.setClearColor(0x000000, 0);

        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
        camera.position.z = 9;

        // ── Build nodes ──
        const nodeGeo = new THREE.SphereGeometry(0.1, 12, 12);
        const nodes: NodeItem[] = Array.from({ length: NODE_COUNT }, () => {
            const mesh = new THREE.Mesh(
                nodeGeo,
                new THREE.MeshBasicMaterial({ color: 0x8B5CF6 })
            );
            mesh.position.set(
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6
            );
            scene.add(mesh);
            return {
                mesh,
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.005,
                    (Math.random() - 0.5) * 0.005,
                    (Math.random() - 0.5) * 0.002
                ),
                pulseOffset: Math.random() * Math.PI * 2,
            };
        });

        // ── Build connections ──
        const connections: Connection[] = [];

        const makeConn = (a: number, b: number): Connection => {
            const pts = [nodes[a].mesh.position.clone(), nodes[b].mesh.position.clone()];
            const geo = new THREE.BufferGeometry().setFromPoints(pts);
            const mat = new THREE.LineBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.6 });
            const line = new THREE.Line(geo, mat);
            scene.add(line);
            return { line, a, b, life: 0, maxLife: 200 + Math.random() * 150, firing: Math.random() < 0.2, fireProgress: 0 };
        };

        for (let i = 0; i < NODE_COUNT && connections.length < MAX_CONNECTIONS; i++) {
            for (let j = i + 1; j < NODE_COUNT && connections.length < MAX_CONNECTIONS; j++) {
                if (nodes[i].mesh.position.distanceTo(nodes[j].mesh.position) < CONN_DIST)
                    connections.push(makeConn(i, j));
            }
        }

        // ── Input ──
        const mouse = { x: 0, y: 0 };
        const onMove   = (e: MouseEvent) => { mouse.x = (e.clientX / W - 0.5) * 2; mouse.y = -(e.clientY / H - 0.5) * 2; };
        const onResize = () => {
            const w = window.innerWidth, h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("resize",    onResize);

        // ── Animate ──
        let frame = 0, animId = 0;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            frame++;

            const isDark = document.documentElement.classList.contains("dark");
            const pal    = isDark ? DARK : LIGHT;

            nodes.forEach(n => {
                n.mesh.position.add(n.velocity);
                if (Math.abs(n.mesh.position.x) > 8)  n.velocity.x *= -1;
                if (Math.abs(n.mesh.position.y) > 5)  n.velocity.y *= -1;
                if (Math.abs(n.mesh.position.z) > 3)  n.velocity.z *= -1;
                n.mesh.scale.setScalar(1 + 0.28 * Math.sin(frame * 0.03 + n.pulseOffset));
                (n.mesh.material as THREE.MeshBasicMaterial).color.setHex(pal.node);
            });

            connections.forEach((c, ci) => {
                c.life++;
                const pa = nodes[c.a].mesh.position;
                const pb = nodes[c.b].mesh.position;
                const dist = pa.distanceTo(pb);

                // update line geometry
                const buf = new Float32Array([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z]);
                c.line.geometry.setAttribute("position", new THREE.BufferAttribute(buf, 3));
                c.line.geometry.attributes.position.needsUpdate = true;

                const mat = c.line.material as THREE.LineBasicMaterial;

                // replace dead connections
                if (dist > CONN_DIST + 1 || c.life > c.maxLife) {
                    scene.remove(c.line);
                    c.line.geometry.dispose();
                    for (let t = 0; t < 40; t++) {
                        const a = Math.floor(Math.random() * NODE_COUNT);
                        const b = Math.floor(Math.random() * NODE_COUNT);
                        if (a !== b && nodes[a].mesh.position.distanceTo(nodes[b].mesh.position) < CONN_DIST) {
                            connections[ci] = makeConn(a, b);
                            break;
                        }
                    }
                    return;
                }

                const prog  = c.life / c.maxLife;
                const alpha = prog < 0.1 ? prog / 0.1 : prog > 0.85 ? (1 - prog) / 0.15 : 1;

                if (c.firing) {
                    c.fireProgress += FIRE_SPEED;
                    if (c.fireProgress > 1) { c.firing = false; c.fireProgress = 0; }
                    mat.color.setHex(pal.fire);
                    mat.opacity = alpha;
                } else {
                    if (Math.random() < 0.001) { c.firing = true; c.fireProgress = 0; }
                    mat.color.setHex(pal.line);
                    mat.opacity = alpha * 0.5;
                }
            });

            camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
            camera.position.y += (mouse.y * 0.35 - camera.position.y) * 0.04;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("resize",    onResize);
            renderer.dispose();
        };
    }, []); // runs once on mount — canvas is always in the DOM

    // ── Theme values ──────────────────────────────────────────────────────
    const isDark = mounted ? resolvedTheme !== "light" : true;

    const clr = {
        primary:    isDark ? "#8B5CF6" : "#8B5CF6",
        subheading: isDark ? "#C4B5FD" : "#7C3AED",
        text:       isDark ? "#D1D5DB" : "#374151",
        tagBg:      isDark ? "#8B5CF620" : "#8B5CF615",
        tagBorder:  isDark ? "#8B5CF650" : "#8B5CF640",
        vignette:   isDark ? "#000000"   : "#F3E8FF",
        btnPrimBg:  isDark ? "#8B5CF620" : "#8B5CF618",
        btnPrimBdr: isDark ? "#8B5CF680" : "#8B5CF670",
        btnSecBdr:  isDark ? "#ffffff20" : "#00000020",
        btnSecClr:  isDark ? "#ffffff55" : "#00000055",
    };

    return (
        <>
            <style>{`
        .hero-escape {
          margin-top:    -1.5rem;
          margin-left:   -2rem;
          margin-right:  -2rem;
          margin-bottom: -2.5rem;
        }
        @keyframes _fu {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu1 { animation: _fu .6s .05s ease both; }
        .fu2 { animation: _fu .6s .2s  ease both; }
        .fu3 { animation: _fu .6s .35s ease both; }
        .fu4 { animation: _fu .6s .5s  ease both; }
        .fu5 { animation: _fu .6s .68s ease both; }

        @keyframes _sb {
          0%,100% { transform:translateX(-50%) translateY(0);   opacity:.4; }
          50%      { transform:translateX(-50%) translateY(7px); opacity:1;  }
        }
        .hero-scroll { animation: _sb 2.2s ease-in-out infinite; }

        .hero-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 3px 12px; border-radius: 4px;
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .67rem; letter-spacing: .08em;
          background: ${clr.tagBg};
          border: 1px solid ${clr.tagBorder};
          color: ${clr.subheading};
        }
        .hero-btn-p {
          display: inline-block; padding: 11px 30px; border-radius: 4px;
          border: 1px solid ${clr.btnPrimBdr};
          background: ${clr.btnPrimBg};
          color: ${clr.subheading};
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
          text-decoration: none; cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
        }
        .hero-btn-p:hover { background: ${clr.primary}; color: #fff; border-color: ${clr.primary}; }

        .hero-btn-s {
          display: inline-block; padding: 11px 30px; border-radius: 4px;
          border: 1px solid ${clr.btnSecBdr};
          color: ${clr.btnSecClr};
          font-family: var(--font-mono), 'Fira Code', monospace;
          font-size: .72rem; letter-spacing: .14em; text-transform: uppercase;
          text-decoration: none; background: transparent; cursor: pointer;
          transition: border-color .2s, color .2s, background .2s;
        }
        .hero-btn-s:hover { border-color: ${clr.btnPrimBdr}; color: ${clr.subheading}; background: ${clr.tagBg}; }
      `}</style>

            <section
                className="hero-escape"
                style={{
                    position: "relative",
                    minHeight: "calc(100vh - 64px)",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                {/* ── Canvas sits directly in the DOM, always rendered ── */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        top: 0, left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 0,
                        display: "block",
                    }}
                />

                {/* Soft edge vignette */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                    background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, ${clr.vignette}cc 100%)`,
                }} />

                {/* ── Content ── */}
                <div style={{ position: "relative", zIndex: 2, maxWidth: 920, padding: "64px 56px" }}>

                    <div className="fu1" style={{ marginBottom: 22 }}>
            <span className="hero-tag">
              <span style={{ color: clr.primary }}>◉</span>
              CS + AI @ Adelphi · PhD Applicant
            </span>
                    </div>

                    <h1 className="fu2" style={{
                        fontFamily: "var(--font-sans), Inter, sans-serif",
                        fontSize: "clamp(3rem, 9vw, 7rem)",
                        fontWeight: 800, lineHeight: .9, letterSpacing: "-.03em",
                        color: clr.text, margin: 0,
                    }}>
                        Onkar
                    </h1>
                    <h1 className="fu3" style={{
                        fontFamily: "var(--font-sans), Inter, sans-serif",
                        fontSize: "clamp(3rem, 9vw, 7rem)",
                        fontWeight: 800, lineHeight: .9, letterSpacing: "-.03em",
                        color: clr.primary, marginBottom: 28,
                    }}>
                        Dhillon
                    </h1>

                    <p className="fu4" style={{
                        fontFamily: "var(--font-mono), 'Fira Code', monospace",
                        fontSize: "clamp(.82rem, 1.7vw, 1rem)",
                        color: clr.subheading, letterSpacing: ".02em",
                        lineHeight: 1.8, maxWidth: 520, minHeight: "3.2em", marginBottom: 28,
                    }}>
                        {typed}
                        <span style={{ opacity: cursor ? 1 : 0, color: clr.primary }}>▌</span>
                    </p>

                    <div className="fu4" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 38 }}>
                        {["k-NN & Info Gain", "Epidemic Modeling", "Neural Architectures", "ML / AI", "Open Source"].map(t => (
                            <span key={t} className="hero-tag">{t}</span>
                        ))}
                    </div>

                    <div className="fu5" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <a href="/about"       className="hero-btn-p">About Me</a>
                        <a href="/resume"      className="hero-btn-s">Resume</a>
                        <a href="/open-source" className="hero-btn-s">Open Source</a>
                        <a href="/contact-me"  className="hero-btn-s">Contact</a>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="hero-scroll" style={{
                    position: "absolute", bottom: 28, left: "50%",
                    transform: "translateX(-50%)", zIndex: 2,
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                }}>
          <span style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: ".57rem", letterSpacing: ".2em",
              color: clr.subheading + "80", textTransform: "uppercase",
          }}>scroll</span>
                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
                        <rect x="1" y="1" width="12" height="18" rx="6" stroke={clr.subheading + "60"} strokeWidth="1.2"/>
                        <rect x="6" y="4" width="2"  height="5"  rx="1" fill={clr.primary}/>
                    </svg>
                </div>

                <div style={{
                    position: "absolute", bottom: 24, right: 40, zIndex: 2,
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: ".57rem", letterSpacing: ".08em",
                    color: clr.subheading + "40",
                }}>
                    40.7128° N · 74.0060° W
                </div>
            </section>
        </>
    );
}
