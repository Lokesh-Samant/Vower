import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const CommingSoon = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after mount
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;600;700&display=swap');

        .cs-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #000000;
        }

        .cs-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #000000;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* Radial glow behind logo */
        .cs-wrapper::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
          pointer-events: none;
          animation: cs-glowPulse 4s ease-in-out infinite;
        }

        /* Subtle grain overlay */
        .cs-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .cs-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cs-content.cs-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* V Logo */
        .cs-logo {
          width: 140px;
          height: 140px;
          object-fit: contain;
          border-radius: 16px;
          animation: cs-logoFloat 6s ease-in-out infinite;
          filter: drop-shadow(0 0 40px rgba(255,255,255,0.08));
        }

        /* Word Logo */
        .cs-wordlogo {
          height: 32px;
          object-fit: contain;
          margin-top: 24px;
          filter: invert(0);
        }

        /* Divider line */
        .cs-divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          margin: 40px 0;
          border: none;
        }

        /* Coming Soon heading */
        .cs-heading {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 200;
          color: #ffffff;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin: 0;
          text-align: center;
        }

        /* Tagline */
        .cs-tagline {
          font-size: clamp(0.85rem, 2vw, 1.05rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.15em;
          margin-top: 20px;
          text-align: center;
        }

        /* Animated dots */
        .cs-dots {
          display: flex;
          gap: 8px;
          margin-top: 48px;
        }

        .cs-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          animation: cs-dotPulse 1.8s ease-in-out infinite;
        }

        .cs-dot:nth-child(2) {
          animation-delay: 0.3s;
        }

        .cs-dot:nth-child(3) {
          animation-delay: 0.6s;
        }

        /* Bottom subtle line */
        .cs-bottom-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          z-index: 1;
        }

        /* ---- Animations ---- */

        @keyframes cs-glowPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -60%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -60%) scale(1.15); }
        }

        @keyframes cs-logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes cs-dotPulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        /* ---- Responsive ---- */

        @media (max-width: 600px) {
          .cs-logo {
            width: 100px;
            height: 100px;
          }
          .cs-wordlogo {
            height: 24px;
            margin-top: 18px;
          }
          .cs-divider {
            margin: 28px 0;
          }
        }
      `}</style>

      <div className="cs-page">
        {/* Header */}
        <Header />

        {/* Coming Soon Main Content */}
        <div className="cs-wrapper">
          <div className={`cs-content ${visible ? "cs-visible" : ""}`}>
            {/* V Icon Logo */}
            <img
              src="/logo.jpeg"
              alt="Vower Logo"
              className="cs-logo"
            />

            {/* VOWER Word Logo */}
            <img
              src="/WORDLOGON.png"
              alt="Vower"
              className="cs-wordlogo"
            />

            {/* Divider */}
            <hr className="cs-divider" />

            {/* Coming Soon */}
            <h1 className="cs-heading">Coming Soon</h1>

            {/* Tagline */}
            <p className="cs-tagline">Something extraordinary is on its way</p>

            {/* Animated loading dots */}
            <div className="cs-dots">
              <span className="cs-dot"></span>
              <span className="cs-dot"></span>
              <span className="cs-dot"></span>
            </div>
          </div>

          <div className="cs-bottom-line"></div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default CommingSoon;
