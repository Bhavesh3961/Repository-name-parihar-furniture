"use client";

import Image from "next/image";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { useState } from "react";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919191579886";
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER || whatsapp;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "#home"], ["About Brand", "#about"], ["Collections", "#collections"], ["5-Star Interiors", "#interiors"], ["Devghar (Mandir)", "#devghar"], ["Price Estimator", "#estimator"], ["Reviews", "#reviews"], ["Visit Store", "#contact"]
  ];
  return (
    <>
      <div className="topbar"><span>✦ PARIHAR FURNITURE & INTERIOR</span><span>Open Daily: 8:00 AM – 10:00 PM</span><span>Vishrantwadi, Pune</span><span>+91 {phone.slice(-10)}</span></div>
      <header className="header">
        <a href="#home" className="brand"><Image src="/assets/logo.png" alt="Parihar Furniture & Interior" width={54} height={54} className="brand-logo"/><span><strong>PARIHAR</strong><small>FURNITURE & INTERIOR</small></span><b className="rating">4.0 ★<small>Google</small></b></a>
        <nav className={open ? "nav open" : "nav"}>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
        <div className="header-actions">
          <a className="btn btn-dark" href="/owner"><Sparkles size={16}/> AI Studio<br/><small>(Owner)</small></a>
          <a className="btn btn-green" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello Parihar Furniture! I am interested in your furniture collection.")}`} target="_blank" rel="noreferrer">WhatsApp<br/>Inquiry</a>
          <a className="btn btn-gold" href={`tel:+${phone}`}> <Phone size={15}/> Call<br/>Now</a>
        </div>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
      </header>
    </>
  );
}
