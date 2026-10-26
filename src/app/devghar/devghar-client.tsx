"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Compass,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  ChevronLeft,
  X,
  Star,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const phoneNumber = "919175379886";
const formattedPhone = "+91 9175379886";

const waLink = (msg: string) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;

/* Hand-Drawn Wavy Underline SVG */
function DoodleUnderline({ color = "#e2bf65" }: { color?: string }) {
  return (
    <svg
      className="doodle-underline"
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M3 13C45 4 105 15 150 7C185 1 215 11 237 8"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C55 8 115 16 160 9C195 4 220 12 232 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

export function DevgharClient() {
  const [dockOpen, setDockOpen] = useState(false);

  return (
    <div className="site-shell">
      <SiteHeader />

      <main style={{ padding: "clamp(24px, 5vw, 48px) clamp(16px, 4vw, 40px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Back link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--gold-light)",
              fontSize: "15px",
              marginBottom: "20px",
              fontWeight: "700",
            }}
          >
            <ChevronLeft size={18} />
            <span>← Back to Home</span>
          </Link>

          {/* Heading */}
          <div style={{ marginBottom: "32px" }}>
            <span className="section-tag-gold">
              <Compass size={14} />
              <span>🛕 POOJA MANDIR SPECIALISTS · VASTU SANCTUARY</span>
            </span>

            <h1 style={{ fontSize: "clamp(32px, 6.5vw, 52px)", color: "#ffffff", fontWeight: "700", lineHeight: "1.15" }}>
              Sacred Wooden Devghars
            </h1>
            <DoodleUnderline color="#e2bf65" />

            <p style={{ fontSize: "16.5px", color: "var(--ink-secondary)", maxWidth: "720px", lineHeight: "1.65" }}>
              Handcrafted in seasoned solid Burma teak timber. Features a precision laser Om and
              lotus jali backdrop illuminated by concealed warm 2700K ambient backlighting, smooth sliding
              brass aarti tray, and twin soft-close pooja accessories drawers finished in heat- and
              diya-oil resistant melamine polish.
            </p>
          </div>

          {/* Main Devghar Feature Spotlight */}
          <div className="devghar-glow-card" style={{ marginBottom: "40px" }}>
            <div className="devghar-halo-frame">
              <Image
                src="/assets/devghar-source.png"
                alt="Parihar Sacred Teak Devghar Mandir"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                priority
              />
            </div>

            <div className="devghar-content-side">
              <span className="section-tag-gold">
                <span>100% Solid Burma Teak</span>
              </span>

              <h2>
                Sanctuary Specifications
                <span>सुंदर आणि पवित्र देवघर · Vastu-Aligned Dimensions</span>
              </h2>

              <p style={{ color: "var(--ink-secondary)", fontSize: "16px", lineHeight: "1.65" }}>
                Every home has a dedicated sacred space. We manufacture custom wall-hung and floor-standing
                teakwood temples tailored to your prayer room&apos;s exact height and width requirements.
              </p>

              <div className="devghar-spec-chips">
                <div className="devghar-spec-item">
                  <strong>✨ Concealed 2700K Halo</strong>
                  <small>Warm diffused ambient backlight behind laser jali.</small>
                </div>
                <div className="devghar-spec-item">
                  <strong>✓ Diya Oil & Heat Resistant</strong>
                  <small>Melamine barrier protective against oil and incense.</small>
                </div>
                <div className="devghar-spec-item">
                  <strong>🛕 Dual Aarti Trays</strong>
                  <small>Smooth pull-out brass-fitted extension trays.</small>
                </div>
                <div className="devghar-spec-item">
                  <strong>📐 Custom Apartment Sizing</strong>
                  <small>Wall-hung or floor-standing configurations.</small>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
                <a
                  href={waLink("Hello Parihar Furniture! Please share photos, sizes and prices for Wooden Devghar Mandirs.")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-primary"
                  style={{ flex: 1, minWidth: "220px", justifyContent: "center" }}
                >
                  <MessageCircle size={18} />
                  <span>Get Devghar Catalog on WhatsApp</span>
                </a>

                <a
                  href={`tel:+${phoneNumber}`}
                  className="btn-glass-champagne"
                >
                  <Phone size={17} />
                  <span>Call {formattedPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Tap-to-Appear Mobile Bottom Dock */}
      {!dockOpen && (
        <button
          type="button"
          className="dock-trigger-bubble"
          onClick={() => setDockOpen(true)}
          aria-label="Tap to open quick actions menu"
        >
          <Sparkles size={15} style={{ color: "var(--gold-light)" }} />
          <span>Quick Actions</span>
          <span className="dock-trigger-badge">Tap ✦</span>
        </button>
      )}

      {dockOpen && (
        <div className="liquid-floating-dock">
          <a
            href={`tel:+${phoneNumber}`}
            className="dock-btn"
            onClick={() => setDockOpen(false)}
          >
            <Phone size={16} />
            <span>Call</span>
          </a>

          <Link
            href="/reviews"
            className="dock-btn"
            onClick={() => setDockOpen(false)}
          >
            <Star size={16} fill="var(--gold-light)" color="var(--gold-light)" />
            <span>Reviews</span>
          </Link>

          <a
            href={waLink("Hello Parihar Furniture! I would like to get a Devghar quote.")}
            target="_blank"
            rel="noreferrer"
            className="dock-btn highlight-wa"
            onClick={() => setDockOpen(false)}
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/location"
            className="dock-btn"
            onClick={() => setDockOpen(false)}
          >
            <MapPin size={16} />
            <span>Visit</span>
          </Link>

          <button
            type="button"
            className="dock-close-btn"
            onClick={() => setDockOpen(false)}
            aria-label="Close Quick Actions Menu"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="site-footer-light">
        <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "700" }}>
          © {new Date().getFullYear()} Parihar Furniture & Interior · Vishrantwadi, Pune
        </span>
        <span style={{ color: "var(--gold-light)", fontWeight: "500" }}>
          Call Owner: {formattedPhone} · 100% Solid Burma Teak & Sheesham
        </span>
        <div style={{ display: "flex", justifyContent: "center", gap: "18px", marginTop: "6px" }}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
          <Link href="/devghar">Devghar</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/location">Location</Link>
        </div>
      </footer>
    </div>
  );
}
