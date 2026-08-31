"use client";

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  TreePine,
  WandSparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "./site-header";

const whatsapp = "919175379886";

const waLink = (text: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;

const categories = [
  "All Collections",
  "Living Room & Sofas",
  "Beds & Wardrobes",
  "Devghar (Mandir)",
  "Dining Sets",
  "Office & Study",
  "5-Star Full House",
];

const localProducts = [
  {
    id: "cabinet-cnc-jali",
    name: "Contemporary CNC Laser-Jali Backlit Cabinet",
    category: "Beds & Wardrobes",
    price: 10500,
    imageUrl: "/assets/product-cabinet.jpg",
    shortDescription:
      "Machine-polished storage with a refined CNC-jali look.",
  },
  {
    id: "solid-wood-dining",
    name: "Solid Wood 6-Seater Dining Set",
    category: "Dining Sets",
    price: 42000,
    imageUrl: "/assets/interior-dining.jpg",
    shortDescription:
      "Warm solid-wood dining built for everyday family use.",
  },
  {
    id: "custom-sectional",
    name: "Custom 6-Seater L-Shape Sectional",
    category: "Living Room & Sofas",
    price: 58000,
    imageUrl: "/assets/interior-sofa.jpg",
    shortDescription:
      "Tailored sectional seating with a soft luxury finish.",
  },
];

const reviews = [
  [
    "JH Bhati",
    "1 month ago · 4 reviews",
    "Absolutely loved this furniture in the shop. Quality was Top Notch! The quality of the furniture is excellent, and there are so many beautiful designs to choose from.",
  ],
  [
    "Bhavesh",
    "2 months ago · 2 photos",
    "Got my whole house furnished they converted it from simple to aesthetic 5 star. My soul satisfied from their service and interior ideas.",
  ],
  [
    "Balaji S",
    "Local Guide · 14 reviews",
    "Excellent service, variety of furniture, sober staff. The go to shop for any kind of household furniture & basic office furniture.",
  ],
  [
    "Yuvraj Parmar",
    "Local Guide · 25 reviews",
    "Go to shop for furniture for home. Reasonable price and prompt service.",
  ],
  [
    "Prakash Parihar",
    "Local Guide · 10 reviews",
    "This is best furniture shop in this area so buy it… and the shop keeper behaviour is also good and nice guy so go through.",
  ],
  [
    "Deepak Pandey",
    "3 reviews · 2 photos",
    "Very good service in this shop and the employee have very good talking skills.",
  ],
];

export function HomePage() {
  const [products, setProducts] = useState(localProducts);
  const [active, setActive] = useState("All Collections");

  const [estimate, setEstimate] = useState({
    low: 135125,
    high: 274940,
  });

  const [estimateForm, setEstimateForm] = useState({
    packageType: "2 BHK Complete Package",
    finish: "Machine Melamine Gloss / Matte Polish",
    devghar: true,
    sectional: true,
  });

  const [modal, setModal] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<any | null>(null);

  const [showOrderForm, setShowOrderForm] = useState(false);

  const [orderLoading, setOrderLoading] = useState(false);

  const [orderSuccess, setOrderSuccess] =
    useState<string | null>(null);

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    quantity: 1,
  });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () =>
      active === "All Collections"
        ? products
        : products.filter(
            (p) => p.category === active
          ),
    [active, products]
  );

  async function calculate() {
    const response = await fetch("/api/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estimateForm),
    });

    const data = await response.json();

    if (response.ok) {
      setEstimate(data);
    }
  }

  async function placeOrder() {
    if (!selectedProduct) return;

    if (
      !orderForm.customerName.trim() ||
      !orderForm.phone.trim() ||
      !orderForm.address.trim() ||
      !orderForm.city.trim() ||
      !orderForm.pincode.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setOrderLoading(true);
    setOrderSuccess(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          price: Number(selectedProduct.price),
          quantity: orderForm.quantity,
          customerName: orderForm.customerName,
          phone: orderForm.phone,
          address: orderForm.address,
          city: orderForm.city,
          pincode: orderForm.pincode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to place order."
        );
      }

      const orderId =
        data?.orderId ||
        data?.id ||
        `PF-${Date.now()}`;

      const total =
        Number(selectedProduct.price) *
        Number(orderForm.quantity);

      const whatsappMessage = `
🛒 *NEW ORDER - PARIHAR FURNITURE*

📦 *PRODUCT DETAILS*
Product: ${selectedProduct.name}
Category: ${selectedProduct.category}
Quantity: ${orderForm.quantity}
Price: ₹${Number(
        selectedProduct.price
      ).toLocaleString("en-IN")}
Total: ₹${total.toLocaleString("en-IN")}

👤 *CUSTOMER DETAILS*
Name: ${orderForm.customerName}
Phone: ${orderForm.phone}

📍 *DELIVERY DETAILS*
Address: ${orderForm.address}
City: ${orderForm.city}
Pincode: ${orderForm.pincode}

🆔 *ORDER ID*
${orderId}

Please confirm this order with the customer.
`.trim();

      const OWNER_WHATSAPP_NUMBER = "919175379886";

      const whatsappUrl =
        `https://wa.me/${OWNER_WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(whatsappMessage)}`;

      setOrderSuccess(orderId);

      window.location.href = whatsappUrl;
    } catch (error) {
      console.error("Order error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setOrderLoading(false);
    }
  }

  function closeProductModal() {
    setSelectedProduct(null);
    setShowOrderForm(false);
    setOrderSuccess(null);

    setOrderForm({
      customerName: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      quantity: 1,
    });
  }

  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        {/* HERO */}

        <section
          id="home"
          className="hero section-dark"
        >
          <div className="hero-overlay" />

          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                ◆ DESIGNING SPACES, DEFINING
                LIFESTYLES <i /> Vishrantwadi, Pune
              </span>

              <h1>
                Transform Your Flat Into{" "}
                <em>
                  a 5-Star Aesthetic Home
                </em>
              </h1>

              <p>
                Solid wood king & queen beds,
                customized velvet & leatherette
                sofas, intricately carved pooja
                devghars, and full 1BHK, 2BHK, 3BHK
                turnkey interior woodwork.
              </p>

              <div className="cta-row">
                <a
                  className="btn btn-gold btn-large"
                  href="#collections"
                >
                  EXPLORE COLLECTIONS
                  <ArrowRight size={18} />
                </a>

                <a
                  className="btn btn-outline btn-large"
                  href={waLink(
                    "Hello Parihar Furniture! I want a furniture estimate."
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  Get WhatsApp Estimate
                </a>
              </div>

              <div className="hero-proof">
                <span>
                  ✓ Custom Sofas & Interiors
                </span>
                <span>
                  ✦ Machine Polish
                </span>
                <span>
                  ॐ Wooden Devghar
                </span>
                <span>
                  ★ 4.0 Google Rated
                </span>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-frame">
                <Image
                  src="/assets/logo.png"
                  alt="Parihar Furniture logo"
                  width={650}
                  height={662}
                />
              </div>

              <h3>PARIHAR</h3>
              <p>FURNITURE & INTERIOR</p>

              <small>
                "Designing Spaces, Defining Lifestyles"
              </small>

              <div className="card-meta">
                <span>
                  ● Vishrantwadi Store
                </span>

                <span>
                  8:00 AM – 10:00 PM
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="standard-section cream"
        >
          <div className="section-heading">
            <span className="eyebrow light">
              THE PARIHAR SIGNATURE STANDARD
            </span>

            <h2>
              Crafted for Discerning Pune Homes
            </h2>

            <p>
              Every piece is designed to bring
              harmony, luxury, and long-lasting
              durability to your living spaces.
            </p>
          </div>

          <div className="feature-grid">
            {[
              [
                TreePine,
                "100% Solid Sheesham & Teak Wood",
                "Seasoned hardwoods treated for termite and borer resistance. Built to withstand generations with solid structural integrity.",
                "Durability Guaranteed",
              ],
              [
                WandSparkles,
                "Machine Melamine Gloss & Satin Polish",
                "State-of-the-art machine polishing for ultra-smooth texture, water repellency, stain protection, and enduring luster.",
                "Silky Scratch-Resistant Finish",
              ],
              [
                Ruler,
                "Tailored Dimensions & Aesthetic Harmony",
                "Custom-built to the exact millimeter of your room layouts. Fluted wood wall panels, LED backdrops, and cohesive finishes.",
                "5-Star Flat Makeovers",
              ],
            ].map(
              ([Icon, title, text, foot]) => (
                <article
                  className="feature-card"
                  key={title as string}
                >
                  <div className="feature-icon">
                    <Icon size={24} />
                  </div>

                  <h3>{title as string}</h3>

                  <p>{text as string}</p>

                  <footer>
                    <ShieldCheck size={15} />
                    {foot as string}
                  </footer>
                </article>
              )
            )}
          </div>
        </section>

        {/* COLLECTIONS */}

        <section
          id="collections"
          className="standard-section collections"
        >
          <div className="section-heading">
            <span className="eyebrow light">
              CURATED SHOWPIECES
            </span>

            <h2>
              Explore Luxury Collections
            </h2>

            <p>
              Select a category below to explore
              handcrafted living, bedroom, mandir,
              dining, and complete house packages.
            </p>
          </div>

          <div className="chips">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  active === category
                    ? "chip active"
                    : "chip"
                }
                onClick={() =>
                  setActive(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((product) => (
              <article
                className="product-card"
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setShowOrderForm(false);
                  setOrderSuccess(null);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="product-image">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />

                  <span>{product.category}</span>

                  <b>
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString("en-IN")}
                  </b>
                </div>

                <div className="product-body">
                  <h3>{product.name}</h3>

                  <p>
                    {product.shortDescription}
                  </p>

                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={(e) => {
                      e.stopPropagation();

                      setSelectedProduct(product);
                      setShowOrderForm(false);
                      setOrderSuccess(null);
                    }}
                  >
                    View Full Details
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty">
              No products in this category yet.
            </div>
          )}
        </section>

        {/* INTERIORS */}

        <section
          id="interiors"
          className="dark-panel"
        >
          <div className="interior-copy">
            <span className="eyebrow">
              ♛ COMPLETE FLAT TRANSFORMATION
            </span>

            <h2>
              Convert Your Apartment from Simple
              to{" "}
              <em>
                5-Star Aesthetic
              </em>
            </h2>

            <blockquote>
              “Got my whole house furnished, they
              converted it from simple to aesthetic
              5 star. My soul satisfied from their
              service and interior ideas.”

              <strong>
                — BHAVESH (GOOGLE VERIFIED 5-STAR
                REVIEW)
              </strong>
            </blockquote>

            <p>
              Why coordinate with 5 different
              carpenters and vendors? Parihar
              Furniture & Interior provides
              end-to-end coordinated woodwork—from
              modern fluted wall panelling, ambient
              backlit entertainment units, and
              hydraulic king beds to sliding mirror
              wardrobes and modular kitchens.
            </p>

            <ul>
              <li>
                1 BHK, 2 BHK, 3 BHK Packages
              </li>
              <li>
                Machine Melamine High Gloss
              </li>
              <li>
                Fluted Panelling & LED Glow
              </li>
              <li>
                Free Consultation & 3D Ideas
              </li>
            </ul>

            <a
              className="btn btn-gold btn-large"
              href={waLink(
                "Hello Parihar Furniture! I want a full house interior consultation."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              Consult for Full House Package
            </a>
          </div>

          <div className="interior-gallery">
            <div>
              <Image
                src="/assets/interior-house.jpg"
                alt="Living room backdrop"
                fill
              />

              <span>
                Living Room Backdrops
              </span>
            </div>

            <div>
              <Image
                src="/assets/interior-dining.jpg"
                alt="Solid wood dining"
                fill
              />

              <span>
                Solid Wood Dining
              </span>
            </div>

            <div>
              <Image
                src="/assets/interior-bedroom.jpg"
                alt="Master bedroom"
                fill
              />

              <span>
                Master Bedrooms
              </span>
            </div>

            <div>
              <Image
                src="/assets/interior-sofa.jpg"
                alt="Custom sectional"
                fill
              />

              <span>
                Custom Sectionals
              </span>
            </div>
          </div>
        </section>

        {/* DEVGHAR */}

        <section
          id="devghar"
          className="devghar standard-section cream"
        >
          <div className="devghar-image">
            <Image
              src="/assets/devghar-source.png"
              alt="Parihar Devghar interior"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />

            <div>
              <b>
                Pooja Mandir Specialists
              </b>

              <h3>
                सुंदर आणि पवित्र देवघर
              </h3>

              <p>
                Carved in authentic wood with
                high-durability machine polish and
                pooja accessories drawer.
              </p>
            </div>
          </div>

          <div className="devghar-copy">
            <span className="eyebrow light">
              SPIRITUAL CRAFTSMANSHIP
            </span>

            <h2>
              Custom Wooden Devghar & Home Mandirs
            </h2>

            <p>
              Bring positive energy, divine beauty,
              and peace into your home with our
              bespoke wooden Devghars. Whether you
              need a compact wall-hung temple for an
              apartment or an elaborate
              floor-standing teak wood shrine, we
              customize every dimension and carving.
            </p>

            <div className="mini-grid">
              <article>
                <Sparkles />

                <h3>
                  Laser Jali & Om Carvings
                </h3>

                <p>
                  Intricate Om, Swastik, Kalash &
                  floral designs with warm LED
                  backlighting.
                </p>
              </article>

              <article>
                <WandSparkles />

                <h3>
                  Machine Melamine Polish
                </h3>

                <p>
                  Smooth machine-grade polish
                  offering superior heat, incense &
                  oil resistance.
                </p>
              </article>
            </div>

            <a
              className="btn btn-gold btn-large"
              href={waLink(
                "Hello Parihar Furniture! I want to see the Devghar catalog."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} />
              View Devghar Catalogs
            </a>
          </div>
        </section>

        {/* ESTIMATOR */}

        <section
          id="estimator"
          className="estimator-section"
        >
          <div className="section-heading">
            <span className="eyebrow light">
              INSTANT TOOL
            </span>

            <h2>
              Furniture Cost Estimator
            </h2>

            <p>
              Get a quick instant price estimate
              for your apartment or custom furniture
              requirement.
            </p>
          </div>

          <div className="estimator-card">
            <div className="form-grid">
              <label>
                Select Package / Room Type

                <select
                  value={
                    estimateForm.packageType
                  }
                  onChange={(e) =>
                    setEstimateForm({
                      ...estimateForm,
                      packageType:
                        e.target.value,
                    })
                  }
                >
                  <option>
                    1 BHK Complete Package
                  </option>

                  <option>
                    2 BHK Complete Package
                  </option>

                  <option>
                    3 BHK Complete Package
                  </option>
                </select>
              </label>

              <label>
                Material & Polish Preference

                <select
                  value={estimateForm.finish}
                  onChange={(e) =>
                    setEstimateForm({
                      ...estimateForm,
                      finish: e.target.value,
                    })
                  }
                >
                  <option>
                    Machine Melamine Gloss /
                    Matte Polish
                  </option>

                  <option>
                    Solid Wood Natural Finish
                  </option>

                  <option>
                    Premium Velvet + Wood Mix
                  </option>
                </select>
              </label>
            </div>

            <div className="addons">
              <label>
                <input
                  type="checkbox"
                  checked={
                    estimateForm.devghar
                  }
                  onChange={(e) =>
                    setEstimateForm({
                      ...estimateForm,
                      devghar:
                        e.target.checked,
                    })
                  }
                />

                Include Custom Wooden Devghar
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={
                    estimateForm.sectional
                  }
                  onChange={(e) =>
                    setEstimateForm({
                      ...estimateForm,
                      sectional:
                        e.target.checked,
                    })
                  }
                />

                Include 6-Seater L-Shape
                Sectional Sofa
              </label>
            </div>

            <div className="estimate-result">
              <div>
                <span>
                  ESTIMATED BUDGET RANGE
                </span>

                <strong>
                  ₹
                  {estimate.low.toLocaleString(
                    "en-IN"
                  )}{" "}
                  – ₹
                  {estimate.high.toLocaleString(
                    "en-IN"
                  )}
                  *
                </strong>

                <small>
                  Selected Finish:{" "}
                  {estimateForm.finish}
                  <br />
                  Package includes typical
                  furniture, storage and seating
                  allowances.
                </small>
              </div>

              <div>
                <button
                  className="btn btn-green btn-large"
                  onClick={calculate}
                >
                  Calculate Estimate
                </button>

                <a
                  className="btn btn-outline btn-large"
                  href={waLink(
                    `Hello Parihar Furniture! My estimated budget is ₹${estimate.low.toLocaleString(
                      "en-IN"
                    )} – ₹${estimate.high.toLocaleString(
                      "en-IN"
                    )}. I want a final quote.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lock Estimate on WhatsApp
                </a>
              </div>
            </div>

            <p className="fine-print">
              *Estimated pricing is indicative of
              typical materials and dimensions. Final
              price is confirmed after actual room
              measurements.
            </p>
          </div>
        </section>

        {/* REVIEWS */}

        <section
          id="reviews"
          className="reviews standard-section"
        >
          <div className="review-heading">
            <div>
              <span className="eyebrow light">
                REAL CUSTOMER WORDS
              </span>

              <h2>
                Google Reviews & Experiences
              </h2>
            </div>

            <div className="score">
              <span>★★★★☆</span>
              <b>4.0 ★</b>
              <small>
                (12+ Verified Reviews)
              </small>
            </div>
          </div>

          <div className="review-grid">
            {reviews.map(
              ([name, meta, quote]) => (
                <article key={name}>
                  <div className="review-top">
                    <div className="avatar">
                      {name[0]}
                    </div>

                    <div>
                      <b>{name}</b>
                      <small>{meta}</small>
                    </div>

                    <span>★★★★★</span>
                  </div>

                  <p>
                    “{quote}”
                  </p>

                  <footer>
                    ↪ Owner reply:{" "}
                    <i>
                      “Thank you”
                    </i>
                  </footer>
                </article>
              )
            )}
          </div>
        </section>

        {/* CONTACT */}

        <section
          id="contact"
          className="contact"
        >
          <div>
            <span className="eyebrow">
              VISIT PARIHAR
            </span>

            <h2>
              Come see the furniture in person.
            </h2>

            <p>
              Vishrantwadi, Pune · Open daily
              8:00 AM – 10:00 PM
            </p>
          </div>

          <div className="contact-actions">
            <a
              className="btn btn-gold btn-large"
              href="tel:+919175379886"
            >
              <Phone />
              Call Now
            </a>

            <a
              className="btn btn-green btn-large"
              href={waLink(
                "Hello Parihar Furniture! I want to visit your store."
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle />
              WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* PRODUCT DETAILS + ORDER MODAL */}

      {selectedProduct && (
        <div
          className="modal"
          onClick={closeProductModal}
          style={{
            padding: "16px",
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(1100px, 96vw)",
              maxWidth: "1100px",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: 0,
              borderRadius: "28px",
              background: "#fff",
              color: "#171717",
              boxShadow:
                "0 30px 100px rgba(0,0,0,.35)",
            }}
          >
            {/* CLOSE */}

            <button
              type="button"
              onClick={closeProductModal}
              aria-label="Close"
              style={{
                position: "absolute",
                right: "18px",
                top: "18px",
                zIndex: 20,
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid #ddd",
                background: "#fff",
                color: "#111",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              <X size={22} />
            </button>

            {/* PRODUCT DETAILS */}

            {!showOrderForm && !orderSuccess && (
              <div
                 className="product-details-layout"
                 style={{
                   display: "grid",
                   gridTemplateColumns:
                      "minmax(320px, 1fr) minmax(320px, 1fr)",
                }}
            
              >
                {/* IMAGE */}

                <div
                  style={{
                    position: "relative",
                    minHeight: "620px",
                    background: "#111",
                    overflow: "hidden",
                    borderRadius:
                      "28px 0 0 28px",
                  }}
                >
                  <Image
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: "20px",
                      bottom: "20px",
                      padding: "9px 14px",
                      borderRadius: "999px",
                      background:
                        "rgba(0,0,0,.75)",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {selectedProduct.category}
                  </div>
                </div>

                {/* DETAILS */}

                <div
                  style={{
                    padding: "48px 42px 38px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {/* CATEGORY */}

                  <div
                    style={{
                      width: "fit-content",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      border:
                        "1px solid #ead8a3",
                      background: "#fffaf0",
                      color: "#795b18",
                      fontSize: "12px",
                      fontWeight: 800,
                    }}
                  >
                    {selectedProduct.category}
                  </div>

                  {/* NAME */}

                  <h2
                    style={{
                      margin: 0,
                      fontSize:
                        "clamp(30px, 4vw, 46px)",
                      lineHeight: 1.08,
                      color: "#171717",
                    }}
                  >
                    {selectedProduct.name}
                  </h2>

                  {/* SHORT DESCRIPTION */}

                  <p
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      lineHeight: 1.55,
                      color: "#555",
                    }}
                  >
                    {selectedProduct.shortDescription}
                  </p>

                  {/* DESCRIPTION BOX */}

                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "18px",
                      border:
                        "1px solid #e5dfd2",
                      background: "#faf8f3",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "11px",
                        textTransform:
                          "uppercase",
                        letterSpacing: "1px",
                        color: "#8a6a20",
                      }}
                    >
                      Description
                    </strong>

                    <p
                      style={{
                        margin: 0,
                        color: "#333",
                        lineHeight: 1.65,
                      }}
                    >
                      {selectedProduct.description ||
                        selectedProduct.shortDescription}
                    </p>
                  </div>

                  {/* DETAILS BOXES */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        padding: "15px",
                        border:
                          "1px solid #e8e8e8",
                        borderRadius: "14px",
                        background: "#fff",
                      }}
                    >
                      <small>Category</small>

                      <strong
                        style={{
                          display: "block",
                          marginTop: "5px",
                        }}
                      >
                        {selectedProduct.category}
                      </strong>
                    </div>

                    <div
                      style={{
                        padding: "15px",
                        border:
                          "1px solid #e8e8e8",
                        borderRadius: "14px",
                        background: "#fff",
                      }}
                    >
                      <small>Material</small>

                      <strong
                        style={{
                          display: "block",
                          marginTop: "5px",
                        }}
                      >
                        {selectedProduct.material ||
                          "Available on request"}
                      </strong>
                    </div>

                    <div
                      style={{
                        padding: "15px",
                        border:
                          "1px solid #e8e8e8",
                        borderRadius: "14px",
                        background: "#fff",
                      }}
                    >
                      <small>Finish</small>

                      <strong
                        style={{
                          display: "block",
                          marginTop: "5px",
                        }}
                      >
                        {selectedProduct.finish ||
                          "Available on request"}
                      </strong>
                    </div>

                    <div
                      style={{
                        padding: "15px",
                        border:
                          "1px solid #e8e8e8",
                        borderRadius: "14px",
                        background: "#fff",
                      }}
                    >
                      <small>Style</small>

                      <strong
                        style={{
                          display: "block",
                          marginTop: "5px",
                        }}
                      >
                        {selectedProduct.style ||
                          "Available on request"}
                      </strong>
                    </div>
                  </div>

                  {/* PRICE BOX */}

                  <div
                    style={{
                      padding: "18px 20px",
                      borderRadius: "16px",
                      background: "#fff8e5",
                      border:
                        "1px solid #d8b85a",
                    }}
                  >
                    <small
                      style={{
                        display: "block",
                        color: "#8a6a20",
                        fontWeight: 800,
                        fontSize: "11px",
                      }}
                    >
                      PRICE
                    </small>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "5px",
                        fontSize: "32px",
                        color: "#171717",
                      }}
                    >
                      ₹
                      {Number(
                        selectedProduct.price
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  {/* BUTTONS */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    {/* ORDER */}

                    <button
                      type="button"
                      className="btn btn-gold"
                      onClick={() =>
                        setShowOrderForm(true)
                      }
                      style={{
                        minHeight: "55px",
                        borderRadius: "14px",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      🛒 Order Now
                    </button>

                    {/* CALL */}

                    <a
                      href="tel:+919175379886"
                      style={{
                        minHeight: "55px",
                        borderRadius: "14px",
                        border:
                          "1px solid #c99b28",
                        background: "#fff",
                        color: "#171717",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        fontWeight: 800,
                        textDecoration: "none",
                      }}
                    >
                      <Phone size={18} />
                      Call Owner
                    </a>

                    {/* WHATSAPP */}

                    <a
                      href={waLink(
                        `Hello Parihar Furniture! I am interested in ${selectedProduct.name}.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        gridColumn: "1 / -1",
                        minHeight: "55px",
                        borderRadius: "14px",
                        background: "#16a56a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        fontWeight: 800,
                        textDecoration: "none",
                      }}
                    >
                      <MessageCircle size={19} />
                      WhatsApp Owner
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ORDER FORM */}

            {showOrderForm && !orderSuccess && (
              <div
                style={{
                  padding: "42px",
                  background: "#fff",
                }}
              >
                
         <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowOrderForm(false);
  }}
  style={{
    border: "1px solid #ddd",
    background: "#fff",
    borderRadius: "12px",
    padding: "10px 15px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: 700,
  }}
>
  ← Back
</button>
                <div
                  style={{
                    padding: "24px",
                    borderRadius: "20px",
                    border:
                      "1px solid #eadfca",
                    background: "#faf8f3",
                    marginBottom: "22px",
                  }}
                >
                  <small
                    style={{
                      color: "#8a6a20",
                      fontWeight: 800,
                    }}
                  >
                    ORDER PRODUCT
                  </small>

                  <h2
                    style={{
                      margin: "8px 0",
                    }}
                  >
                    {selectedProduct.name}
                  </h2>

                  <strong
                    style={{
                      fontSize: "28px",
                    }}
                  >
                    ₹
                    {Number(
                      selectedProduct.price
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: "15px",
                  }}
                >
                  <label>
                    Full Name *

                    <input
                      type="text"
                      value={
                        orderForm.customerName
                      }
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          customerName:
                            e.target.value,
                        })
                      }
                      placeholder="Enter your full name"
                    />
                  </label>

                  <label>
                    Mobile Number *

                    <input
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Enter mobile number"
                    />
                  </label>

                  <label>
                    Address *

                    <textarea
                      value={orderForm.address}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          address:
                            e.target.value,
                        })
                      }
                      placeholder="House number, street, area"
                      rows={3}
                    />
                  </label>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "15px",
                    }}
                  >
                    <label>
                      City *

                      <input
                        type="text"
                        value={orderForm.city}
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            city: e.target.value,
                          })
                        }
                        placeholder="Pune"
                      />
                    </label>

                    <label>
                      Pincode *

                      <input
                        type="text"
                        value={
                          orderForm.pincode
                        }
                        onChange={(e) =>
                          setOrderForm({
                            ...orderForm,
                            pincode:
                              e.target.value,
                          })
                        }
                        placeholder="411015"
                      />
                    </label>
                  </div>

                  <label>
                    Quantity

                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={
                        orderForm.quantity
                      }
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          quantity: Math.max(
                            1,
                            Math.min(
                              20,
                              Number(
                                e.target.value
                              ) || 1
                            )
                          ),
                        })
                      }
                    />
                  </label>
                </div>

                {/* TOTAL */}

                <div
                  style={{
                    marginTop: "22px",
                    padding: "20px",
                    borderRadius: "16px",
                    border:
                      "1px solid #e8e1d2",
                    background: "#faf8f3",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>Total</strong>

                  <strong
                    style={{
                      fontSize: "28px",
                    }}
                  >
                    ₹
                    {(
                      Number(
                        selectedProduct.price
                      ) *
                      orderForm.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                {/* PLACE ORDER */}

                <button
                  type="button"
                  className="btn btn-green btn-large"
                  onClick={placeOrder}
                  disabled={orderLoading}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    minHeight: "56px",
                    borderRadius: "14px",
                    cursor: orderLoading
                      ? "wait"
                      : "pointer",
                    fontWeight: 800,
                  }}
                >
                  {orderLoading
                    ? "Placing Order..."
                    : "✓ Place Order"}
                </button>
              </div>
            )}

            {/* SUCCESS */}

            {orderSuccess && (
              <div
                style={{
                  textAlign: "center",
                  padding: "70px 30px",
                }}
              >
                <CheckCircle2 size={64} />

                <h2
                  style={{
                    marginTop: "18px",
                  }}
                >
                  Order Placed Successfully! 🎉
                </h2>

                <p>
                  Your order has been received by
                  Parihar Furniture.
                </p>

                <div
                  style={{
                    display: "inline-block",
                    marginTop: "15px",
                    padding: "15px 20px",
                    borderRadius: "14px",
                    background: "#faf8f3",
                    border:
                      "1px solid #e8e1d2",
                  }}
                >
                  <strong>Order ID</strong>

                  <div
                    style={{
                      marginTop: "7px",
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                    }}
                  >
                    {orderSuccess}
                  </div>
                </div>

                <p>
                  The owner will contact you to
                  confirm the order, price and
                  delivery details.
                </p>

                <button
                  type="button"
                  className="btn btn-gold"
                  onClick={closeProductModal}
                  style={{
                    marginTop: "20px",
                    minHeight: "52px",
                    borderRadius: "14px",
                    cursor: "pointer",
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <a
        className="floating-whatsapp"
        href={waLink(
          "Hello Parihar Furniture! I am interested in your furniture collection."
        )}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle />
      </a>

      <div className="owner-float">
        <Sparkles size={20} />

        <a href="/owner">
          <small>OWNER PORTAL</small>
          <b>+ Add with AI</b>
        </a>
      </div>

      {modal && (
        <div
          className="modal"
          onClick={() => setModal(null)}
        >
          <div
            className="modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              onClick={() => setModal(null)}
            >
              <X />
            </button>

            <h3>{modal}</h3>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} Parihar
          Furniture & Interior
        </span>

        <span>
          Designing Spaces, Defining Lifestyles
        </span>

        <span>
          <Instagram size={14} />{" "}
          @pariharfurniture
        </span>
      </footer>
    </div>
  );
}