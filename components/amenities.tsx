"use client";

import Image from "next/image";
import { Sparkles, Utensils, Bot, Compass, Star, Clock, ChefHat, Flame, Waves, Check } from "lucide-react";
import { AMENITIES, DINING_OPTIONS, Amenity } from "@/lib/hotel-data";

const ICON_MAP: Record<string, typeof Sparkles> = {
  Sparkles,
  Utensils,
  Bot,
  Compass,
};

export function Amenities() {
  return (
    <section id="amenities" className="py-24 relative bg-slate-950/90 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Resort Experiences & Amenities */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Elevated Mountain Living
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-4">
              Curated Himalayan Experiences
            </h2>
            <p className="text-slate-400 text-sm font-light">
              Immerse yourself in authentic alpine luxury — from pine wood hearth fires to private river trout dining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AMENITIES.map((item: Amenity) => {
              const IconComponent = ICON_MAP[item.iconName] || Sparkles;
              return (
                <div
                  key={item.id}
                  className="ios-glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <IconComponent className="w-3 h-3" />
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-serif font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Redesigned Luxury Himalayan Dining Section */}
        <div id="dining" className="pt-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center justify-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-400" />
              Gastronomy & Riverfront Hearth
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Authentic Himachali & Trout Culinary Lounges
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
              Indulge in wild Himalayan Rainbow Trout caught fresh from Tirthan stream, wood-grilled over pine hearths alongside authentic steamed Poppy Seed Siddu and starlit bonfire cocoa.
            </p>
          </div>

          {/* 3-Column Luxury Dining Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DINING_OPTIONS.map((dining) => (
              <div
                key={dining.id}
                className="ios-glass rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between shadow-2xl hover:scale-[1.02]"
              >
                {/* Food Image Banner */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={dining.image}
                    alt={dining.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 ios-glass-pill text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/40 uppercase tracking-wider shadow-md">
                    {dining.cuisine}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] text-amber-400 font-semibold block uppercase tracking-wider">
                      Chef Specialty
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">
                      {dining.specialty}
                    </h4>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                      {dining.name}
                    </h3>
                    <p className="text-slate-300 text-xs font-light leading-relaxed">
                      {dining.description}
                    </p>
                  </div>

                  {/* Highlights Badges */}
                  <div className="space-y-2 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {dining.highlights.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-slate-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-amber-400" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 text-amber-400 font-medium text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{dining.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                      <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-semibold">{dining.chef}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
