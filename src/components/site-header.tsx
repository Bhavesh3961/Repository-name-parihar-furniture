"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  Phone,
  MessageCircle,
  X,
  ChevronRight,
} from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919175379886";
const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || whatsappNumber;

const waLink = (msg: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

export function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Furniture Catalog", href: "/catalog", num: "01" },
    { label: "Sacred Devghar", href: "/devghar", num: "02" },
    { label: "Client Testimonials", href: "/reviews", num: "03" },
    { label: "Workshop Location", href: "/location", num: "04" },
  ];

  return (
    <div className="liquid-navbar-wrapper">
      {/* 01. Liquid Glass Top Notification Ticker */}
      <div className="liquid-ticker-bar">
        <div className="ticker-track">
          <span className="ticker-item">
            ✦ <b>PARIHAR FURNITURE & INTERIOR</b> · VISHRANTWADI WORKSHOP
          </span>
          <span className="ticker-item">
            ★ <b>100% SEASONED BURMA TEAK & SHEESHAM WOOD</b>
          </span>
          <span className="ticker-item">
            ✦ <b>HONEST CARPENTER PRICES · 0% MIDDLEMAN COMMISSIONS</b>
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
            ★ <b>100% SEASONED BURMA TEAK & SHEESHAM WOOD</b>
          </span>
          <span className="ticker-item">
            ✦ <b>HONEST CARPENTER PRICES · 0% MIDDLEMAN COMMISSIONS</b>
          </span>
          <span className="ticker-item">
            ★ <b>FREE PUNE HOME MEASUREMENT & ESTIMATE</b>
          </span>
          <span className="ticker-item">
            ✦ <b>OPEN DAILY 8:00 AM – 10:00 PM</b>
          </span>
        </div>
      </div>

      {/* 02. Apple Liquid Glass Sticky Top Navbar (WhatsApp removed on Mobile) */}
      <header className="liquid-navbar">
        <div className="navbar-inner">
          {/* Official Brand Logo */}
          <Link href="/" className="brand-anchor" aria-label="Parihar Furniture Home">
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
              <span className="brand-sub-title">Furniture & Interior · Vishrantwadi</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="desktop-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop & Mobile Actions (WhatsApp hidden on mobile since it's already in bottom dock) */}
          <div className="mobile-nav-actions">
            <a
              href={waLink("Hello Parihar Furniture! I would like to inquire about furniture.")}
              target="_blank"
              rel="noreferrer"
              className="nav-wa-pill"
              aria-label="WhatsApp Parihar Furniture"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Atelier</span>
            </a>

            <button
              type="button"
              className="nav-menu-toggle"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {drawerOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* 03. Liquid Glass Mobile Drawer Menu */}
      {drawerOpen && (
        <div className="liquid-drawer-overlay">
          <div className="drawer-header">
            <Link href="/" className="brand-anchor" onClick={() => setDrawerOpen(false)}>
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
            </Link>

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
              <Link
                key={link.href}
                href={link.href}
                className="drawer-link-item"
                onClick={() => setDrawerOpen(false)}
              >
                <span>{link.num}</span>
                {link.label}
                <ChevronRight size={18} style={{ opacity: 0.4 }} />
              </Link>
            ))}
          </nav>

          <div className="drawer-footer-actions">
            <a
              href={waLink("Hello Parihar Furniture! Please share your complete furniture catalogue.")}
              target="_blank"
              rel="noreferrer"
              className="dock-btn highlight-wa"
              onClick={() => setDrawerOpen(false)}
              style={{ height: "48px", justifyContent: "center", fontSize: "15px", flexDirection: "row", gap: "8px" }}
            >
              <MessageCircle size={18} />
              <span>Direct WhatsApp Catalog</span>
            </a>

            <a
              href={`tel:+${phoneNumber}`}
              className="btn-gold-primary"
              onClick={() => setDrawerOpen(false)}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Phone size={17} />
              <span>Call Workshop: +91 {phoneNumber.slice(-10)}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
