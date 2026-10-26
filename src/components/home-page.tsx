"use client";

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  TreePine,
  X,
  ChevronRight,
  Sparkles,
  Flame,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "./site-header";
import { seedProducts, seedReviews } from "@/data/seed";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919175379886";
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || whatsappNumber;

const waLink = (text: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

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

const storyHighlights = [
  { id: "All Collections", label: "All Items", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80" },
  { id: "Living & Sofas", label: "Sofas & Living", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80" },
  { id: "Dining Sets", label: "Dining Suites", image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=80" },
  { id: "Beds & Hydraulic", label: "Beds & Storage", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80" },
  { id: "Pooja Mandir", label: "Pooja Mandir", image: "/assets/devghar-source.png" },
  { id: "Wardrobes & TV Units", label: "Wardrobes & TV", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80" },
  { id: "Study & Desks", label: "Study Desks", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80" },
  { id: "Full Flat Packages", label: "Full Flat 2BHK", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80" },
];

export function HomePage() {
  const [products, setProducts] = useState(seedProducts);
  const [activeCategory, setActiveCategory] = useState("All Collections");

  // Bottom Sheet Drawer State
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  // Order Form
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "Pune",
    pincode: "",
    quantity: 1,
  });

  // Load products from API with fallback
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Collections") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  // Handle Order Placement
  async function submitOrder() {
    if (!selectedProduct) return;

    if (
      !orderForm.customerName.trim() ||
      !orderForm.phone.trim() ||
      !orderForm.address.trim()
    ) {
      alert("Please enter your name, phone number, and delivery address in Pune.");
      return;
    }

    setOrderLoading(true);
    setOrderSuccessId(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          price: Number(selectedProduct.price),
          quantity: orderForm.quantity,
          customerName: orderForm.customerName,
          phone: orderForm.phone,
          address: orderForm.address,
          city: orderForm.city,
          pincode: orderForm.pincode || "Pune",
        }),
      });

      const data = await res.json();
      const generatedId = data?.orderId || data?.id || `PF-${Date.now().toString().slice(-6)}`;
      setOrderSuccessId(generatedId);

      const totalVal = Number(selectedProduct.price) * orderForm.quantity;
      const orderMessage = `
🛒 *NEW ORDER - PARIHAR FURNITURE & INTERIOR*

📦 *PRODUCT INQUIRY*
Item: ${selectedProduct.name}
Code: ${selectedProduct.code || "PF—PUNE"}
Price: ₹${Number(selectedProduct.price).toLocaleString("en-IN")}
Quantity: ${orderForm.quantity}
Total: ₹${totalVal.toLocaleString("en-IN")}

👤 *CUSTOMER DETAILS*
Name: ${orderForm.customerName}
Phone: ${orderForm.phone}
Address: ${orderForm.address}, ${orderForm.city} - ${orderForm.pincode}

🆔 Order Reference: #${generatedId}

Please confirm delivery timeline and timber finish options.
`.trim();

      setTimeout(() => {
        window.location.href = waLink(orderMessage);
      }, 900);
    } catch (err) {
      console.error(err);
      alert("Could not register order online. Please contact us directly on WhatsApp.");
    } finally {
      setOrderLoading(false);
    }
  }

  function closeDrawer() {
    setSelectedProduct(null);
    setShowOrderModal(false);
    setOrderSuccessId(null);
  }

  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        {/* =================================================================
            01. APPLE LIQUID GLASS HERO (LIGHT & ELEGANT)
            ================================================================= */}
        <section id="hero" className="liquid-hero">
          <div className="hero-media-cover">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
              alt="Parihar Furniture Living Room Showcase"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-gradient-scrim" />

          <div className="hero-inner-content">
            {/* Liquid Glass Circular Hallmark Badge */}
            <div className="liquid-hallmark-badge">
              <div className="hallmark-thumb">
                <Image
                  src="/assets/logo.png"
                  alt="Parihar Logo"
                  width={24}
                  height={24}
                />
              </div>
              <span>PARIHAR FURNITURE · VISHRANTWADI, PUNE</span>
            </div>

            <h1 className="hero-main-heading">
              Solid Wood Furniture, <br />
              <em>Direct from Our Workshop.</em>
            </h1>

            <p className="hero-sub-description">
              Handcrafted seasoned Burma teak & Sheesham sofas, sacred wooden Devghar temples,
              hydraulic storage beds, and complete 2BHK & 3BHK turnkey interior woodwork at
              honest workshop rates with zero middleman commissions.
            </p>

            <div className="hero-cta-grid">
              <a href="#catalog" className="btn-liquid-gold">
                <span>Browse Furniture Catalog</span>
                <ArrowRight size={15} />
              </a>

              <a
                href={waLink("Hello Parihar Furniture! I would like to get a furniture estimate for my home.")}
                target="_blank"
                rel="noreferrer"
                className="btn-liquid-glass"
              >
                <MessageCircle size={16} />
                <span>Get WhatsApp Estimate</span>
              </a>
            </div>

            <div className="hero-proof-row">
              <span>
                <Flame size={13} style={{ color: "var(--gold-dark)" }} /> 100% Solid Hardwood
              </span>
              <span>
                <ShieldCheck size={13} style={{ color: "var(--gold-dark)" }} /> 10-Year Warranty
              </span>
              <span>
                <Star size={13} style={{ color: "var(--gold-dark)" }} fill="var(--gold-dark)" /> 4.8★ Google Verified
              </span>
            </div>
          </div>
        </section>

        {/* =================================================================
            02. INSTAGRAM-STYLE LIQUID GLASS STORY HIGHLIGHTS
            ================================================================= */}
        <section className="liquid-story-bar">
          <div className="story-track">
            {storyHighlights.map((story) => (
              <div
                key={story.id}
                className={`story-card-item ${activeCategory === story.id ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(story.id);
                  const el = document.getElementById("catalog");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="story-circle-ring">
                  <div className="story-circle-inner">
                    <Image
                      src={story.image}
                      alt={story.label}
                      fill
                      sizes="68px"
                    />
                  </div>
                </div>
                <span className="story-label">{story.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            03. APPLE LIQUID GLASS CATALOG (USEFUL CATEGORIES & 16+ ITEMS)
            ================================================================= */}
        <section id="catalog" className="section-showcase">
          <div className="section-head-wrap">
            <span className="section-tag-gold">
              <Sparkles size={13} />
              <span>GENUINE FURNITURE SHOWCASE</span>
            </span>
            <h2 className="section-title">Explore Our Furniture</h2>
            <p className="section-subtitle">
              Every item is manufactured with genuine seasoned timber inside our Vishrantwadi atelier.
              Tap any piece for specifications, dimensions, and direct WhatsApp pricing.
            </p>
          </div>

          {/* Useful Category Filter Bar */}
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

          {/* Liquid Glass Product Cards Grid */}
          <div className="showcase-cards-grid">
            {filteredProducts.map((product: any) => (
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

                    <span style={{ fontSize: "11px", color: "var(--gold-dark)", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
                      Custom Size
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
                    <span>View Details & Order</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================================
            04. SACRED DEVGHAR SPOTLIGHT (GENUINE PHOTO & WARM AMBER HALO)
            ================================================================= */}
        <section id="devghar" className="section-devghar-halo">
          <div className="devghar-glow-card">
            <div className="devghar-halo-frame">
              <Image
                src="/assets/devghar-source.png"
                alt="Parihar Sacred Teak Devghar Mandir"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>

            <div className="devghar-content-side">
              <span className="section-tag-gold">
                <Compass size={13} />
                <span>POOJA MANDIR SPECIALISTS</span>
              </span>

              <h2>
                Sacred Wooden Devghars
                <span>सुंदर आणि पवित्र देवघर · Vastu-Aligned Sanctuaries</span>
              </h2>

              <p style={{ color: "var(--ink-secondary)", fontSize: "15px", lineHeight: "1.65" }}>
                Handcrafted in seasoned solid Burma teak timber. Features a precision laser-cut Om
                and lotus jali backdrop illuminated by concealed warm 2700K ambient lighting, a
                pull-out brass aarti tray, and twin soft-close pooja accessories drawers finished in
                heat- and diya-oil resistant melamine polish.
              </p>

              <div className="devghar-spec-chips">
                <div className="devghar-spec-item">
                  <strong>Concealed 2700K Halo</strong>
                  <small>Diffused warm glow behind laser jali.</small>
                </div>
                <div className="devghar-spec-item">
                  <strong>Diya Oil Resistant</strong>
                  <small>Melamine barrier safe against incense & heat.</small>
                </div>
                <div className="devghar-spec-item">
                  <strong>Pooja Drawer Storage</strong>
                  <small>Concealed twin drawers with brass handles.</small>
                </div>
                <div className="devghar-spec-item">
                  <strong>Custom Flat Sizing</strong>
                  <small>Wall-hung or floor-standing configurations.</small>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                <a
                  href={waLink("Hello Parihar Furniture! Please share photos, sizes and prices for Wooden Devghar Mandirs.")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-liquid-gold"
                  style={{ flex: 1, minWidth: "220px" }}
                >
                  <MessageCircle size={16} />
                  <span>Get Devghar Catalog on WhatsApp</span>
                </a>

                <a
                  href={`tel:+${phoneNumber}`}
                  className="btn-liquid-glass"
                >
                  <Phone size={15} />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            05. REAL GOOGLE REVIEWS (VERIFIED CLIENT STORIES)
            ================================================================= */}
        <section id="reviews" className="section-reviews">
          <div className="section-head-wrap">
            <span className="section-tag-gold">
              <Star size={13} fill="var(--gold-primary)" />
              <span>4.8★ GOOGLE VERIFIED CLIENT EXPERIENCES</span>
            </span>
            <h2 className="section-title">Pune Homeowner Testimonials</h2>
            <p className="section-subtitle">
              Authentic feedback from verified clients who got their sofas, dining suites,
              and full residences executed by Parihar.
            </p>
          </div>

          <div className="reviews-scroll-grid">
            {seedReviews.map((rev) => (
              <article key={rev.id} className="review-item-card">
                <div className="review-stars-gold">★★★★★</div>
                <blockquote className="review-body-text">“{rev.quote}”</blockquote>

                <div className="review-client-footer">
                  <div className="client-avatar">{rev.name[0]}</div>
                  <div>
                    <strong style={{ fontSize: "14px", color: "var(--ink-primary)", display: "block" }}>
                      {rev.name}
                    </strong>
                    <small style={{ fontSize: "11px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>
                      {rev.role} · {rev.meta}
                    </small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================================
            06. WORKSHOP LOCATION & VISIT
            ================================================================= */}
        <section id="location" style={{ padding: "clamp(40px, 8vw, 84px) clamp(14px, 4vw, 36px)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", alignItems: "center" }}>
            <div>
              <span className="section-tag-gold">
                <MapPin size={13} />
                <span>VISIT OUR WORKSHOP</span>
              </span>
              <h2 className="section-title">Feel the Timber Firsthand</h2>
              <p style={{ color: "var(--ink-secondary)", fontSize: "15px", lineHeight: "1.65", margin: "12px 0 20px" }}>
                Visit our Vishrantwadi atelier to inspect machine melamine silk finishes, touch seasoned
                Burma teak wood grains, and test sofa cushion densities in person.
              </p>

              <div style={{ padding: "18px", borderRadius: "18px", background: "var(--canvas-card)", backdropFilter: "blur(20px)", border: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "22px", boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "var(--ink-muted)" }}>Address:</span>
                  <span style={{ color: "var(--ink-primary)", fontWeight: "600" }}>Vishrantwadi Corridor, Pune</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "var(--ink-muted)" }}>Timings:</span>
                  <span style={{ color: "var(--gold-dark)", fontWeight: "600" }}>Open Daily 8:00 AM – 10:00 PM</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "var(--ink-muted)" }}>Phone:</span>
                  <span style={{ color: "var(--ink-primary)", fontWeight: "600" }}>+91 {phoneNumber.slice(-10)}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a href={`tel:+${phoneNumber}`} className="btn-liquid-gold">
                  <Phone size={15} />
                  <span>Call Workshop Now</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Parihar+Furniture+Vishrantwadi+Pune"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-liquid-glass"
                >
                  <MapPin size={15} />
                  <span>Directions on Google Maps</span>
                </a>
              </div>
            </div>

            <div style={{ position: "relative", minHeight: "340px", borderRadius: "24px", overflow: "hidden", border: "1px solid var(--glass-border)", boxShadow: "0 12px 36px rgba(0,0,0,0.06)" }}>
              <Image
                src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1000&q=80"
                alt="Parihar Furniture Workshop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px", padding: "14px 18px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 1)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                <strong style={{ display: "block", color: "var(--ink-primary)", fontSize: "14px" }}>
                  Parihar Furniture & Interior
                </strong>
                <small style={{ color: "var(--gold-dark)", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "600" }}>
                  Open Today till 10:00 PM · Walk-ins Welcome
                </small>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =================================================================
          07. APPLE LIQUID GLASS BOTTOM SHEET (INSPECT & ORDER MODAL)
          ================================================================= */}
      {selectedProduct && (
        <div className="drawer-backdrop" onClick={closeDrawer}>
          <div className="drawer-surface" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-drag-line">
              <div className="drag-pill" />
            </div>

            <div className="drawer-top-bar">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--gold-dark)", letterSpacing: "0.08em", fontWeight: "700" }}>
                {selectedProduct.code || "PF—ATELIER"}
              </span>

              <button
                type="button"
                className="nav-menu-toggle"
                onClick={closeDrawer}
                style={{ width: "32px", height: "32px" }}
                aria-label="Close Drawer"
              >
                <X size={16} />
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
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "25px", color: "var(--ink-primary)", lineHeight: "1.2" }}>
                      {selectedProduct.name}
                    </h2>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "23px", color: "var(--ink-primary)", fontWeight: "700", marginTop: "4px" }}>
                      ₹{Number(selectedProduct.price).toLocaleString("en-IN")}{" "}
                      <span style={{ fontSize: "12px", color: "var(--ink-muted)", fontWeight: "normal" }}>
                        (Workshop Direct)
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "14px", color: "var(--ink-secondary)", lineHeight: "1.65" }}>
                    {selectedProduct.description || selectedProduct.shortDescription}
                  </p>

                  <div className="drawer-specs-grid">
                    <div className="drawer-spec-pill">
                      <small>Core Wood</small>
                      <strong>{selectedProduct.material || "Seasoned Burma Teak / Sheesham"}</strong>
                    </div>

                    <div className="drawer-spec-pill">
                      <small>Surface Polish</small>
                      <strong>{selectedProduct.finish || "5-Coat Melamine Silk Polish"}</strong>
                    </div>

                    <div className="drawer-spec-pill">
                      <small>Dimensions</small>
                      <strong>{selectedProduct.dimensions || "Customizable to Room Layout"}</strong>
                    </div>

                    <div className="drawer-spec-pill">
                      <small>Delivery</small>
                      <strong>{selectedProduct.leadTime || "10–14 Days · Pune Fitting"}</strong>
                    </div>
                  </div>
                </>
              )}

              {/* Order Form */}
              {showOrderModal && !orderSuccessId && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    style={{ color: "var(--gold-dark)", fontSize: "12.5px", fontFamily: "var(--font-mono)", textAlign: "left", fontWeight: "600" }}
                  >
                    ← Back to Product Overview
                  </button>

                  <div style={{ padding: "14px 16px", borderRadius: "14px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <small style={{ color: "var(--gold-dark)", fontFamily: "var(--font-mono)", fontSize: "10.5px", fontWeight: "700" }}>
                      DIRECT WORKSHOP INQUIRY
                    </small>
                    <strong style={{ display: "block", color: "var(--ink-primary)", fontSize: "17px", marginTop: "2px" }}>
                      {selectedProduct.name}
                    </strong>
                    <div style={{ color: "var(--ink-primary)", fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "700", marginTop: "2px" }}>
                      ₹{(Number(selectedProduct.price) * orderForm.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <label style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                    Full Name *
                    <input
                      type="text"
                      placeholder="e.g. Bhavesh Bhati"
                      value={orderForm.customerName}
                      onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", marginTop: "4px" }}
                    />
                  </label>

                  <label style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                    Mobile Number *
                    <input
                      type="tel"
                      placeholder="e.g. 9175379886"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", marginTop: "4px" }}
                    />
                  </label>

                  <label style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--ink-muted)", textTransform: "uppercase" }}>
                    Delivery Address in Pune *
                    <textarea
                      rows={2}
                      placeholder="Apartment name, Street, Area"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: "12px", background: "#ffffff", border: "1px solid rgba(0,0,0,0.12)", marginTop: "4px" }}
                    />
                  </label>

                  <button
                    type="button"
                    className="nav-wa-pill"
                    onClick={submitOrder}
                    disabled={orderLoading}
                    style={{ height: "50px", justifyContent: "center", fontSize: "12.5px", marginTop: "6px" }}
                  >
                    {orderLoading ? "Connecting..." : "Confirm & Send to Workshop WhatsApp"}
                  </button>
                </div>
              )}

              {/* Order Success State */}
              {orderSuccessId && (
                <div style={{ textAlign: "center", padding: "30px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                  <CheckCircle2 size={48} style={{ color: "#25d366" }} />
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", color: "var(--ink-primary)" }}>
                    Inquiry Received!
                  </h3>
                  <p style={{ color: "var(--ink-secondary)", fontSize: "14px" }}>
                    Inquiry #{orderSuccessId} registered. Redirecting to WhatsApp to chat with the master craftsman...
                  </p>
                  <button
                    type="button"
                    className="btn-liquid-gold"
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
                  className="nav-wa-pill"
                  style={{ flex: 1, height: "48px", justifyContent: "center", fontSize: "12px" }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  type="button"
                  className="btn-liquid-gold"
                  onClick={() => setShowOrderModal(true)}
                  style={{ flex: 1, height: "48px", justifyContent: "center" }}
                >
                  <span>Order Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================
          08. APPLE FLOATING LIQUID GLASS DOCK (STICKY MOBILE BOTTOM)
          ================================================================= */}
      <div className="liquid-floating-dock">
        <a href={`tel:+${phoneNumber}`} className="dock-btn">
          <Phone size={17} />
          <span>Call Shop</span>
        </a>

        <a
          href={waLink("Hello Parihar Furniture! I would like to get a furniture quote.")}
          target="_blank"
          rel="noreferrer"
          className="dock-btn highlight-wa"
        >
          <MessageCircle size={17} />
          <span>WhatsApp</span>
        </a>

        <a
          href="https://maps.google.com/?q=Parihar+Furniture+Vishrantwadi+Pune"
          target="_blank"
          rel="noreferrer"
          className="dock-btn"
        >
          <MapPin size={17} />
          <span>Visit Shop</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="site-footer-light">
        <span>© {new Date().getFullYear()} Parihar Furniture & Interior · Vishrantwadi, Pune</span>
        <span style={{ color: "var(--ink-secondary)", fontWeight: "500" }}>
          Designing Spaces, Defining Lifestyles · 100% Solid Burma Teak & Sheesham
        </span>
        <div style={{ display: "flex", justifyContent: "center", gap: "18px", marginTop: "4px" }}>
          <a href="#hero">Top ↑</a>
          <a href="#catalog">Catalog</a>
          <a href="#devghar">Devghar</a>
          <a href="/owner">Owner Login</a>
        </div>
      </footer>
    </div>
  );
}