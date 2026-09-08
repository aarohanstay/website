"use client";

import { useState, useRef, useEffect } from "react";
import { BedDouble, ChevronDown, Check } from "lucide-react";
import { ROOMS } from "@/lib/hotel-data";

interface CustomRoomSelectProps {
  value: string;
  onChange: (roomId: string) => void;
}

export function CustomRoomSelect({ value, onChange }: CustomRoomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const selectedRoom = ROOMS.find((r) => r.id === value) || ROOMS[0];

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? "z-[100]" : "z-50"}`}>
      {/* Tappable whole box button container */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl sm:rounded-full bg-white/10 border border-white/15 hover:bg-white/15 hover:border-amber-500/50 transition-all cursor-pointer select-none group shadow-lg text-left"
      >
        <div className="flex items-center gap-3 min-w-0 pointer-events-none">
          <BedDouble className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left truncate">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              Room Category
            </span>
            <span className="text-xs font-bold text-white truncate">
              {selectedRoom.name}
            </span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 pointer-events-none ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Solid Glass Dropdown Menu with z-[9999] */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 z-[9999] p-2.5 rounded-3xl bg-[#0d1322]/95 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200 min-w-[290px]">
          <div className="space-y-1.5">
            {ROOMS.map((room) => {
              const isSelected = room.id === value;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange(room.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-slate-200 ios-glass-pill hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex flex-col space-y-0.5 pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{room.name}</span>
                      <span className="text-[9px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                        25% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>Up to {room.maxGuests} Guests</span>
                      <span>•</span>
                      <span className="text-amber-300 font-bold">₹{room.priceNightly.toLocaleString()} / night</span>
                      <span className="line-through text-slate-500">₹{room.originalPriceNightly.toLocaleString()}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
