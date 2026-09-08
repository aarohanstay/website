---
name: hotel-domain
description: Business logic, room categories, pricing calculations, and reservation data models for the Hotel Web App.
---

# Hotel Domain Agent Skill

Use this skill when modifying, querying, or expanding hotel room data, booking flows, amenity packages, and guest management logic in the application.

## Room Categories & Attributes
1. **Presidential Ocean Suite**:
   - Max Occupancy: 4 guests (2 King Beds)
   - Size: 1,800 sq ft
   - Highlights: Ocean view, private infinity plunge pool, personal butler service.
2. **Royal Penthouse**:
   - Max Occupancy: 6 guests (3 King Beds)
   - Size: 2,500 sq ft
   - Highlights: Panoramic skyline view, private terrace, grand piano, jacuzzi.
3. **Deluxe Horizon King**:
   - Max Occupancy: 2 guests (1 King Bed)
   - Size: 650 sq ft
   - Highlights: Floor-to-ceiling city/ocean windows, marble bath, espresso bar.
4. **Garden Villa**:
   - Max Occupancy: 4 guests (2 Queen Beds)
   - Size: 1,200 sq ft
   - Highlights: Private tropical garden courtyard, outdoor rain shower, hammock deck.

## Dynamic Pricing & Taxes Logic
- **Base Rate**: Nightly room rate defined in `lib/hotel-data.ts`.
- **Taxes & Service Fees**: 12% Resort Tax + 5% Service Charge.
- **Seasonal Multipliers**:
  - Peak Season (Nov - Feb): +25%
  - Summer Special (Jun - Aug): -15%
- **Add-on Services**:
  - Airport SUV Transfer: $150
  - Spa Package (Couples Massage & Sauna): $320
  - Gourmet Breakfast Buffet: $45 per guest/day

## Validation Rules
- `checkIn` date must be equal to or after current date.
- `checkOut` date must be at least 1 day after `checkIn`.
- Number of guests cannot exceed `maxGuests` for the selected room type.
