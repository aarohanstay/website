export interface Room {
  id: string;
  name: string;
  category: 'Family Room' | 'Deluxe Room';
  originalPriceNightly: number;
  priceNightly: number;
  discountBadge: string;
  maxGuests: number;
  sizeSqFt: number;
  bedConfig: string;
  view: string;
  description: string;
  image: string;
  featured: boolean;
  amenities: string[];
}

export interface Amenity {
  id: string;
  title: string;
  category: 'Wellness' | 'Dining' | 'Adventure' | 'Services';
  description: string;
  image: string;
  iconName: string;
}

export interface DiningOption {
  id: string;
  name: string;
  cuisine: string;
  chef: string;
  specialty: string;
  description: string;
  hours: string;
  image: string;
  highlights: string[];
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  src: string;
  poster?: string;
}

export const HOTEL_INFO = {
  company: "Aarohan Hospitality",
  name: "Aarohan Resort Tirthan Valley",
  location: "Tirthan Valley, Himachal Pradesh",
  coordinates: {
    lat: 31.641605,
    lng: 77.413565,
  },
  mapsUrl: "https://maps.app.goo.gl/cWP9CmzfeRyxdGfX7",
  tagline: "Flowing Water, Pristine Riverside Sanctuary",
  description: "Experience luxury riverfront living on the banks of the crystal-clear Tirthan River. Step directly onto private wooden balconies with uninterrupted river stream views, wood-burning hearths, fresh trout dining, and 24/7 AI-guided mountain butler services.",
  address: "Badi Ropa, Tirthan Valley, District Kullu, Himachal Pradesh - 175122",
  rating: 4.98,
  reviewsCount: 320,
  phone: "+91 91093 22140",
  email: "info@aarohanhospitality.com",
};

export const ROOMS: Room[] = [
  {
    id: "family-cedar-suite",
    name: "Family Cedar Suite",
    category: "Family Room",
    originalPriceNightly: 10000,
    priceNightly: 7500,
    discountBadge: "25% OFF SPECIAL",
    maxGuests: 4,
    sizeSqFt: 1100,
    bedConfig: "2 Queen Wooden Canopy Beds",
    view: "Direct Tirthan River Stream & Cedar Forest",
    description: "Spacious riverfront Himalayan wooden suite crafted for families up to 4 members. Wake up to the soothing melodies of the rushing Tirthan river, step onto your private stone balcony over the water, and relax by the wood-burning hearth.",
    image: "/real/photo1.jpg",
    featured: true,
    amenities: ["Fits up to 4 Guests", "Private Riverfront Balcony", "Rushing Stream Views", "Stone Wood Hearth", "High-Speed Wi-Fi", "Free Breakfast", "Personal Mountain Butler"],
  },
  {
    id: "deluxe-alpine-haven",
    name: "Deluxe Alpine Haven",
    category: "Deluxe Room",
    originalPriceNightly: 5000,
    priceNightly: 3750,
    discountBadge: "25% OFF SPECIAL",
    maxGuests: 2,
    sizeSqFt: 650,
    bedConfig: "1 Plush King Wooden Bed",
    view: "Riverside Valley & Pine Forest",
    description: "Intimate riverfront retreat designed for couples & solo travelers. Blends warm deodar timber textures with a private river view veranda, soothing water soundscapes, and deep soaking bath.",
    image: "/real/photo4.jpg",
    featured: true,
    amenities: ["Fits up to 2 Guests", "Private Riverside Veranda", "River Soundscape", "King Cedar Bed", "High-Speed Wi-Fi", "Artisanal Herbal Tea Bar", "Bonfire Access"],
  },
];

