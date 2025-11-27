"use client";

import React, { useState } from "react";
import { shortPoem, victorianLetter } from "../../poem";

const Page: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  const poemParagraphs = shortPoem.trim().split("\n\n");
  const letterParagraphs = victorianLetter.trim().split("\n\n");

  return (
    <main className="page-root">
      {/* --- PHOTO COLLAGE BACKGROUND --- */}
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
        {/* WRAPPER THAT ALLOWS THE TURKEY TO ESCAPE THE CARD */}
        <div className="card-wrapper">
          {/* FLOATING TURKEY (now ABOVE the card, not inside it) */}
          <img
            src="/turkey.png"
            alt="Turkey"
            className="floating-turkey"
            aria-hidden="true"
          />

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

            {/* --- FOOTER --- */}
            <footer className="card-footer">
              <p
                className="card-footer-text clickable"
                onClick={() => setShowScroll(true)}
              >
                P.S. There’s more — tap to open the letter.
              </p>

              <button
                type="button"
                className="scroll-button clickable"
                onClick={() => setShowScroll(true)}
              >
                open letter
              </button>
            </footer>
          </section>
        </div>
      </div>

      {/* --- MODAL --- */}
      {showScroll && (
        <div
          className="modal-backdrop clickable"
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-scroll">
            <button
              type="button"
              className="modal-close clickable"
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

      {/* --- SPONSORSHIP BANNER --- */}
      <div className="sponsor-banner">
        sponsored by <strong>Magic Sparkle Wonderland Inc.</strong>{" "}
        <span className="serious">(we don’t take this lightly)</span>
      </div>

      {/* --- GLOBAL STYLING --- */}
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

        .clickable {
          cursor: pointer;
        }

        /* WRAPPER FOR CARD + TURKEY */
        .card-wrapper {
          position: relative;
          width: 100%;
        }

        /* --- FLOATING TURKEY --- */
        .floating-turkey {
          position: absolute;
          top: -28px;
          right: -24px;
          width: 95px;
          height: auto;
          z-index: 9999;
          pointer-events: none;
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.7));
          animation: turkey-float 3.2s ease-in-out infinite;
        }

        @keyframes turkey-float {
          0% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
          100% {
            transform: translateY(0px) rotate(-3deg);
          }
        }

        /* --- SPONSOR BANNER --- */
        .sponsor-banner {
          position: fixed;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          padding: 0.6rem 1.2rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          font-size: 0.75rem;
          letter-spacing: 0.3px;
          color: #fdf5d2;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          z-index: 99999;
          animation: sponsor-pop 0.7s ease-out;
        }

        .sponsor-banner strong {
          color: #fff7ae;
        }

        .sponsor-banner .serious {
          opacity: 0.75;
          font-style: italic;
          margin-left: 4px;
        }

        @keyframes sponsor-pop {
          from {
            opacity: 0;
            transform: translate(-50%, 8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        /* --- PHOTO COLLAGE BG --- */
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
          position: relative;
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
          margin-top: 1.4rem;
          text-align: center;
        }

        .card-footer-text {
          font-size: 0.9rem;
          margin-bottom: 0.7rem;
          opacity: 0.85;
          color: #fef9c3;
          font-style: italic;
          transition: opacity 0.2s ease;
        }

        .card-footer-text:hover {
          opacity: 1;
        }

        .scroll-button {
          padding: 0.55rem 1.2rem;
          font-size: 0.9rem;
          border-radius: 10px;
          background: rgba(251, 191, 36, 0.2);
          border: 1px solid rgba(251, 191, 36, 0.35);
          color: #fef9c3;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .scroll-button:hover {
          background: rgba(251, 191, 36, 0.3);
        }

        /* --- MODAL --- */
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
          cursor: pointer;
        }

        .modal-scroll {
          width: 100%;
          max-width: 640px;
          position: relative;
          animation: scroll-pop 260ms ease-out;
          cursor: default;
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
