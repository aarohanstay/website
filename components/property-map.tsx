"use client";

import { MapPin, Navigation, Phone, Mountain } from "lucide-react";
import { HOTEL_INFO } from "@/lib/hotel-data";

export function PropertyMap() {
  // Simple pin-only embed: use raw coordinates as query — shows a red pin without place-info popup
  const pinEmbedUrl = `https://maps.google.com/maps?q=${HOTEL_INFO.coordinates.lat},${HOTEL_INFO.coordinates.lng}&t=m&z=15&ie=UTF8&iwloc=near&output=embed`;

  return (
    <section id="location-map" className="py-24 relative bg-[#090a0f] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
            Prime Riverside Location
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
            Find Us in Tirthan Valley
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Situated right on the Tirthan riverbank in Badi Ropa, surrounded by pine forests, crystal trout streams, and Great Himalayan National Park trails.
          </p>
        </div>

        {/* Full-Width Map with Overlaid Address Card */}
        <div className="rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl relative min-h-[480px] flex flex-col">
          {/* Google Maps iframe — pin only */}
          <iframe
            title="Aarohan Retreat Location Map"
            src={pinEmbedUrl}
            className="w-full h-full min-h-[480px] border-0 flex-1 filter contrast-[1.05] brightness-95"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Overlaid Address Card — top-left of map */}
          <div className="absolute top-4 left-4 z-10 ios-glass rounded-2xl border border-white/15 shadow-2xl px-5 py-4 max-w-[280px] backdrop-blur-xl bg-[#090a0f]/80">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                <Mountain className="w-3.5 h-3.5 text-slate-950" />
              </div>
              <h4 className="text-sm font-serif font-bold text-white leading-tight">
                {HOTEL_INFO.company}
              </h4>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-slate-300 leading-relaxed">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
              <p className="font-light">{HOTEL_INFO.address}</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-2">
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-amber-400 transition-colors font-medium">
                {HOTEL_INFO.phone}
              </a>
            </div>
            {/* Open in Google Maps */}
            <a
              href={HOTEL_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow-md shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Navigation className="w-3 h-3 fill-slate-950 text-slate-950" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
