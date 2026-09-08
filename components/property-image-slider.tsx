"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PropertyImageSliderProps {
  images: string[];
  intervalMs?: number;
  badgeText?: string;
  companyText?: string;
  titleText?: string;
}

export function PropertyImageSlider({
  images,
  intervalMs = 4500,
  badgeText,
  companyText,
  titleText,
}: PropertyImageSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [currentIdx, images.length, intervalMs]);

  const handleDotClick = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (idx !== currentIdx) {
      setPrevIdx(currentIdx);
      setCurrentIdx(idx);
    }
  };

  return (
    <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10 group bg-[#090a0f]">
      {/* Animated Image Slides - Identical to Hero Background Slider Animation */}
      {images.map((imgUrl, index) => {
        const isCurrent = index === currentIdx;
        const isPrev = index === prevIdx;

        let animationStyle = "opacity-0 scale-100";
        if (isCurrent) {
          animationStyle = "opacity-100 scale-110 transition-all duration-[4500ms] ease-out";
        } else if (isPrev) {
          animationStyle = "opacity-0 scale-110 transition-opacity duration-[1400ms] ease-in-out";
        }

        return (
          <div
            key={`${imgUrl}-${index}`}
            className={`absolute inset-0 ${animationStyle} pointer-events-none`}
          >
            <Image
              src={imgUrl}
              alt="Resort Property Preview"
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
            />
          </div>
        );
      })}

      {/* Dark Ambient Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40 pointer-events-none z-10" />

      {/* Discount Badge */}
      {badgeText && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
          {badgeText}
        </div>
      )}

      {/* Borderless Ultra-Compact Paging Dots positioned at Top Right Corner (z-30) */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border-none shadow-lg shadow-black/90 pointer-events-auto">
        {images.map((_, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              key={`dot-${idx}`}
              type="button"
              onClick={(e) => handleDotClick(idx, e)}
              className="relative h-1.5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden group/dot"
              style={{ width: isActive ? "20px" : "6px" }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div
                className={`w-full h-full rounded-full transition-all ${
                  isActive
                    ? "bg-amber-400 shadow-sm shadow-amber-400/80"
                    : "bg-slate-400/80 hover:bg-amber-300"
                }`}
              />
              {/* Active Progress Filler Animation */}
              {isActive && (
                <div
                  key={`progress-${currentIdx}`}
                  className="absolute inset-0 bg-amber-200/50 animate-pulse"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Property Title Overlay */}
      {(companyText || titleText) && (
        <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
          {companyText && (
            <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold block drop-shadow-md">
              {companyText}
            </span>
          )}
          {titleText && (
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold drop-shadow-lg">
              {titleText}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
