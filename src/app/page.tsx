"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const starsRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate stars
    if (starsRef.current) {
      for (let i = 0; i < 90; i++) {
        const s = document.createElement("div");
        s.className = "star";
        const size = 1 + Math.random() * 2;
        s.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 65}%;
          --d: ${2.5 + Math.random() * 3.5}s;
          --delay: ${Math.random() * 4}s;
          opacity: ${0.2 + Math.random() * 0.7};
          width: ${size}px;
          height: ${size}px;
        `;
        starsRef.current.appendChild(s);
      }
    }

    // Generate floating gold particles
    if (sceneRef.current) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.cssText = `
          left: ${15 + Math.random() * 70}%;
          bottom: ${38 + Math.random() * 30}%;
          --dur: ${6 + Math.random() * 8}s;
          --delay: ${Math.random() * 6}s;
          --dx: ${(Math.random() - 0.5) * 40}px;
          --dy: ${-(15 + Math.random() * 40)}px;
          --dx2: ${(Math.random() - 0.5) * 30}px;
          --dy2: ${-(30 + Math.random() * 60)}
        `;
        sceneRef.current.appendChild(p);
      }
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&family=Raleway:wght@200;300;400;500&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --gold: #c8883d;
          --gold-light: #e8c07a;
          --deep: #ffffff;
          --navy: #f8f5f0;
          --cream: #faf6ef;
          --text: #2d3748;
          --text-light: #4a5568;
        }

        html, body {
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: 'Raleway', sans-serif;
          background: var(--deep);
        }

        .scene {
          position: fixed;
          inset: 0;
          background: linear-gradient(160deg, #ffffff 0%, #faf8f5 40%, #f5f0e8 100%);
          overflow: hidden;
        }

        .sky {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%,
            rgba(200,138,61,0.08) 0%,
            rgba(250,248,245,0.5) 50%,
            transparent 100%);
        }

        .stars { position: absolute; inset: 0; }

        .star {
          position: absolute;
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          animation: twinkle var(--d, 3s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        .moon {
          position: absolute;
          top: 8%;
          right: 12%;
          width: 70px;
          height: 70px;
          filter: drop-shadow(0 0 30px rgba(200,138,61,0.3));
          animation: moonGlow 4s ease-in-out infinite;
        }

        @keyframes moonGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(200,138,61,0.2)); }
          50% { filter: drop-shadow(0 0 45px rgba(200,138,61,0.4)); }
        }

        .horizon {
          position: absolute;
          bottom: 35%;
          left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to top, rgba(200,138,61,0.06) 0%, transparent 100%);
        }

        .dunes { position: absolute; bottom: 0; left: 0; right: 0; height: 40%; }

        .dune-back {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 100%;
          background: linear-gradient(to top, #e8e0d5 0%, transparent 100%);
          clip-path: polygon(0% 100%, 0% 60%, 8% 48%, 18% 38%, 30% 28%, 42% 22%, 52% 26%, 62% 18%, 72% 24%, 82% 30%, 90% 36%, 100% 30%, 100% 100%);
          opacity: 0.5;
        }

        .dune-mid {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 80%;
          background: linear-gradient(to bottom, #f0ebe2, #e5ded3);
          clip-path: polygon(0% 100%, 0% 80%, 12% 60%, 25% 45%, 38% 52%, 50% 35%, 62% 48%, 75% 38%, 88% 50%, 100% 42%, 100% 100%);
          opacity: 0.6;
        }

        .dune-front {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 60%;
          background: linear-gradient(to bottom, #f5efe6 0%, #ebe4d6 100%);
          clip-path: polygon(0% 100%, 0% 90%, 15% 72%, 28% 80%, 42% 65%, 55% 75%, 68% 60%, 80% 70%, 92% 62%, 100% 68%, 100% 100%);
          opacity: 0.8;
        }

        .palm {
          position: absolute;
          bottom: 34%;
          filter: drop-shadow(0 0 8px rgba(200,138,61,0.1));
          opacity: 0.4;
        }
        .palm-l { left: 5%; }
        .palm-r { right: 7%; transform: scaleX(-1); }

        .mosque {
          position: absolute;
          bottom: 34%;
          left: 50%;
          transform: translateX(-50%);
          filter: drop-shadow(0 0 20px rgba(200,138,61,0.1));
          opacity: 0.2;
        }

        .divider-line {
          position: absolute;
          bottom: 34%;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right,
            transparent 0%,
            rgba(200,138,61,0.4) 20%,
            rgba(232,192,122,0.7) 50%,
            rgba(200,138,61,0.4) 80%,
            transparent 100%);
        }

        .content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-bottom: 10%;
          animation: fadeUp 1.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(200,138,61,0.5);
          background: rgba(200,138,61,0.06);
          padding: 7px 20px;
          border-radius: 100px;
          color: #c8883d;
          font-family: 'Cinzel', serif;
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          animation: fadeUp 1.6s 0.2s cubic-bezier(0.16,1,0.3,1) both;
          margin-bottom: 28px;
        }
        .badge::before, .badge::after {
          content: '';
          width: 18px; height: 1px;
          background: #c8883d;
        }

        .logo-wrap {
          text-align: center;
          animation: fadeUp 1.6s 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }

        .logo-sub {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 13px;
          letter-spacing: 0.55em;
          color: rgba(200,138,61,0.8);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .logo-main {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: clamp(38px, 7vw, 88px);
          color: #1a202c;
          line-height: 1;
          letter-spacing: 0.04em;
          text-shadow: none;
        }
        .logo-gold { color: #c8883d; }

        .logo-amp {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 0.7em;
          color: rgba(200,136,61,0.7);
          display: block;
          margin: 6px 0;
          letter-spacing: 0.1em;
        }

        .logo-agency {
          font-family: 'Cinzel', serif;
          font-size: clamp(14px, 2vw, 22px);
          color: rgba(200,138,61,0.8);
          letter-spacing: 0.32em;
          font-weight: 400;
          text-transform: uppercase;
          margin-top: 10px;
        }

        .tagline {
          animation: fadeUp 1.6s 0.5s cubic-bezier(0.16,1,0.3,1) both;
          margin-top: 22px;
          text-align: center;
        }

        .tagline-main {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(18px, 2.5vw, 26px);
          color: rgba(45,55,72,0.7);
          letter-spacing: 0.06em;
        }

        .ornament {
          display: flex;
          align-items: center;
          gap: 14px;
          justify-content: center;
          margin: 22px 0;
          animation: fadeUp 1.6s 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .orn-line {
          width: 60px; height: 1px;
          background: linear-gradient(to right, transparent, rgba(200,138,61,0.5));
        }
        .orn-line:last-child {
          background: linear-gradient(to left, transparent, rgba(200,138,61,0.5));
        }
        .orn-diamond {
          width: 6px; height: 6px;
          background: #c8883d;
          transform: rotate(45deg);
          box-shadow: 0 0 10px #c8883d;
        }
        .orn-dot {
          width: 3px; height: 3px;
          background: rgba(200,138,61,0.5);
          transform: rotate(45deg);
        }

        .btn-wrap {
          animation: fadeUp 1.6s 0.75s cubic-bezier(0.16,1,0.3,1) both;
        }

        .login-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 48px;
          background: transparent;
          border: 1px solid #c8883d;
          background-color: #c8883d;
          color: white;
          border-radius:4px;
          font-weight: 900;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.4s, border-color 0.4s, box-shadow 0.4s;
        }
        .login-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200,138,61,0.2), rgba(200,138,61,0.08));
          transform: translateX(-100%);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .login-btn:hover::before { transform: translateX(0); }
        .login-btn:hover {
          color: #1a202c;
          border-color: #c8883d;
          box-shadow: 0 0 40px rgba(200,138,61,0.15);
        }
        .login-btn:hover .btn-arrow { width: 32px; }

        .btn-arrow {
          width: 20px; height: 1px;
          background: currentColor;
          position: relative;
          transition: width 0.3s;
        }
        .btn-arrow::after {
          content: '';
          position: absolute;
          right: 0; top: -3px;
          width: 7px; height: 7px;
          border-right: 1px solid currentColor;
          border-top: 1px solid currentColor;
          transform: rotate(45deg);
        }

        .corner {
          position: absolute;
          width: 50px; height: 50px;
        }
        .corner-tl { top: 24px; left: 24px; border-top: 1px solid rgba(200,138,61,0.35); border-left: 1px solid rgba(200,138,61,0.35); }
        .corner-tr { top: 24px; right: 24px; border-top: 1px solid rgba(200,138,61,0.35); border-right: 1px solid rgba(200,138,61,0.35); }
        .corner-bl { bottom: 24px; left: 24px; border-bottom: 1px solid rgba(200,138,61,0.35); border-left: 1px solid rgba(200,138,61,0.35); }
        .corner-br { bottom: 24px; right: 24px; border-bottom: 1px solid rgba(200,138,61,0.35); border-right: 1px solid rgba(200,138,61,0.35); }

        .bottom-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0 48px 28px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          animation: fadeUp 1.6s 1s cubic-bezier(0.16,1,0.3,1) both;
        }

        .strip-item {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: rgba(200,138,61,0.5);
          text-transform: uppercase;
        }

        .particle {
          position: absolute;
          width: 2px; height: 2px;
          background: rgba(200,138,61,0.4);
          border-radius: 50%;
          animation: drift var(--dur, 8s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(var(--dx, 20px), var(--dy, -30px)) scale(1.5); opacity: 0.8; }
          66% { transform: translate(var(--dx2, -15px), var(--dy2, -50px)) scale(0.8); opacity: 0.5; }
        }
      `}</style>

      <div className="scene" ref={sceneRef}>
        {/* Sky */}
        <div className="sky" />

        {/* Stars container */}
        <div className="stars" ref={starsRef} />

        {/* Crescent Moon */}
        <svg className="moon" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M55 35C55 46.05 46.05 55 35 55C23.95 55 15 46.05 15 35C15 23.95 23.95 15 35 15C25 20 19 27.5 19 35C19 46.05 27.95 55 39 55C46.5 55 53 51 55 45C55 41.8 55 38.5 55 35Z"
            fill="rgba(200,138,61,0.85)"
          />
          <circle cx="47" cy="20" r="2" fill="rgba(200,138,61,0.5)" />
          <circle cx="53" cy="28" r="1.2" fill="rgba(200,138,61,0.4)" />
        </svg>

        {/* Horizon glow */}
        <div className="horizon" />

        {/* Dunes */}
        <div className="dunes">
          <div className="dune-back" />
          <div className="dune-mid" />
          <div className="dune-front" />
        </div>

        {/* Palm Left */}
        <svg className="palm palm-l" width="80" height="130" viewBox="0 0 80 130">
          <rect x="36" y="50" width="8" height="80" rx="4" fill="#0a1520" />
          <path d="M40 50 Q20 30 5 20 Q15 35 40 50Z" fill="#0c1e2e" />
          <path d="M40 50 Q60 28 75 15 Q63 32 40 50Z" fill="#0c1e2e" />
          <path d="M40 50 Q18 40 2 38 Q18 48 40 50Z" fill="#0a1a28" />
          <path d="M40 50 Q62 42 78 40 Q62 48 40 50Z" fill="#0a1a28" />
          <path d="M40 50 Q28 22 30 5 Q38 25 40 50Z" fill="#0c1e2e" />
          <path d="M40 50 Q52 24 50 7 Q42 27 40 50Z" fill="#0c1e2e" />
        </svg>

        {/* Palm Right */}
        <svg className="palm palm-r" width="80" height="130" viewBox="0 0 80 130">
          <rect x="36" y="50" width="8" height="80" rx="4" fill="#0a1520" />
          <path d="M40 50 Q20 30 5 20 Q15 35 40 50Z" fill="#0c1e2e" />
          <path d="M40 50 Q60 28 75 15 Q63 32 40 50Z" fill="#0c1e2e" />
          <path d="M40 50 Q18 40 2 38 Q18 48 40 50Z" fill="#0a1a28" />
          <path d="M40 50 Q28 22 30 5 Q38 25 40 50Z" fill="#0c1e2e" />
        </svg>

        {/* Mosque silhouette */}
        <svg className="mosque" width="220" height="120" viewBox="0 0 220 120">
          <ellipse cx="110" cy="55" rx="30" ry="35" fill="#0a1520" />
          <rect x="80" y="55" width="60" height="65" fill="#0a1520" />
          <rect x="55" y="30" width="14" height="90" rx="2" fill="#0a1520" />
          <ellipse cx="62" cy="30" rx="7" ry="10" fill="#0a1520" />
          <rect x="150" y="30" width="14" height="90" rx="2" fill="#0a1520" />
          <ellipse cx="157" cy="30" rx="7" ry="10" fill="#0a1520" />
          <rect x="28" y="55" width="10" height="65" rx="2" fill="#0a1520" />
          <ellipse cx="33" cy="55" rx="5" ry="8" fill="#0a1520" />
          <rect x="182" y="55" width="10" height="65" rx="2" fill="#0a1520" />
          <ellipse cx="187" cy="55" rx="5" ry="8" fill="#0a1520" />
          <path d="M100 70 Q110 62 120 70 L120 85 L100 85Z" fill="#0d2035" />
        </svg>

        {/* Horizon divider */}
        <div className="divider-line" />

        {/* Corner brackets */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Main content */}
        <div className="content">
          <div className="badge">Established Travel Agency · Pakistan</div>

          <div className="logo-wrap">
            <div className="logo-sub">Presenting</div>
            <div className="logo-main">
              <span className="logo-gold">Mumriz</span>
              <span className="logo-amp">&amp;</span>
              <span>Brother</span>
            </div>
            <div className="logo-agency">Travel Agency</div>
          </div>

          <div className="tagline">
            <div className="tagline-main">Where Every Journey Becomes a Memory</div>
          </div>

          <div className="ornament">
            <div className="orn-line" />
            <div className="orn-dot" />
            <div className="orn-diamond" />
            <div className="orn-dot" />
            <div className="orn-line" />
          </div>

          <div className="btn-wrap">
            <Link href="/login" className="login-btn cursor-pointer">
              Admin Login
              <span className="btn-arrow" />
            </Link>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="bottom-strip">
          <div className="strip-item">Admin Portal</div>
          <div className="strip-item">Est. &nbsp;·&nbsp; Trusted Travels</div>
          <div className="strip-item">Secure Access</div>
        </div>
      </div>
    </>
  );
}