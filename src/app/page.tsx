"use client";

import React, { useState } from "react";
import { shortPoem, victorianLetter } from "../../poem";

const Page: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  const poemParagraphs = shortPoem.trim().split("\n\n");
  const letterParagraphs = victorianLetter.trim().split("\n\n");

  return (
    <main className="page-root">
      <div className="page-overlay" />

      <div className="page-content">
        <section className="card">
          <header className="card-header">
            <p className="card-subtitle">Thanksgiving · 2025</p>
            <h1 className="card-title">
              For Anna, in the Quiet Between Scenes
            </h1>
          </header>

          <section className="card-body">
            {poemParagraphs.map((stanza, i) => (
              <p key={i} className="poem-stanza">
                {stanza.split("\n").map((line, j) => (
                  <span className="poem-line" key={j}>
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </section>

          <footer className="card-footer">
            <p className="card-footer-text">
              P.S. click this button. there is more.
            </p>

            <button
              type="button"
              className="scroll-button"
              onClick={() => setShowScroll(true)}
            >
              click me
            </button>
          </footer>
        </section>
      </div>

      {showScroll && (
        <div className="modal-backdrop" aria-modal="true" role="dialog">
          <div className="modal-scroll">
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowScroll(false)}
            >
              ✕
            </button>

            <div className="scroll-inner scrollable-letter">
              <div className="scroll-ornament scroll-ornament--top" />

              <article className="scroll-text">
                {letterParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </article>

              <div className="scroll-ornament scroll-ornament--bottom" />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root {
          color-scheme: dark;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont,
            "SF Pro Text", "Segoe UI", sans-serif;
        }

        body {
          min-height: 100vh;
          background: radial-gradient(
            circle at top,
            #f7e6c4 0,
            #0b1020 45%,
            #040712 100%
          );
          color: #f9fafb;
        }

        .page-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        .page-content {
          width: 100%;
          max-width: 720px; /* ↓ smaller */
          z-index: 1;
        }

        .card {
          background: rgba(8, 12, 24, 0.88);
          backdrop-filter: blur(22px);
          border-radius: 22px; /* ↓ smaller */
          border: 1px solid rgba(251, 191, 36, 0.3);

          padding: 1.4rem 1.2rem; /* ↓ significantly smaller */
          max-height: 82vh; /* ↓ smaller */
          overflow-y: auto;

          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.7);
          position: relative;
        }

        .card-header {
          margin-bottom: 0.6rem; /* ↓ smaller */
        }

        .card-title {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(1.4rem, 2vw, 1.9rem); /* ↓ smaller */
          color: #fef9c3;
        }

        .card-subtitle {
          margin: 0 0 0.25rem 0;
          font-size: 0.7rem; /* ↓ smaller */
          opacity: 0.7;
          letter-spacing: 0.5px;
        }

        .poem-stanza {
          margin-bottom: 0.7rem; /* ↓ smaller */
          font-family: Georgia, serif;
          font-size: 0.88rem; /* ↓ smaller */
          line-height: 1.55; /* ↓ slightly */
        }

        .poem-line {
          display: block;
        }

        .card-footer {
          margin-top: 1.2rem; /* ↓ smaller */
        }

        .card-footer-text {
          font-size: 0.85rem; /* ↓ smaller */
          margin-bottom: 0.6rem;
          opacity: 0.85;
        }

        .scroll-button {
          padding: 0.5rem 1rem;
          font-size: 0.85rem; /* ↓ smaller */
          border-radius: 8px;
          background: rgba(251, 191, 36, 0.15);
          border: 1px solid rgba(251, 191, 36, 0.3);
          color: #fef9c3;
          cursor: pointer;
          transition: background 0.15s ease, border 0.15s ease;
        }

        .scroll-button:hover {
          background: rgba(251, 191, 36, 0.25);
        }

        /* --- MODAL (unchanged) --- */

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 20, 0.92);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          z-index: 50;
        }

        .modal-scroll {
          width: 100%;
          max-width: 640px;
          position: relative;
          animation: scroll-pop 260ms ease-out;
        }

        .modal-close {
          position: absolute;
          top: -2.2rem;
          right: 0;
          color: #ddd;
          font-size: 1.3rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        .scrollable-letter {
          max-height: 80vh;
          overflow-y: auto;
        }

        .scroll-inner {
          background: radial-gradient(
            circle at top left,
            #fffaf0 0,
            #f1c88f 80%
          );
          padding: 1.8rem;
          border-radius: 22px;
          border: 2px solid rgba(120, 53, 15, 0.8);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.85);
        }

        .scroll-text {
          font-family: "Palatino Linotype", serif;
          font-size: 1rem;
          color: #3b1f0b;
          line-height: 1.7;
        }

        @keyframes scroll-pop {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </main>
  );
};

export default Page;
