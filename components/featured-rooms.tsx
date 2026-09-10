"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Users, Maximize2, Bed, Check, Sparkles, X, ChevronRight, Tag } from "lucide-react";
import { ROOMS, Room } from "@/lib/hotel-data";

export function FeaturedRooms() {
  const router = useRouter();
  const [activeModalRoom, setActiveModalRoom] = useState<Room | null>(null);

  const handleProceedToCheckout = (roomId: string) => {
    router.push(`/checkout?roomId=${roomId}`);
  };

  return (
    <section id="suites" className="py-24 relative bg-[#090a0f] border-t border-slate-800/60 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold mb-4 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>Exclusive Riverside Stays & Suites</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif tracking-tight select-none">
            <span className="font-light italic pr-2 sm:pr-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
              Our Luxury
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]">
              Riverside Accommodations
            </span>
          </h2>

          {/* Animated Golden Accent Line */}
          <div className="relative w-48 h-0.5 mt-5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent overflow-hidden rounded-full">
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-300 to-transparent animate-beam-sweep" />
          </div>
        </div>

        {/* Full-Width Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {ROOMS.map((room) => (
            <div
              key={room.id}
              className="group ios-glass-card rounded-3xl overflow-hidden border border-amber-500/30 hover:border-amber-500/70 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-2xl relative"
            >
              {/* Top Offer Badge — top-left */}
              <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>{room.discountBadge}</span>
                <span className="w-px h-3.5 bg-amber-500/30" />
                <span className="text-emerald-400">Save ₹{(room.originalPriceNightly - room.priceNightly).toLocaleString('en-IN')}</span>
              </div>

              {/* View Tag — top-right */}
              <div className="absolute top-4 right-4 z-20 bg-slate-950/70 backdrop-blur-md border border-white/10 text-slate-200 text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>River & Mountain View</span>
              </div>

              <div>
                {/* Image Banner */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/20 to-transparent opacity-80" />

                  {/* Offer Badge — top-left */}
                  <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>{room.discountBadge}</span>
                    <span className="w-px h-3.5 bg-amber-500/30" />
                    <span className="text-emerald-400">Save ₹{(room.originalPriceNightly - room.priceNightly).toLocaleString('en-IN')}</span>
                  </div>

                  {/* View Tag — top-right */}
                  <div className="absolute top-4 right-4 z-20 bg-slate-950/70 backdrop-blur-md border border-white/10 text-slate-200 text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>River & Mountain View</span>
                  </div>

                  {/* Price Tag — bottom-right */}
                  <div className="absolute bottom-4 right-5 text-right bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-amber-500/30 shadow-xl z-20">
                    <span className="text-xl sm:text-2xl font-bold text-amber-300 font-mono block animate-price-pop origin-right">
                      ₹{room.priceNightly.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
                      <span className="text-xs text-slate-400 line-through font-mono">₹{room.originalPriceNightly.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-slate-300 font-light">/ night</span>
                    </div>
                  </div>
                </div>

                {/* Content Body Below Image */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Category, Guests & Suite Name */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                        {room.category}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 font-light">
                        Up to {room.maxGuests} Guests
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                      {room.name}
                    </h3>
                  </div>

                  {/* Description Subtitle */}
                  <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                    {room.description}
                  </p>

                  {/* Specs Bar (Clean Minimal Row) */}
                  <div className="flex items-center gap-4 text-slate-300 text-xs py-2.5 border-y border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{room.maxGuests} Guests</span>
                    </div>
                    <span className="text-slate-700">|</span>
                    <div className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{room.sizeSqFt} sq ft</span>
                    </div>
                    <span className="text-slate-700">|</span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Bed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{room.bedConfig}</span>
                    </div>
                  </div>

                  {/* Amenity Badges + Book Now Button */}
                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                        >
                          <Check className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleProceedToCheckout(room.id)}
                      className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-1.5 shrink-0 cursor-pointer border border-amber-300/40"
                    >
                      <span>Book Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Details Modal */}
      {activeModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="ios-glass border border-amber-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-6 relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setActiveModalRoom(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-72 w-full shrink-0">
              <Image
                src={activeModalRoom.image}
                alt={activeModalRoom.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    {activeModalRoom.category}
                  </span>
                  <h3 className="text-2xl font-serif text-white font-bold">
                    {activeModalRoom.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-amber-300">
                    ₹{activeModalRoom.priceNightly.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-300 font-light block"> / night</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 overflow-y-auto space-y-6 flex-1 text-xs text-slate-300">
              <p className="leading-relaxed font-light text-sm text-slate-200">
                {activeModalRoom.description}
              </p>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 text-amber-400">
                  Included Privileges & Room Amenities
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeModalRoom.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl ios-glass-pill border border-white/5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Tag className="w-4 h-4" /> 25% Direct Booking Discount Included
                </span>
                <button
                  onClick={() => {
                    const roomId = activeModalRoom.id;
                    setActiveModalRoom(null);
                    handleProceedToCheckout(roomId);
                  }}
                  className="py-3 px-6 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
                >
                  Book Stay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
