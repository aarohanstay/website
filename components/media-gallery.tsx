"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Sparkles, X, Image as ImageIcon, Video } from "lucide-react";
import { MEDIA_GALLERY, MediaItem } from "@/lib/hotel-data";

export function MediaGallery() {
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "videos">("all");
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const filteredMedia = MEDIA_GALLERY.filter((item) => {
    if (activeTab === "photos") return item.type === "photo";
    if (activeTab === "videos") return item.type === "video";
    return true;
  });

  return (
    <section id="gallery" className="py-24 relative bg-[#090a0f] border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Resort Media Tour
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              Real Photos & Video Walkthroughs
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 md:mt-0 flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "glass-card text-slate-300 hover:text-white"
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "photos"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "glass-card text-slate-300 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Photos ({MEDIA_GALLERY.filter((m) => m.type === "photo").length})
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "videos"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "glass-card text-slate-300 hover:text-white"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Videos ({MEDIA_GALLERY.filter((m) => m.type === "video").length})
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 relative h-64 cursor-pointer"
            >
              {item.type === "photo" ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={item.poster || "/real/photo1.jpg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Video Overlay Play Icon */}
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-slate-950 ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay Gradient & Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/30">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-slate-300 hover:text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Content */}
            <div className="relative w-full h-[65vh] bg-black flex items-center justify-center">
              {activeMedia.type === "photo" ? (
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <video
                  src={activeMedia.src}
                  controls
                  autoPlay
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{activeMedia.title}</span>
              <span className="text-xs text-amber-400 font-medium">Tirthan Valley Alpine Retreat</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
