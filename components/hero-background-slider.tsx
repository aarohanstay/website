"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface HeroBackgroundSliderProps {
  images: string[];
  intervalMs?: number;
}

export function HeroBackgroundSlider({ images, intervalMs = 4500 }: HeroBackgroundSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      {/* Background Images Layer */}
      <div className="absolute inset-0 overflow-hidden z-0 bg-[#090a0f] pointer-events-none">
        {images.map((imgUrl, index) => {
          const isActive = index === activeIdx;

          return (
            <div
              key={imgUrl}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out pointer-events-none ${
                isActive ? "opacity-100 z-0" : "opacity-0 z-0"
              }`}
            >
              {/* Inner div maintains scale-125 when fading out to prevent any scale snapping/jumping */}
              <div
                className={`w-full h-full bg-cover bg-center pointer-events-none ${
                  isActive ? "animate-kenburns-zoomin" : "scale-125"
                }`}
                style={{ backgroundImage: `url('${imgUrl}')` }}
              />
            </div>
          );
        })}
      </div>

      {/* Glass Effect Navigation Arrows (z-30) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/80 transition-all duration-300 pointer-events-auto opacity-20 hover:opacity-100 hover:bg-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 z-30 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/80 transition-all duration-300 pointer-events-auto opacity-20 hover:opacity-100 hover:bg-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
}
