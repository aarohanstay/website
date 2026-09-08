---
name: ai-concierge-integration
description: Integration rules, Vercel AI SDK usage, streaming responses, and function calling for the Hotel AI Concierge.
---

# AI Concierge Integration Skill

Use this skill when building or expanding AI features, assistant widgets, API routes, tool definitions, or prompt instructions in this repository.

## Tech Stack & Architecture
- **Framework**: Vercel AI SDK (`ai` package) with `@ai-sdk/google` (Google Gemini 2.5/1.5 Flash or Pro).
- **Endpoint**: `/api/chat` (Next.js App Router Route Handler).
- **UI Component**: `components/ai-concierge.tsx` (Client component using `useChat` hook or custom stream reader).

## System Prompt Guidelines
The AI Assistant acts as **Aura**, the lead AI Luxury Concierge for Grand Horizon Hotel & Resort.
- **Tone**: Warm, refined, attentive, hospitable, and knowledgeable.
- **Goal**: Help guests explore suites, recommend dining experiences, calculate room availability, and assist with reservation inquiries.
- **Formatting**: Use markdown bullets, clean spacing, and clear price tags when recommending rooms.

## Tool Calling & Functions
Define tools in `lib/ai-tools.ts` using standard schemas:
1. `searchRooms({ guests, maxPrice, view })`: Filter available rooms matching guest criteria.
2. `getAmenities({ category })`: List hotel services (Spa, Dining, Pools, Excursions).
3. `calculateBookingQuote({ roomId, checkIn, checkOut, guests })`: Calculate total price including taxes and add-ons.

## Fallback & Graceful Degradation
If `process.env.GOOGLE_GENERATIVE_AI_API_KEY` is not defined:
- The route handler `/api/chat` returns an intelligent simulated response stream based on the user's intent (e.g. room query, dining, spa).
- This ensures zero downtime for local testing and client demos!
