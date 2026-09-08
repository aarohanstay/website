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
  name: "Aarohan Retreat Tirthan Valley",
  location: "Tirthan Valley, Himachal Pradesh",
  coordinates: {
    lat: 31.632222,
    lng: 77.434714,
  },
  mapsUrl: "https://maps.app.goo.gl/a1acNKVf1d87fNbm6",
  tagline: "Flowing Waters, Himalayan Haven",
  description: "Experience serene hill station living along the rushing waters of Tirthan River. Featuring authentic wooden chalets, organic apple orchards, bonfires, and 24/7 AI-guided mountain butler services by Aarohan Hospitality.",
  address: "Gushaini Road, Tirthan Valley, District Kullu, Himachal Pradesh - 175123",
  rating: 4.98,
  reviewsCount: 320,
  phone: "+91 91093 22140",
  email: "stay@aarohan.com",
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
    view: "Tirthan River Stream & Cedar Forest",
    description: "Spacious Himalayan wooden suite crafted for families up to 4 members. Features twin plush queen beds, private stone balcony overlooking the river, wood-burning hearth, and room service.",
    image: "/photos_videos/photo_01.jpg",
    featured: true,
    amenities: ["Fits up to 4 Guests", "Private River Balcony", "Stone Wood Hearth", "High-Speed Wi-Fi", "Free Breakfast", "Personal Mountain Butler"],
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
    view: "Pine Forest & Mountain Valley",
    description: "Intimate mountain room designed for couples & solo travelers up to 2 persons. Blends warm deodar timber textures with a private mountain view veranda and deep soaking bath.",
    image: "/photos_videos/photo_05.jpg",
    featured: true,
    amenities: ["Fits up to 2 Guests", "Private Mountain Veranda", "King Cedar Bed", "High-Speed Wi-Fi", "Artisanal Herbal Tea Bar", "Bonfire Access"],
  },
];

export const AMENITIES: Amenity[] = [
  {
    id: "deodar-herbal-spa",
    title: "Deodar Cedar Spa & Hot Baths",
    category: "Wellness",
    description: "Himalayan herb-infused steam therapies and warm pine soaking tubs surrounded by lush mountain greenery.",
    image: "/photos_videos/photo_03.jpg",
    iconName: "Sparkles",
  },
  {
    id: "trout-farm-dining",
    title: "Fresh Tirthan River Trout & Himachali Cuisine",
    category: "Dining",
    description: "Relish freshly caught Himalayan Rainbow Trout grilled over pine wood, paired with organic valley produce and Siddu delicacies.",
    image: "/photos_videos/photo_06.jpg",
    iconName: "Utensils",
  },
  {
    id: "ai-mountain-concierge",
    title: '24/7 AI Mountain Butler ("Aura")',
    category: "Services",
    description: "Instant assistance for weather updates, Great Himalayan National Park trek permits, bonfire arrangements, and local sightseeing.",
    image: "/photos_videos/photo_07.jpg",
    iconName: "Bot",
  },
  {
    id: "unesco-park-treks",
    title: "Great Himalayan National Park & River Treks",
    category: "Adventure",
    description: "Guided day treks to Chhoie Waterfall, Jalori Pass, Serolsar Lake, and fly-fishing excursions along pristine trout streams.",
    image: "/photos_videos/photo_09.jpg",
    iconName: "Compass",
  },
];

export const DINING_OPTIONS: DiningOption[] = [
  {
    id: "tirthan-trout-hearth",
    name: "Tirthan Rainbow Trout & Wood-Fired Hearth",
    cuisine: "River Catch & Pine-Wood Grill",
    chef: "Executive Chef Sanjeev Thakur",
    specialty: "Pan-Seared Rainbow Trout with Himalayan Herbs",
    description: "Savor river-to-plate Rainbow Trout caught fresh from Tirthan stream, wood-grilled over aged pine hearths with local mountain relishes.",
    hours: "12:30 PM - 10:30 PM",
    image: "/photos_videos/photo_06.jpg",
    highlights: ["Fresh Fly-Fishing Catch", "Pine Wood Fire Hearth", "Organic Herb Rub"],
  },
  {
    id: "authentic-siddu-lounge",
    name: "Authentic Himachali Siddu & Pahadi Lounge",
    cuisine: "Traditional Himachali Heritage",
    chef: "Sous Chef Devender Sharma",
    specialty: "Poppy Seed Steamed Siddu & Desi Ghee Drizzle",
    description: "Experience authentic Pahadi flavors featuring steamed wheat Siddu stuffed with poppy seeds, walnuts, drizzled with warm cultured ghee and Chana Madra.",
    hours: "8:00 AM - 9:30 PM",
    image: "/photos_videos/photo_11.jpg",
    highlights: ["Traditional Siddu", "Cultured Mountain Ghee", "Walnut Chutney"],
  },
  {
    id: "riverside-bonfire-deck",
    name: "Riverside Bonfire & Spiced Cocoa Deck",
    cuisine: "Artisanal Beverages & Mountain Bakes",
    chef: "Pastry Chef Ananya Verma",
    specialty: "Wood-Fired Cocoa & Apple Cinnamon Crusts",
    description: "Unwind under Himalayan starlit skies by open river bonfires. Enjoy hot spiced cocoa, organic orchard apple crumbles, and acoustic mountain music.",
    hours: "5:00 PM - 11:00 PM",
    image: "/photos_videos/photo_12.jpg",
    highlights: ["Riverfront Firepits", "Spiced Mountain Cocoa", "Starlit Acoustic Ambiance"],
  },
];

export const MEDIA_GALLERY: MediaItem[] = [
  { id: "v1", type: "video", title: "Aarohan Tirthan Video Tour & Surroundings", src: "/photos_videos/video_03.mp4", poster: "/photos_videos/photo_01.jpg" },
  { id: "v2", type: "video", title: "Tirthan River Stream & Deck View", src: "/photos_videos/video_01.mp4", poster: "/photos_videos/photo_02.jpg" },
  { id: "v3", type: "video", title: "Cozy Room Walkthrough & Fireplace", src: "/photos_videos/video_04.mp4", poster: "/photos_videos/photo_05.jpg" },
  { id: "p1", type: "photo", title: "Property Exterior & Himalayan Cedar Architecture", src: "/photos_videos/photo_01.jpg" },
  { id: "p2", type: "photo", title: "Family Cedar Suite Interior", src: "/photos_videos/photo_02.jpg" },
  { id: "p3", type: "photo", title: "Deluxe Alpine Haven Bedroom", src: "/photos_videos/photo_05.jpg" },
  { id: "p4", type: "photo", title: "Private Wooden Veranda & Mountain Views", src: "/photos_videos/photo_07.jpg" },
  { id: "p5", type: "photo", title: "Tirthan River Stream & Garden Deck", src: "/photos_videos/photo_09.jpg" },
  { id: "p6", type: "photo", title: "Evening Bonfire & Valley Sunset", src: "/photos_videos/photo_12.jpg" },
];
