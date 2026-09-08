"use client";

import { useState, useRef, useEffect } from "react";
import { Users, ChevronDown, Check } from "lucide-react";

interface GuestOption {
  value: string;
  label: string;
  sublabel: string;
}

const GUEST_OPTIONS: GuestOption[] = [
  { value: "1", label: "1 Guest", sublabel: "Solo Himalayan Trekker" },
  { value: "2", label: "2 Guests", sublabel: "Romantic Couple Chalet" },
  { value: "4", label: "4 Guests", sublabel: "Family Riverside Villa" },
  { value: "6", label: "6 Guests", sublabel: "Skyline Alpine Penthouse" },
];

interface CustomGuestSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export function CustomGuestSelect({ value, onChange }: CustomGuestSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = GUEST_OPTIONS.find((opt) => opt.value === value) || GUEST_OPTIONS[1];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Tappable whole box container */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl sm:rounded-full bg-slate-900/80 border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer select-none group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <Users className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left truncate">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-medium cursor-pointer">
              Guests
            </label>
            <span className="text-xs font-medium text-white truncate">
              {selectedOption.label}
            </span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Custom Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 z-50 glass-panel p-2 rounded-3xl border border-amber-500/40 shadow-2xl bg-slate-950/95 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="space-y-1">
            {GUEST_OPTIONS.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{opt.label}</span>
                    <span className="text-[10px] text-slate-400">{opt.sublabel}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
