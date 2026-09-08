import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeaturedRooms } from "@/components/featured-rooms";
import { MediaGallery } from "@/components/media-gallery";
import { PropertyMap } from "@/components/property-map";
import { Amenities } from "@/components/amenities";
import { AIConciergeWidget } from "@/components/ai-concierge";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedRooms />
        <MediaGallery />
        <PropertyMap />
        <Amenities />
        <AIConciergeWidget />
      </main>
      <Footer />
    </div>
  );
}
