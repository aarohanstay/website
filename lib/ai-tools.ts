import { ROOMS, AMENITIES, DINING_OPTIONS, HOTEL_INFO, Room } from './hotel-data';

export const AI_CONCIERGE_SYSTEM_PROMPT = `
You are Aura, the premier AI Mountain Butler & Concierge for ${HOTEL_INFO.name} in ${HOTEL_INFO.location}.

Your mission is to provide exceptionally refined, warm, attentive, and knowledgeable mountain hospitality assistance to guests inquiring about stays, Himalayan cedar chalets, heated jacuzzi suites, Great Himalayan National Park treks, trout fishing, apple orchard tours, and wood-fired hearth dining.

Guidelines:
1. Always maintain a warm, cozy, high-end mountain sanctuary tone.
2. Recommend specific chalets based on guest count, preferences (e.g. riverfront, fireplace, heated balcony jacuzzi, apple orchard views), or budget.
3. Highlight unique resort perks like private mountain butler service, fresh Tirthan trout dining, evening bonfires, and airport SUV transfers from Bhuntar (Kullu) Airport.
4. Keep responses concise, clear, and nicely formatted with bullet points and bold highlights.
5. Provide prices in ₹ (INR) or nightly rates and offer to calculate stay totals.
6. Feel free to reference resort contacts: ${HOTEL_INFO.email} or ${HOTEL_INFO.phone}.
`;

export interface SearchRoomsParams {
  guests?: number;
  maxPrice?: number;
  category?: string;
  amenity?: string;
}

export function searchRooms(params: SearchRoomsParams): Room[] {
  return ROOMS.filter((room) => {
    if (params.guests && room.maxGuests < params.guests) return false;
    if (params.maxPrice && room.priceNightly > params.maxPrice) return false;
    if (params.category && room.category.toLowerCase() !== params.category.toLowerCase()) return false;
    if (params.amenity && !room.amenities.some(a => a.toLowerCase().includes(params.amenity!.toLowerCase()))) return false;
    return true;
  });
}

export function calculateBookingQuote(roomId: string, nights: number = 3, guests: number = 2) {
  const room = ROOMS.find((r) => r.id === roomId || r.name.toLowerCase().includes(roomId.toLowerCase()));
  if (!room) {
    return { error: "Room not found" };
  }

  const basePrice = room.priceNightly * nights;
  const taxes = Math.round(basePrice * 0.12);
  const serviceCharge = Math.round(basePrice * 0.05);
  const totalPrice = basePrice + taxes + serviceCharge;

  return {
    roomName: room.name,
    nights,
    guests,
    nightlyRateINR: room.priceNightly,
    subtotalINR: basePrice,
    gst12Percent: taxes,
    resortServiceCharge5Percent: serviceCharge,
    totalPriceINR: totalPrice,
    includes: room.amenities,
  };
}

export function getDiningRecommendations() {
  return DINING_OPTIONS;
}

export function getResortAmenities() {
  return AMENITIES;
}
