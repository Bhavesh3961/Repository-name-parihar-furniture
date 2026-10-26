"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LogOut,
  UploadCloud,
  Trash2,
  CheckCircle2,
  Plus,
  Package,
} from "lucide-react";

type Product = {
  id: string;
  code?: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  description?: string;
  material?: string;
  finish?: string;
  dimensions?: string;
};

const CATEGORIES = [
  "Living & Sofas",
  "Dining Sets",
  "Beds & Hydraulic",
  "Wardrobes & TV Units",
  "Pooja Mandir",
  "Study & Desks",
  "Full Flat Packages",
];

export function OwnerPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  // Product form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Living & Sofas");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [finish, setFinish] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Check saved session
    const saved = localStorage.getItem("parihar_owner_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshProducts();
    }
  }, [isAuthenticated]);

  async function refreshProducts() {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        setProducts(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Default passcodes or any configured passcode
    if (passcode.trim() === "parihar" || passcode.trim() === "parihar2026" || passcode.trim() === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("parihar_owner_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid passcode. Please enter the workshop passcode.");
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("parihar_owner_auth");
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !price || !imageUrl.trim()) {
      setMessage("Please fill in Name, Price, and Image URL.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category,
          price: Number(price),
          imageUrl: imageUrl.trim(),
          shortDescription: shortDescription.trim() || `${name} handcrafted in seasoned timber.`,
          description: shortDescription.trim() || `${name} handcrafted in seasoned timber.`,
          material: material.trim() || "Seasoned Burma Teak / Sheesham",
          finish: finish.trim() || "5-Coat Melamine Silk Polish",
          dimensions: dimensions.trim() || "Customizable to Room Layout",
          published: true,
        }),
      });

      if (res.ok) {
        setMessage("Product added successfully!");
        setName("");
        setPrice("");
        setImageUrl("");
        setShortDescription("");
        setMaterial("");
        setDimensions("");
        setFinish("");
        refreshProducts();
      } else {
        setMessage("Could not save product. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error saving product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Are you sure you want to remove this piece from the catalog?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "20px", background: "var(--canvas-bg)" }}>
        <div style={{ maxWidth: "420px", width: "100%", padding: "32px", borderRadius: "24px", background: "var(--canvas-card)", backdropFilter: "blur(30px)", border: "1.8px solid var(--gold-border)", boxShadow: "var(--glass-specular)" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", margin: "0 auto 12px", border: "1.8px solid var(--gold-light)", overflow: "hidden", background: "#151619" }}>
              <Image src="/assets/logo.png" alt="Parihar Logo" width={56} height={56} />
            </div>
            <h1 style={{ fontSize: "26px", color: "#ffffff", fontWeight: "700" }}>
              Atelier Management
            </h1>
            <p style={{ fontSize: "14px", color: "var(--ink-secondary)" }}>
              Parihar Furniture & Interior Workshop
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label style={{ fontSize: "14px", color: "var(--gold-light)" }}>
              Workshop Passcode
              <input
                type="password"
                placeholder="Enter passcode (e.g. parihar)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "14px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
              />
            </label>

            {loginError && (
              <p style={{ color: "#ef4444", fontSize: "13px" }}>{loginError}</p>
            )}

            <button type="submit" className="btn-gold-primary" style={{ justifyContent: "center", height: "48px" }}>
              Enter Atelier Portal
            </button>

            <a href="/" style={{ color: "var(--ink-muted)", textAlign: "center", fontSize: "13.5px", marginTop: "8px" }}>
              ← Return to Main Website
            </a>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "clamp(20px, 4vw, 40px) clamp(16px, 4vw, 40px)", background: "var(--canvas-bg)", color: "#ffffff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", paddingBottom: "18px", borderBottom: "1px solid var(--gold-border-subtle)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="/" className="nav-menu-toggle" style={{ width: "40px", height: "40px" }}>
              <ArrowLeft size={18} />
            </a>
            <div>
              <h1 style={{ fontSize: "26px", fontWeight: "700" }}>Parihar Catalog Manager</h1>
              <p style={{ fontSize: "13px", color: "var(--gold-light)" }}>Workshop Direct Product Management</p>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-glass-champagne" style={{ height: "42px", padding: "0 16px", fontSize: "14px" }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Form & List Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
          {/* Add Product Form */}
          <div style={{ padding: "26px", borderRadius: "24px", background: "var(--canvas-card)", backdropFilter: "blur(28px)", border: "1.8px solid var(--gold-border)", boxShadow: "var(--glass-specular)" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "16px", color: "var(--gold-light)" }}>
              + Add New Furniture Piece
            </h2>

            <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <label style={{ fontSize: "13.5px", color: "var(--ink-secondary)" }}>
                Item Name *
                <input
                  type="text"
                  placeholder="e.g. Royal Teak 6-Seater Dining Set"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "12px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <label style={{ fontSize: "13.5px", color: "var(--ink-secondary)" }}>
                  Category *
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "12px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>

                <label style={{ fontSize: "13.5px", color: "var(--ink-secondary)" }}>
                  Price (₹) *
                  <input
                    type="number"
                    placeholder="e.g. 54000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "12px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                  />
                </label>
              </div>

              <label style={{ fontSize: "13.5px", color: "var(--ink-secondary)" }}>
                Image URL *
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or real photo URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "12px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                />
              </label>

              <label style={{ fontSize: "13.5px", color: "var(--ink-secondary)" }}>
                Core Timber / Material
                <input
                  type="text"
                  placeholder="e.g. 100% Solid Burma Teak"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "12px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                />
              </label>

              <label style={{ fontSize: "13.5px", color: "var(--ink-secondary)" }}>
                Short Summary
                <textarea
                  rows={2}
                  placeholder="Brief description of timber, cushions, and design features"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "12px", background: "rgba(18, 19, 24, 0.9)", border: "1.5px solid var(--gold-border)", color: "#ffffff", marginTop: "4px" }}
                />
              </label>

              {message && (
                <p style={{ color: "var(--gold-light)", fontSize: "14px" }}>{message}</p>
              )}

              <button type="submit" className="btn-gold-primary" disabled={saving} style={{ justifyContent: "center", height: "48px", marginTop: "6px" }}>
                <Plus size={18} />
                <span>{saving ? "Publishing..." : "Publish to Showroom Catalog"}</span>
              </button>
            </form>
          </div>

          {/* Current Products */}
          <div>
            <h2 style={{ fontSize: "22px", marginBottom: "16px", color: "var(--gold-light)" }}>
              Active Catalog Pieces ({products.length})
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "75vh", overflowY: "auto" }}>
              {products.map((p) => (
                <div
                  key={p.id}
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", borderRadius: "16px", background: "var(--canvas-card)", border: "1.5px solid var(--gold-border-subtle)", boxShadow: "0 4px 14px rgba(0,0,0,0.3)" }}
                >
                  <div style={{ width: "54px", height: "54px", borderRadius: "10px", overflow: "hidden", position: "relative", flexShrink: 0, background: "#18191e" }}>
                    <Image src={p.imageUrl} alt={p.name} fill style={{ objectFit: "cover" }} sizes="54px" />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ display: "block", fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.name}
                    </strong>
                    <small style={{ color: "var(--gold-light)", fontSize: "13px" }}>
                      ₹{Number(p.price).toLocaleString("en-IN")} · {p.category}
                    </small>
                  </div>

                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    style={{ color: "#ef4444", padding: "8px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.1)" }}
                    aria-label="Delete product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}