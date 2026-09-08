"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Mountain, Flame, CheckCircle2, ShieldCheck } from "lucide-react";
import { HOTEL_INFO, ROOMS } from "@/lib/hotel-data";
import { CustomDatePicker } from "./custom-date-picker";
import { CustomRoomSelect } from "./custom-room-select";
import { HeroBackgroundSlider } from "./hero-background-slider";
import { AITypingSubtitle } from "./ai-typing-subtitle";

// Animated Background Images Sequence featuring Authentic Chhoie Waterfall Tirthan Valley Scenery
const HERO_BACKGROUNDS = [
  "/photos_videos/chhoie_waterfall.jpg", // 1st: Authentic Chhoie Waterfall Tirthan Valley (8K Pine Forest Cascade)
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85", // 2nd: Majestic Himalayan Hill Peak & Mountain Valley
  "/photos_videos/chhoie_waterfall_stream.jpg", // 3rd: Chhoie Waterfall River Stream & Rhododendron Trail
  "/photos_videos/photo_01.jpg", // 4th: Resort Himalayan Wooden Architecture
  "/photos_videos/photo_07.jpg", // 5th: Wooden Balcony River & Mountain View
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85", // 6th: Panoramic Green Himalayan Slopes
];

export function Hero() {
  const router = useRouter();
  const [selectedRoomId, setSelectedRoomId] = useState(ROOMS[0].id);

  // Default: 1-Day Stay (Today to Tomorrow)
  const [checkInDate, setCheckInDate] = useState<Date | null>(() => new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    const inStr = checkInDate ? checkInDate.toISOString() : now.toISOString();
    const outStr = checkOutDate ? checkOutDate.toISOString() : tomorrow.toISOString();
    router.push(`/checkout?roomId=${selectedRoomId}&checkIn=${inStr}&checkOut=${outStr}`);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-10 overflow-visible z-20">
      {/* Background Slider */}
      <HeroBackgroundSlider images={HERO_BACKGROUNDS} intervalMs={4500} />

      {/* Ambient Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f]/90 via-[#090a0f]/30 to-black/30 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none z-10" />

      {/* Top / Center Content: Headline & Subtitle */}
      <div className="relative z-30 max-w-6xl w-full mx-auto px-2 sm:px-6 lg:px-8 text-center flex-1 flex flex-col items-center justify-center pointer-events-auto mt-12">
        {/* Luxury Headline Container */}
        <div className="relative flex flex-col items-center mb-8">
          {/* Ambient Gold Glow Aura Backdrop */}
          <div className="absolute -inset-x-4 sm:-inset-x-16 -inset-y-8 bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 rounded-full blur-3xl pointer-events-none animate-gold-glow overflow-hidden" />

          {/* Luxury Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold mb-4 backdrop-blur-md shadow-lg shadow-amber-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>Tirthan Valley • Luxury Riverside Sanctuary</span>
          </div>

          {/* Main 7XL High-Contrast Typography */}
          <h1 className="relative text-3xl sm:text-5xl lg:text-7xl font-serif tracking-tight leading-tight select-none">
            <span className="font-light italic pr-2 sm:pr-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]">
              Flowing Waters,
            </span>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-[0_4px_20px_rgba(255,255,255,0.5)]">
              Himalayan Haven
            </span>
          </h1>

          {/* Animated Golden Light Beam Accent Divider */}
          <div className="relative w-64 h-0.5 mt-5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent overflow-hidden rounded-full">
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-300 to-transparent animate-beam-sweep" />
          </div>
        </div>
        
        {/* Dynamic Headline & Subtitle Handled by AI Component */}
        <AITypingSubtitle />
      </div>

      {/* Bottom Content: Booking Form */}
      <div className="relative z-30 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-auto">
        <form
          onSubmit={handleBookNow}
          className="relative z-[100] w-full max-w-4xl p-3 sm:p-3.5 rounded-3xl md:rounded-full ios-glass-pill border border-white/15 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-2.5 text-left overflow-visible"
        >
          {/* Custom Room Type Select */}
          <CustomRoomSelect
            value={selectedRoomId}
            onChange={(roomId) => setSelectedRoomId(roomId)}
          />

          {/* Custom Check-In Date */}
          <CustomDatePicker
            label="Check-In"
            selectedDate={checkInDate}
            onSelectDate={(date) => {
              setCheckInDate(date);
              if (checkOutDate && date >= checkOutDate) {
                setCheckOutDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
              }
            }}
            placeholder="Select Check-In"
          />

          {/* Custom Check-Out Date */}
          <CustomDatePicker
            label="Check-Out"
            selectedDate={checkOutDate}
            onSelectDate={(date) => setCheckOutDate(date)}
            minDate={checkInDate ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
            placeholder="Select Check-Out"
          />

          {/* Book Now Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs px-5 py-3.5 rounded-2xl md:rounded-full shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <CheckCircle2 className="w-4 h-4 fill-slate-950 text-amber-400" />
            <span>Book Now</span>
          </button>
        </form>

        {/* Feature Highlights Footer */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-slate-300 text-xs font-medium drop-shadow-md">
          <div className="flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Wood Hearth Chalets</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mountain className="w-4 h-4 text-amber-400" />
            <span>UNESCO Park Treks</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Tirthan Trout Dining</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Airport SUV Transfer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
