"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  ChevronLeft,
  X,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { seedProducts } from "@/data/seed";

const phoneNumber = "919175379886";
const formattedPhone = "+91 9175379886";

const waLink = (msg: string) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;

const usefulCategories = [
  "All Collections",
  "Living & Sofas",
  "Dining Sets",
  "Beds & Hydraulic",
  "Wardrobes & TV Units",
  "Pooja Mandir",
  "Study & Desks",
  "Full Flat Packages",
];

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

export function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  const [dockOpen, setDockOpen] = useState(false);

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "Pune",
    pincode: "",
    quantity: 1,
  });

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Collections") return seedProducts;
    return seedProducts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  function closeDrawer() {
    setSelectedProduct(null);
    setShowOrderModal(false);
    setOrderSuccessId(null);
  }

  async function submitOrder() {
    if (!selectedProduct) return;
    if (!orderForm.customerName.trim() || !orderForm.phone.trim() || !orderForm.address.trim()) {
      alert("Please fill your name, phone number, and delivery address.");
      return;
    }

    setOrderLoading(true);
    const generatedId = `PF-${Date.now().toString().slice(-6)}`;
    setOrderSuccessId(generatedId);

    const totalVal = Number(selectedProduct.price) * orderForm.quantity;
    const orderMessage = `
🛒 *NEW ORDER INQUIRY - PARIHAR FURNITURE*

📦 *PIECE*: ${selectedProduct.name}
Ref Code: ${selectedProduct.code || "PF—PUNE"}
Price: ₹${Number(selectedProduct.price).toLocaleString("en-IN")}
Qty: ${orderForm.quantity}
Total: ₹${totalVal.toLocaleString("en-IN")}

👤 *CUSTOMER*: ${orderForm.customerName} (${orderForm.phone})
Address: ${orderForm.address}, ${orderForm.city} - ${orderForm.pincode}
Order Ref: #${generatedId}

Please confirm delivery schedule in Pune.
`.trim();

    setTimeout(() => {
      setOrderLoading(false);
      window.location.href = waLink(orderMessage);
    }, 600);
  }

  return (
    <div className="site-shell">
      <SiteHeader />

      <main style={{ padding: "clamp(24px, 5vw, 48px) clamp(16px, 4vw, 40px)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
          <div style={{ marginBottom: "28px" }}>
            <span className="section-tag-gold">
              <Sparkles size={14} />
              <span>GENUINE TIMBER CATALOG · 16 SIGNATURE PIECES</span>
            </span>

            <h1 style={{ fontSize: "clamp(32px, 6.5vw, 52px)", color: "#ffffff", fontWeight: "700", lineHeight: "1.15" }}>
              Complete Furniture Showcase
            </h1>
            <DoodleUnderline color="#e2bf65" />

            <p style={{ fontSize: "16px", color: "var(--ink-secondary)", maxWidth: "700px", lineHeight: "1.6" }}>
              Every item is manufactured with genuine seasoned timber inside our Vishrantwadi atelier.
              Tap any piece for specifications, custom dimensions, and direct carpenter pricing.
            </p>
          </div>

          {/* Category Filter Pills (Sticky on Top during Scroll) */}
          <div className="sticky-category-wrapper">
            <div className="category-filter-bar">
              {usefulCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="showcase-cards-grid" style={{ marginBottom: "48px" }}>
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="liquid-product-card"
                onClick={() => {
                  setSelectedProduct(product);
                  setShowOrderModal(false);
                  setOrderSuccessId(null);
                }}
              >
                <div className="liquid-card-media">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="card-code-tag">{product.code || "PF—PUNE"}</div>
                  <div className="card-discount-badge">Workshop Direct</div>
                </div>

                <div className="liquid-card-body">
                  <h3 className="liquid-card-title">{product.name}</h3>
                  <p className="liquid-card-desc">{product.shortDescription}</p>

                  <div className="liquid-card-price-row">
                    <div>
                      <span className="liquid-price-label">Workshop Price</span>
                      <div className="liquid-price-amount">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <span className="hand-drawn-note">
                      ✓ Custom Sizing
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn-card-inspect"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setShowOrderModal(false);
                      setOrderSuccessId(null);
                    }}
                  >
                    <span>Inspect Details & Order</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Product Detail Bottom Sheet */}
      {selectedProduct && (
        <div className="drawer-backdrop" onClick={closeDrawer}>
          <div className="drawer-surface" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-drag-line">
              <div className="drag-pill" />
            </div>

            <div className="drawer-top-bar">
              <span className="hand-drawn-badge" style={{ fontSize: "12.5px" }}>
                {selectedProduct.code || "PF—ATELIER"}
              </span>

              <button
                type="button"
                className="nav-menu-toggle"
                onClick={closeDrawer}
                style={{ width: "36px", height: "36px" }}
                aria-label="Close Drawer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-content-scroll">
              {!showOrderModal && (
                <>
                  <div className="drawer-image-box">
                    <Image
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 760px"
                    />
                  </div>

                  <div>
                    <span className="section-tag-gold">{selectedProduct.category}</span>
                    <h2 style={{ fontSize: "29px", color: "#ffffff", lineHeight: "1.2" }}>
                      {selectedProduct.name}
                    </h2>
                    <div style={{ fontSize: "27px", color: "var(--gold-light)", fontWeight: "700", marginTop: "4px" }}>
                      ₹{Number(selectedProduct.price).toLocaleString("en-IN")}{" "}
                      <span style={{ fontSize: "14.5px", color: "var(--ink-secondary)", fontWeight: "normal" }}>
                        (Direct Carpenter Price · 0% Markup)
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "15px", color: "var(--ink-secondary)", lineHeight: "1.65" }}>
                    {selectedProduct.description || selectedProduct.shortDescription}
                  </p>

                  <div className="drawer-specs-grid">
                    <div className="drawer-spec-pill">
                      <small>Core Wood</small>
                      <strong>{selectedProduct.material || "Seasoned Burma Teak / Sheesham"}</strong>
                    </div>

                    <div className="drawer-spec-pill">
                      <small>Surface Finish</small>
                      <strong>{selectedProduct.finish || "5-Coat Melamine Silk Polish"}</strong>
                    </div>

                    <div className="drawer-spec-pill">
                      <small>Dimensions</small>
                      <strong>{selectedProduct.dimensions || "Customizable to Room Layout"}</strong>
                    </div>

                    <div className="drawer-spec-pill">
                      <small>Delivery & Fitment</small>
                      <strong>{selectedProduct.leadTime || "10–14 Days · Pune Fitting"}</strong>
                    </div>
                  </div>
                </>
              )}

              {/* Order Form */}
              {showOrderModal && !orderSuccessId && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    style={{ color: "var(--gold-light)", fontSize: "14.5px", textAlign: "left", fontWeight: "700" }}
                  >
                    ← Back to Product Overview
                  </button>

                  <div style={{ padding: "16px", borderRadius: "18px", background: "rgba(226,191,101,0.08)", border: "1.5px solid var(--gold-border)" }}>
                    <small style={{ color: "var(--gold-light)", fontSize: "13px", fontWeight: "700" }}>
                      DIRECT WORKSHOP INQUIRY
                    </small>
                    <strong style={{ display: "block", color: "#ffffff", fontSize: "21px", marginTop: "2px" }}>
                      {selectedProduct.name}
                    </strong>
                    <div style={{ color: "#ffffff", fontSize: "23px", fontWeight: "700", marginTop: "2px" }}>
                      ₹{(Number(selectedProduct.price) * orderForm.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <label style={{ fontSize: "14px", color: "var(--ink-secondary)" }}>
                    Full Name *
                    <input
                      type="text"
                      placeholder="e.g. Bhavesh Bhati"
                      value={orderForm.customerName}
                      onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "14px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                    />
                  </label>

                  <label style={{ fontSize: "14px", color: "var(--ink-secondary)" }}>
                    Mobile Number *
                    <input
                      type="tel"
                      placeholder="e.g. 9175379886"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "14px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                    />
                  </label>

                  <label style={{ fontSize: "14px", color: "var(--ink-secondary)" }}>
                    Delivery Address in Pune *
                    <textarea
                      rows={2}
                      placeholder="Apartment name, Street, Area"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", borderRadius: "14px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                    />
                  </label>

                  <button
                    type="button"
                    className="dock-btn highlight-wa"
                    onClick={submitOrder}
                    disabled={orderLoading}
                    style={{ height: "50px", justifyContent: "center", fontSize: "16px", marginTop: "6px", flexDirection: "row", gap: "8px" }}
                  >
                    <MessageCircle size={18} />
                    <span>{orderLoading ? "Connecting..." : "Confirm & Send to Workshop WhatsApp"}</span>
                  </button>
                </div>
              )}

              {/* Order Success State */}
              {orderSuccessId && (
                <div style={{ textAlign: "center", padding: "30px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={48} style={{ color: "#25d366" }} />
                  <h3 style={{ fontSize: "28px", color: "#ffffff" }}>
                    Inquiry Received!
                  </h3>
                  <p style={{ color: "var(--ink-secondary)", fontSize: "15px" }}>
                    Inquiry #{orderSuccessId} registered. Redirecting to WhatsApp to chat with the master carpenter...
                  </p>
                  <button
                    type="button"
                    className="btn-gold-primary"
                    onClick={closeDrawer}
                  >
                    Return to Catalog
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {!showOrderModal && !orderSuccessId && (
              <div className="drawer-footer-sticky">
                <a
                  href={waLink(
                    `Hello Parihar Furniture! I am interested in ${selectedProduct.name} (Price: ₹${Number(selectedProduct.price).toLocaleString("en-IN")}). Please send custom sizing details and wood polish samples.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="dock-btn highlight-wa"
                  style={{ flex: 1, height: "48px", justifyContent: "center", fontSize: "15px", flexDirection: "row", gap: "8px" }}
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  type="button"
                  className="btn-gold-primary"
                  onClick={() => setShowOrderModal(true)}
                  style={{ flex: 1, height: "48px", justifyContent: "center" }}
                >
                  <span>Order Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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
