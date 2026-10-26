"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  Phone,
  MessageCircle,
  X,
  Compass,
  MapPin,
  ChevronRight,
} from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919175379886";
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || whatsappNumber;

const waLink = (msg: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

export function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Furniture Catalog", href: "#catalog", num: "01" },
    { label: "Pooja Mandir", href: "#devghar", num: "02" },
    { label: "Customer Reviews", href: "#reviews", num: "03" },
    { label: "Workshop Location", href: "#location", num: "04" },
  ];

  return (
    <>
      {/* 01. Liquid Glass Top Notification Ticker */}
      <div className="liquid-ticker-bar">
        <div className="ticker-track">
          <span className="ticker-item">
            ✦ <b>PARIHAR FURNITURE & INTERIOR</b> · VISHRANTWADI WORKSHOP
          </span>
          <span className="ticker-item">
            ★ <b>100% SEASONED BURMA TEAK & SHEESHAM</b>
          </span>
          <span className="ticker-item">
            ✦ <b>DIRECT WORKSHOP PRICES · 0% MIDDLEMAN MARKUP</b>
          </span>
          <span className="ticker-item">
            ★ <b>FREE PUNE HOME MEASUREMENT & ESTIMATE</b>
          </span>
          <span className="ticker-item">
            ✦ <b>OPEN DAILY 8:00 AM – 10:00 PM</b>
          </span>
          {/* Duplicate track for infinite loop */}
          <span className="ticker-item">
            ✦ <b>PARIHAR FURNITURE & INTERIOR</b> · VISHRANTWADI WORKSHOP
          </span>
          <span className="ticker-item">
            ★ <b>100% SEASONED BURMA TEAK & SHEESHAM</b>
          </span>
          <span className="ticker-item">
            ✦ <b>DIRECT WORKSHOP PRICES · 0% MIDDLEMAN MARKUP</b>
          </span>
          <span className="ticker-item">
            ★ <b>FREE PUNE HOME MEASUREMENT & ESTIMATE</b>
          </span>
          <span className="ticker-item">
            ✦ <b>OPEN DAILY 8:00 AM – 10:00 PM</b>
          </span>
        </div>
      </div>

      {/* 02. Apple-Style Liquid Glass Navbar */}
      <header className="liquid-navbar">
        <div className="navbar-inner">
          {/* Official Brand Logo */}
          <a href="#hero" className="brand-anchor" aria-label="Parihar Furniture Home">
            <div className="brand-emblem-wrap">
              <Image
                src="/assets/logo.png"
                alt="Parihar Furniture Logo"
                width={44}
                height={44}
                priority
              />
            </div>
            <div className="brand-titles">
              <span className="brand-main-title">Parihar</span>
              <span className="brand-sub-title">Furniture & Interior</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="desktop-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Clean Mobile Actions (2 clean buttons) */}
          <div className="mobile-nav-actions">
            <a
              href={waLink("Hello Parihar Furniture! I would like to inquire about furniture.")}
              target="_blank"
              rel="noreferrer"
              className="nav-wa-pill"
              aria-label="WhatsApp Parihar Furniture"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              className="nav-menu-toggle"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {drawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* 03. Liquid Glass Mobile Drawer Menu */}
      {drawerOpen && (
        <div className="liquid-drawer-overlay">
          <div className="drawer-header">
            <div className="brand-anchor">
              <div className="brand-emblem-wrap">
                <Image
                  src="/assets/logo.png"
                  alt="Parihar Furniture"
                  width={40}
                  height={40}
                />
              </div>
              <div className="brand-titles">
                <span className="brand-main-title">Parihar</span>
                <span className="brand-sub-title">Vishrantwadi, Pune</span>
              </div>
            </div>

            <button
              type="button"
              className="nav-menu-toggle"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close Menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="drawer-nav-list">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="drawer-link-item"
                onClick={() => setDrawerOpen(false)}
              >
                <span>{link.num}</span>
                {link.label}
                <ChevronRight size={18} style={{ opacity: 0.4 }} />
              </a>
            ))}

            <a
              href="/owner"
              className="drawer-link-item"
              onClick={() => setDrawerOpen(false)}
              style={{ fontSize: "16px", marginTop: "12px", opacity: 0.65 }}
            >
              <span>05</span>
              Owner Portal
              <ChevronRight size={16} />
            </a>
          </nav>

          <div className="drawer-footer-actions">
            <a
              href={waLink("Hello Parihar Furniture! Please share your complete furniture catalogue.")}
              target="_blank"
              rel="noreferrer"
              className="nav-wa-pill"
              onClick={() => setDrawerOpen(false)}
              style={{ height: "48px", justifyContent: "center", fontSize: "12px" }}
            >
              <MessageCircle size={17} />
              <span>Direct WhatsApp Catalog</span>
            </a>

            <a
              href={`tel:+${phoneNumber}`}
              className="btn-liquid-gold"
              onClick={() => setDrawerOpen(false)}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Phone size={17} />
              <span>Call Workshop: +91 {phoneNumber.slice(-10)}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
