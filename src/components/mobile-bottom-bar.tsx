"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Star, Compass, LayoutGrid } from "lucide-react";

interface MobileBottomBarProps {
  phoneNumber?: string;
  whatsappNumber?: string;
}

export function MobileBottomBar({
  phoneNumber = "919175379886",
  whatsappNumber = "919175379886",
}: MobileBottomBarProps) {
  const pathname = usePathname();

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Namaste Parihar Furniture! Mujhe furniture designs, rates aur karkhana visit ke baare me jankari chahiye."
  )}`;

  return (
    <nav className="mobile-dock-bar" aria-label="Mobile Navigation">
      <Link
        href="/catalog"
        className={`mobile-dock-item ${pathname === "/catalog" ? "active" : ""}`}
      >
        <LayoutGrid size={19} />
        <span>Catalog</span>
      </Link>

      <Link
        href="/devghar"
        className={`mobile-dock-item ${pathname === "/devghar" ? "active" : ""}`}
      >
        <Compass size={19} />
        <span>Devghar</span>
      </Link>

      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="mobile-dock-item mobile-dock-wa"
        aria-label="Chat on WhatsApp"
      >
        <div className="mobile-dock-wa-bubble">
          <MessageCircle size={20} />
        </div>
        <span>WhatsApp</span>
      </a>

      <a
        href={`tel:+${phoneNumber}`}
        className="mobile-dock-item"
        aria-label="Call Parihar Furniture"
      >
        <Phone size={19} />
        <span>Call</span>
      </a>

      <Link
        href="/reviews"
        className={`mobile-dock-item ${pathname === "/reviews" ? "active" : ""}`}
      >
        <Star size={19} fill={pathname === "/reviews" ? "var(--gold-light)" : "none"} />
        <span>Reviews</span>
      </Link>
    </nav>
  );
}
