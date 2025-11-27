"use client";

import React, { useState } from "react";
import { shortPoem, victorianLetter } from "../../poem";

const Page: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  const poemParagraphs = shortPoem.trim().split("\n\n");
  const letterParagraphs = victorianLetter.trim().split("\n\n");

  return (
    <main className="page-root">
      {/* --- PHOTO COLLAGE BACKGROUND (now with actual children) --- */}
      <div className="photo-collage-bg">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

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
              <article className="scroll-text">
                {letterParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </article>
            </div>
          </div>
        </div>
      )}

      {/* --- GLOBAL STYLES --- */}
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
          color: #f9fafb;
        }

        /* --- PHOTO COLLAGE GRID --- */
        .photo-collage-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 1fr);
          pointer-events: none;
          overflow: hidden;
        }

        .photo-collage-bg > div {
          background-size: cover;
          background-position: center;
          filter: brightness(0.7) contrast(0.9) blur(2px);
        }

        .photo-collage-bg > div:nth-child(1) {
          background-image: url("/photos/1.png");
        }
        .photo-collage-bg > div:nth-child(2) {
          background-image: url("/photos/2.png");
        }
        .photo-collage-bg > div:nth-child(3) {
          background-image: url("/photos/3.png");
        }
        .photo-collage-bg > div:nth-child(4) {
          background-image: url("/photos/4.png");
        }
        .photo-collage-bg > div:nth-child(5) {
          background-image: url("/photos/5.png");
        }
        .photo-collage-bg > div:nth-child(6) {
          background-image: url("/photos/6.png");
        }

        /* subtle dark overlay */
        .photo-collage-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(1px);
        }

        /* --- PAGE LAYOUT --- */

        .page-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          position: relative;
          z-index: 2;
        }

        .page-content {
          width: 100%;
          max-width: 720px;
          z-index: 2;
        }

        .card {
          background: rgba(8, 12, 24, 0.88);
          backdrop-filter: blur(22px);
          border-radius: 22px;
          border: 1px solid rgba(251, 191, 36, 0.3);
          padding: 1.4rem 1.2rem;
          max-height: 82vh;
          overflow-y: auto;
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.7);
        }

        .card-header {
          margin-bottom: 0.6rem;
        }

        .card-title {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(1.4rem, 2vw, 1.9rem);
          color: #fef9c3;
        }

        .card-subtitle {
          margin: 0 0 0.25rem 0;
          font-size: 0.7rem;
          opacity: 0.7;
          letter-spacing: 0.5px;
        }

        .poem-stanza {
          margin-bottom: 0.7rem;
          font-family: Georgia, serif;
          font-size: 0.88rem;
          line-height: 1.55;
        }

        .poem-line {
          display: block;
        }

        .card-footer {
          margin-top: 1.2rem;
        }

        .scroll-button {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          border-radius: 8px;
          background: rgba(251, 191, 36, 0.15);
          border: 1px solid rgba(251, 191, 36, 0.3);
          color: #fef9c3;
          cursor: pointer;
        }

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
      `}</style>
    </main>
  );
};

export default Page;
