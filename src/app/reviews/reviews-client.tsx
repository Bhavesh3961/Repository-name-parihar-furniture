"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Star,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  X,
  Share2,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { seedReviews } from "@/data/seed";

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

export function ReviewsClient() {
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

          {/* Page Header */}
          <div style={{ marginBottom: "32px" }}>
            <span className="section-tag-gold">
              <Star size={15} fill="var(--gold-light)" />
              <span>4.8★ GOOGLE VERIFIED CLIENT EXPERIENCES</span>
            </span>

            <h1 style={{ fontSize: "clamp(32px, 6.5vw, 52px)", color: "#ffffff", fontWeight: "700", lineHeight: "1.15" }}>
              Homeowner Testimonials
            </h1>
            <DoodleUnderline color="#e2bf65" />

            <p style={{ fontSize: "16.5px", color: "var(--ink-secondary)", maxWidth: "680px", lineHeight: "1.65" }}>
              Authentic stories from homeowners across Pune who commissioned custom Burma teak sofas,
              hydraulic storage beds, and sacred Devghar sanctuaries directly from our Vishrantwadi atelier.
            </p>
          </div>

          {/* Ratings Overview Card (Apple Liquid Glass) */}
          <div
            style={{
              padding: "24px 28px",
              borderRadius: "26px 12px 24px 14px / 14px 24px 12px 26px",
              background: "var(--canvas-card)",
              backdropFilter: "blur(32px)",
              border: "1.8px solid var(--gold-border)",
              boxShadow: "var(--glass-specular)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
              alignItems: "center",
              marginBottom: "36px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  fontFamily: "var(--font-kalam)",
                  fontSize: "52px",
                  fontWeight: "700",
                  color: "#ffffff",
                  lineHeight: "1",
                }}
              >
                4.8
              </div>
              <div>
                <div style={{ color: "var(--gold-light)", fontSize: "20px", letterSpacing: "2px" }}>
                  ★★★★★
                </div>
                <div style={{ fontSize: "13.5px", color: "var(--ink-muted)", marginTop: "2px" }}>
                  Google Verified Rating
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px" }}>
                <CheckCircle2 size={16} style={{ color: "#25d366" }} />
                <span style={{ color: "var(--ink-secondary)" }}>100% Solid Hardwood Verified</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px" }}>
                <CheckCircle2 size={16} style={{ color: "#25d366" }} />
                <span style={{ color: "var(--ink-secondary)" }}>0% Middleman Showroom Markups</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px" }}>
                <CheckCircle2 size={16} style={{ color: "#25d366" }} />
                <span style={{ color: "var(--ink-secondary)" }}>10-Year Structural Timber Warranty</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a
                href={waLink("Hello Parihar Furniture! I would like to share my feedback on our custom furniture piece.")}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-primary"
                style={{ height: "46px", fontSize: "15px", padding: "0 18px", justifyContent: "center", flex: "1 1 180px" }}
              >
                <MessageCircle size={16} />
                <span>Chat with Owner</span>
              </a>

              <a
                href={`tel:+${phoneNumber}`}
                className="btn-glass-champagne"
                style={{ height: "46px", fontSize: "14.5px", padding: "0 16px", justifyContent: "center" }}
              >
                <Phone size={15} />
                <span>Call {formattedPhone}</span>
              </a>
            </div>
          </div>

          {/* Testimonial Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "22px",
              marginBottom: "48px",
            }}
          >
            {seedReviews.map((rev) => (
              <article key={rev.id} className="review-item-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="review-stars-gold">★★★★★</div>
                  <span className="card-code-tag" style={{ position: "static" }}>
                    Verified Home
                  </span>
                </div>

                <blockquote className="review-body-text">
                  “{rev.quote}”
                </blockquote>

                <div className="review-client-footer">
                  <div className="client-avatar">{rev.name[0]}</div>
                  <div>
                    <strong style={{ fontSize: "16.5px", color: "#ffffff", display: "block" }}>
                      {rev.name}
                    </strong>
                    <small style={{ fontSize: "13px", color: "var(--gold-light)" }}>
                      {rev.role} · {rev.meta}
                    </small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Callout Card */}
          <div
            className="hand-drawn-callout"
            style={{
              padding: "28px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            <Sparkles size={24} style={{ color: "var(--gold-light)" }} />
            <h3 style={{ fontSize: "24px", color: "#ffffff", fontWeight: "700" }}>
              Looking for Custom Furniture for Your Pune Home?
            </h3>
            <p style={{ fontSize: "15.5px", color: "var(--ink-secondary)", maxWidth: "560px" }}>
              Every living room and bedroom is unique. Call owner directly at {formattedPhone} or visit our
              Vishrantwadi workshop to discuss your floorplan and timber choices.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={`tel:+${phoneNumber}`} className="btn-gold-primary">
                <Phone size={16} />
                <span>Call Workshop: {formattedPhone}</span>
              </a>

              <Link href="/catalog" className="btn-glass-champagne">
                <span>Browse Furniture Catalog</span>
                <ArrowRight size={16} />
              </Link>
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
            href="/catalog"
            className="dock-btn"
            onClick={() => setDockOpen(false)}
          >
            <Sparkles size={16} color="var(--gold-light)" />
            <span>Catalog</span>
          </Link>

          <a
            href={waLink("Hello Parihar Furniture! I would like to get a furniture quote.")}
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
