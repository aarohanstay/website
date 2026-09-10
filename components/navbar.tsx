"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, BedDouble, Utensils, Bot, MapPin, Menu, X, CalendarCheck } from "lucide-react";
import { HOTEL_INFO } from "@/lib/hotel-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-none transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-[#090a0f]/95 backdrop-blur-xl py-1.5 sm:py-2 shadow-2xl shadow-black/95"
          : "bg-transparent backdrop-blur-none py-4 sm:py-6 shadow-none"
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 flex items-start justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0 group">
          <Image
            src="/branding/logo.svg"
            alt={HOTEL_INFO.company}
            width={480}
            height={180}
            style={{ width: "auto" }}
            className={`object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] drop-shadow-[0_0_24px_rgba(255,255,255,0.7)] transition-all duration-300 group-hover:scale-105 ${
              scrolled
                ? "h-9 sm:h-11"
                : "h-[88px] sm:h-[128px]"
            }`}
            priority
          />
        </Link>

        {/* Desktop iOS Glass Navigation Pill (Right Aligned to Top) */}
        <nav className="hidden xl:flex items-center ml-auto gap-8 text-[13px] font-semibold uppercase tracking-wider text-slate-200 ios-glass-pill pl-8 pr-2 py-1.5 rounded-full border border-white/15 shadow-2xl transition-all duration-300 mt-0.5">
          <button
            onClick={() => handleNavClick("suites")}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <BedDouble className="w-4 h-4 text-amber-400" />
            <span>Rooms</span>
          </button>

          <button
            onClick={() => handleNavClick("gallery")}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Media Tour</span>
          </button>

          <button
            onClick={() => handleNavClick("location-map")}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Map</span>
          </button>

          <button
            onClick={() => handleNavClick("dining")}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Dining</span>
          </button>

          <button
            onClick={() => router.push("/checkout?roomId=deluxe-alpine-haven")}
            className="flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors py-1 px-3 rounded-full bg-amber-500/15 border border-amber-500/30 cursor-pointer shadow-sm"
          >
            <CalendarCheck className="w-4 h-4 text-amber-400" />
            <span>Book Stay</span>
          </button>
        </nav>

        {/* Mobile / Tablet Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-2xl ios-glass-pill border border-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer mt-0.5"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile iOS Glass Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 ios-glass px-4 py-5 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <button
            onClick={() => handleNavClick("suites")}
            className="w-full flex items-center gap-3 p-3 rounded-2xl ios-glass-pill text-xs font-semibold text-white hover:text-amber-300 cursor-pointer"
          >
            <BedDouble className="w-4 h-4 text-amber-400" />
            <span>Rooms & Suites</span>
          </button>
          <button
            onClick={() => handleNavClick("gallery")}
            className="w-full flex items-center gap-3 p-3 rounded-2xl ios-glass-pill text-xs font-semibold text-white hover:text-amber-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Media & Video Tour</span>
          </button>
          <button
            onClick={() => handleNavClick("location-map")}
            className="w-full flex items-center gap-3 p-3 rounded-2xl ios-glass-pill text-xs font-semibold text-white hover:text-amber-300 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Property Map & Directions</span>
          </button>
          <button
            onClick={() => handleNavClick("dining")}
            className="w-full flex items-center gap-3 p-3 rounded-2xl ios-glass-pill text-xs font-semibold text-white hover:text-amber-300 cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Himalayan Dining</span>
          </button>
          <button
            onClick={() => handleNavClick("ai-concierge-preview")}
            className="w-full flex items-center gap-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-amber-400" />
            <span>Aura AI Butler (24/7)</span>
          </button>
        </div>
      )}
    </header>
  );
}