export const AMENITIES: Amenity[] = [
  {
    id: "deodar-herbal-spa",
    title: "Deodar Cedar Spa & Riverside Hot Baths",
    category: "Wellness",
    description: "Himalayan herb-infused steam therapies and warm pine soaking tubs positioned right along the soothing rushing waters of Tirthan River.",
    image: "/real/photo3.jpg",
    iconName: "Sparkles",
  },
  {
    id: "trout-farm-dining",
    title: "Fresh Tirthan River Trout & Riverside Dining",
    category: "Dining",
    description: "Relish freshly caught Himalayan Rainbow Trout grilled over pine wood right at our resort bank, paired with organic valley produce and Siddu delicacies.",
    image: "/real/photo5.jpg",
    iconName: "Utensils",
  },
  {
    id: "ai-mountain-concierge",
    title: '24/7 AI Riverside Butler ("Aura")',
    category: "Services",
    description: "Instant assistance for weather updates, Great Himalayan National Park trek permits, riverfront bonfire arrangements, and local sightseeing.",
    image: "/real/photo1.jpg",
    iconName: "Bot",
  },
  {
    id: "unesco-park-treks",
    title: "Great Himalayan Park & Riverfront Treks",
    category: "Adventure",
    description: "Guided day treks along pristine riverbanks to Chhoie Waterfall, Jalori Pass, Serolsar Lake, and private fly-fishing excursions on trout streams.",
    image: "/real/photo6.jpg",
    iconName: "Compass",
  },
];

export const DINING_OPTIONS: DiningOption[] = [
  {
    id: "tirthan-trout-hearth",
    name: "Riverside Rainbow Trout & Wood-Fired Hearth",
    cuisine: "River Catch & Pine-Wood Grill",
    chef: "Executive Chef Sanjeev Thakur",
    specialty: "Pan-Seared Rainbow Trout with Himalayan Herbs",
    description: "Savor river-to-plate Rainbow Trout caught right at our resort bank, wood-grilled over aged pine hearths as you listen to the flowing Tirthan waters.",
    hours: "12:30 PM - 10:30 PM",
    image: "/real/photo5.jpg",
    highlights: ["Fresh River Catch", "Pine Wood Fire Hearth", "Organic Herb Rub"],
  },
  {
    id: "authentic-siddu-lounge",
    name: "Authentic Himachali Siddu & Pahadi Lounge",
    cuisine: "Traditional Himachali Heritage",
    chef: "Sous Chef Devender Sharma",
    specialty: "Poppy Seed Steamed Siddu & Desi Ghee Drizzle",
    description: "Experience authentic Pahadi flavors featuring steamed wheat Siddu stuffed with poppy seeds, walnuts, drizzled with warm cultured ghee and Chana Madra by the river.",
    hours: "8:00 AM - 9:30 PM",
    image: "/real/photo2.jpg",
    highlights: ["Traditional Siddu", "Cultured Mountain Ghee", "Walnut Chutney"],
  },
  {
    id: "riverside-bonfire-deck",
    name: "Riverside Bonfire & Spiced Cocoa Deck",
    cuisine: "Artisanal Beverages & Mountain Bakes",
    chef: "Pastry Chef Ananya Verma",
    specialty: "Wood-Fired Cocoa & Apple Cinnamon Crusts",
    description: "Unwind under Himalayan starlit skies at our exclusive riverfront bonfire deck right on the water's edge. Enjoy hot spiced cocoa, organic orchard apple crumbles, and acoustic mountain music.",
    hours: "5:00 PM - 11:00 PM",
    image: "/real/photo1.jpg",
    highlights: ["Riverfront Firepits", "Spiced Mountain Cocoa", "Starlit Acoustic Ambiance"],
  },
];

export const MEDIA_GALLERY: MediaItem[] = [
  { id: "v1", type: "video", title: "Aarohan Tirthan River & Resort Walkthrough", src: "/real/video1.MOV", poster: "/real/photo1.jpg" },
  { id: "v2", type: "video", title: "Tirthan River Stream & Mountain Valley View", src: "/real/video2.MOV", poster: "/real/photo2.jpg" },
  { id: "v3", type: "video", title: "Riverside Wooden Chalets & Nature Ambience", src: "/real/video3.MOV", poster: "/real/photo5.jpg" },
  { id: "p1", type: "photo", title: "Night View of Riverside Chalets & Riverbank", src: "/real/photo1.jpg" },
  { id: "p2", type: "photo", title: "Golden Sunset over Tirthan River Valley", src: "/real/photo2.jpg" },
  { id: "p3", type: "photo", title: "Twilight Dusk Mountain Valley & Resort", src: "/real/photo3.jpg" },
  { id: "p4", type: "photo", title: "A-Frame Wooden Chalet Architecture & Veranda", src: "/real/photo4.jpg" },
  { id: "p5", type: "photo", title: "Daytime Riverfront Cottages & Rushing Stream", src: "/real/photo5.jpg" },
  { id: "p6", type: "photo", title: "Himalayan Pine Forest & Alpine Valley Slopes", src: "/real/photo6.jpg" },
];
