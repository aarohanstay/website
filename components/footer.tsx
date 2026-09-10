"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { HOTEL_INFO } from "@/lib/hotel-data";
import { MapPin, Phone, Mail, Sparkles, Navigation } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleFooterNav = (id: string) => {
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
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center">
              <Image
                src="/branding/logo.svg"
                alt={HOTEL_INFO.company}
                width={260}
                height={100}
                style={{ width: "auto" }}
                className="h-12 object-contain"
              />
            </div>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              {HOTEL_INFO.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Resort Accommodations
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleFooterNav("suites")} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Family Cedar Suite (₹7,500)
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav("suites")} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Deluxe Alpine Haven (₹3,750)
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav("gallery")} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Photo & Video Tour
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav("dining")} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Himalayan Trout Dining
                </button>
              </li>
            </ul>
          </div>

          {/* AI Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI & Butler Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleFooterNav("ai-concierge-preview")} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Aura AI Mountain Butler
                </button>
              </li>
              <li><span className="text-slate-500">24/7 Private Butler Assistance</span></li>
              <li><span className="text-slate-500">Kullu Airport SUV Pickup</span></li>
              <li><span className="text-slate-500">Great Himalayan Park Treks</span></li>
            </ul>
          </div>

          {/* Location & Directions */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Visit Us
            </h4>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{HOTEL_INFO.email}</span>
              </li>
            </ul>

            {/* Google Maps Link Button */}
            <a
              href={HOTEL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-amber-300 font-semibold px-4 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-all shadow-md"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} {HOTEL_INFO.company}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
