"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  X,
  Navigation,
  TreePine,
  CheckCircle2,
  Calendar,
  Layers,
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

const workshopPerks = [
  {
    icon: <TreePine size={22} color="var(--gold-light)" />,
    title: "Inspect Seasoned Raw Timber",
    desc: "Inspect 100% genuine kiln-seasoned Burma teak and Sheesham logs in the raw state before finishing and polishing.",
  },
  {
    icon: <Layers size={22} color="var(--gold-light)" />,
    title: "500+ Luxury Fabric Swatches",
    desc: "Touch stain-resistant Turkish velvets, heavy chenille, genuine nappa leatherettes, and high-GSM linen weaves.",
  },
  {
    icon: <Compass size={22} color="var(--gold-light)" />,
    title: "Custom 3D Spatial Layout",
    desc: "Bring your floor plan or apartment keys. We design custom dimensions to fit your exact room proportions down to the millimeter.",
  },
  {
    icon: <ShieldCheck size={22} color="var(--gold-light)" />,
    title: "Direct Master Carpenter Pricing",
    desc: "Zero showroom markup, zero retail middleman commissions. Pay honest workshop rates with transparent invoices.",
  },
];

export function LocationClient() {
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
          <div style={{ marginBottom: "36px" }}>
            <span className="section-tag-gold">
              <MapPin size={15} />
              <span>VISHRANTWADI WORKSHOP & DESIGN ATELIER · PUNE</span>
            </span>

            <h1
              style={{
                fontSize: "clamp(32px, 6.5vw, 52px)",
                color: "#ffffff",
                fontWeight: "700",
                lineHeight: "1.15",
                marginTop: "8px",
              }}
            >
              Visit Our Pune Workshop
            </h1>
            <DoodleUnderline color="#e2bf65" />
            <p
              style={{
                fontSize: "clamp(16px, 3vw, 19px)",
                color: "var(--ink-secondary)",
                marginTop: "16px",
                maxWidth: "760px",
                lineHeight: "1.65",
              }}
            >
              Experience authentic woodworking craftsmanship firsthand. Touch hand-planed teak grains,
              test 40-density sofa cushions, and consult directly with our master artisans.
            </p>
          </div>

          {/* Main Grid: Location Card & Workshop Photo */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
              marginBottom: "48px",
              alignItems: "stretch",
            }}
          >
            {/* Atelier Info Glass Card */}
            <div
              style={{
                background: "var(--canvas-card)",
                borderRadius: "28px",
                padding: "clamp(24px, 5vw, 36px)",
                border: "1.8px solid var(--gold-border)",
                boxShadow: "var(--glass-specular)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "24px",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Direct Manufacturing Facility
                </span>
                <h2
                  style={{
                    fontSize: "clamp(22px, 4vw, 28px)",
                    color: "#ffffff",
                    fontWeight: "700",
                    marginBottom: "16px",
                  }}
                >
                  Parihar Furniture & Interior
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <MapPin size={20} color="var(--gold-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "15.5px", display: "block" }}>
                        Atelier Address
                      </strong>
                      <span style={{ color: "var(--ink-secondary)", fontSize: "14.5px", lineHeight: "1.5" }}>
                        Vishrantwadi Main Corridor, Tingre Nagar Road, Pune, Maharashtra 411015
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <Clock size={20} color="var(--gold-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "15.5px", display: "block" }}>
                        Workshop Timings
                      </strong>
                      <span style={{ color: "var(--gold-light)", fontSize: "14.5px", fontWeight: "600" }}>
                        Open Daily: 8:00 AM – 10:00 PM (Monday to Sunday)
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <Phone size={20} color="var(--gold-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "15.5px", display: "block" }}>
                        Owner Mobile (Call Direct)
                      </strong>
                      <a
                        href={`tel:+${phoneNumber}`}
                        style={{
                          color: "var(--gold-light)",
                          fontSize: "16px",
                          fontWeight: "700",
                          textDecoration: "underline",
                        }}
                      >
                        {formattedPhone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <CheckCircle2 size={20} color="#68d391" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "15.5px", display: "block" }}>
                        Service Coverage
                      </strong>
                      <span style={{ color: "var(--ink-secondary)", fontSize: "14px" }}>
                        Free Home Measurement across Pune, PCMC, Baner, Wakad, Kharadi, Viman Nagar, Kalyani Nagar & Kothrud.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href={`tel:+${phoneNumber}`}
                  className="btn-gold-primary"
                  style={{
                    height: "50px",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  <Phone size={18} />
                  <span>Call Owner: {formattedPhone}</span>
                </a>

                <a
                  href={waLink("Hello Parihar Furniture! Please share your live GPS location on WhatsApp so I can visit today.")}
                  target="_blank"
                  rel="noreferrer"
                  className="dock-btn highlight-wa"
                  style={{
                    height: "50px",
                    justifyContent: "center",
                    fontSize: "15.5px",
                    borderRadius: "16px",
                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <MessageCircle size={20} />
                  <span>Get Live GPS Location on WhatsApp</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Vishrantwadi+Pune+Parihar+Furniture"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(226, 191, 101, 0.3)",
                    color: "#ffffff",
                    fontSize: "14.5px",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Navigation size={16} color="var(--gold-light)" />
                  <span>Open in Google Maps Navigation</span>
                </a>
              </div>
            </div>

            {/* Visual Workshop Atmosphere Card */}
            <div
              style={{
                position: "relative",
                borderRadius: "28px",
                overflow: "hidden",
                border: "1.8px solid var(--gold-border)",
                minHeight: "420px",
                background: "var(--canvas-card)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "clamp(20px, 4vw, 32px)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=80"
                alt="Parihar Master Woodworking Workshop Pune"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(14, 18, 23, 0.2) 0%, rgba(14, 18, 23, 0.88) 75%, rgba(14, 18, 23, 0.98) 100%)",
                }}
              />

              <div style={{ position: "relative", zIndex: 2 }}>
                <span className="section-tag-gold" style={{ marginBottom: "8px" }}>
                  <Sparkles size={13} fill="var(--gold-light)" />
                  <span>DIRECT CARPENTER SANCTUM</span>
                </span>
                <h3 style={{ fontSize: "24px", color: "#ffffff", fontWeight: "700", marginBottom: "8px" }}>
                  Touch Every Grain Before You Buy
                </h3>
                <p style={{ color: "var(--ink-secondary)", fontSize: "14.5px", lineHeight: "1.55" }}>
                  Watch real carpenters hand-carve solid teak, inspect invisible mortise-and-tenon joints,
                  and select your exact stain finish under natural Pune sunlight.
                </p>
              </div>
            </div>
          </div>

          {/* Workshop Perks Grid */}
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(24px, 4.5vw, 32px)", color: "#ffffff", fontWeight: "700", marginBottom: "8px" }}>
              Why Visit the Workshop in Person?
            </h2>
            <DoodleUnderline color="#e2bf65" />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
                marginTop: "28px",
              }}
            >
              {workshopPerks.map((perk, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--canvas-card)",
                    borderRadius: "20px",
                    padding: "24px",
                    border: "1.5px solid var(--gold-border)",
                    boxShadow: "var(--glass-specular)",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "rgba(226, 191, 101, 0.12)",
                      border: "1px solid var(--gold-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    {perk.icon}
                  </div>
                  <h3 style={{ fontSize: "18px", color: "#ffffff", fontWeight: "700", marginBottom: "8px" }}>
                    {perk.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--ink-secondary)", lineHeight: "1.55" }}>
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Navigation Callouts */}
          <div
            style={{
              padding: "clamp(24px, 5vw, 36px)",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(226, 191, 101, 0.12), rgba(18, 22, 28, 0.95))",
              border: "1.8px solid var(--gold-border)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <span className="section-tag-gold" style={{ marginBottom: "6px" }}>
                <span>BOOK FREE HOME CONSULTATION</span>
              </span>
              <h3 style={{ fontSize: "22px", color: "#ffffff", fontWeight: "700" }}>
                Cannot Visit Today? We Come to You!
              </h3>
              <p style={{ color: "var(--ink-secondary)", fontSize: "14.5px", marginTop: "4px" }}>
                Our master supervisor visits your residence anywhere in Pune with sample wood blocks, catalogs & laser measuring meters.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href={waLink("Hello Parihar Furniture! I would like to schedule a free home measurement visit in Pune.")}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-primary"
                style={{ height: "46px", padding: "0 22px" }}
              >
                <Calendar size={17} />
                <span>Schedule Free Visit</span>
              </a>
              <Link
                href="/reviews"
                style={{
                  height: "46px",
                  padding: "0 20px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1.2px solid var(--gold-border)",
                  color: "#ffffff",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "600",
                  fontSize: "14.5px",
                }}
              >
                <span>Read 4.8★ Client Reviews</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Dock (Mobile Tap-to-Appear) */}
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
            <Sparkles size={16} color="var(--gold-light)" />
            <span>Reviews</span>
          </Link>

          <a
            href={waLink("Hello Parihar Furniture! Please send me the workshop location pin.")}
            target="_blank"
            rel="noreferrer"
            className="dock-btn highlight-wa"
            onClick={() => setDockOpen(false)}
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/catalog"
            className="dock-btn"
            onClick={() => setDockOpen(false)}
          >
            <Layers size={16} />
            <span>Catalog</span>
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
