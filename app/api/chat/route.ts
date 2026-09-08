import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { AI_CONCIERGE_SYSTEM_PROMPT, searchRooms } from '@/lib/ai-tools';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages && messages.length > 0 ? messages[messages.length - 1].content : '';
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: AI_CONCIERGE_SYSTEM_PROMPT,
        messages,
      });

      return result.toDataStreamResponse();
    }

    return generateFallbackStream(lastUserMessage);
  } catch (error) {
    console.error('API /api/chat error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process AI Concierge request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function generateFallbackStream(query: string): Response {
  const queryLower = query.toLowerCase();
  let responseText = '';

  if (queryLower.includes('room') || queryLower.includes('chalet') || queryLower.includes('cottage') || queryLower.includes('suite') || queryLower.includes('price')) {
    responseText = `Warm mountain greetings! I am **Aura**, your AI Concierge at **Tirthan Alpine Resort & Sanctuary**, Tirthan Valley, Himachal Pradesh. 🏔️✨

Here are our most requested Himalayan chalets & cottages:

- 🪵 **Royal Cedar Riverside Chalet**: ₹12,500/night — Aromatic deodar timber, stone fireplace, private heated balcony jacuzzi over Tirthan River.
- 🏔️ **Himalayan Skyline Suite**: ₹18,500/night — 360° Great Himalayan National Park views, private fire pit, and personal mountain butler.
- 🍏 **Riverfront Orchard Cottage**: ₹8,900/night — Steps from the river, surrounded by organic apple trees with a wood-burning stove.

Would you like me to calculate a custom stay quote or arrange Bhuntar (Kullu) Airport SUV transfer for your dates?`;
  } else if (queryLower.includes('food') || queryLower.includes('trout') || queryLower.includes('dine') || queryLower.includes('eat') || queryLower.includes('restaurant')) {
    responseText = `Delighted to share our alpine culinary experiences! 🐟🔥

At Tirthan Alpine Resort, dining is deeply rooted in Himachali traditions & fresh mountain harvests:

1. 🐟 **The Cedar Hearth & Trout Lounge**: Freshly caught Tirthan Rainbow Trout pan-seared over pine wood, authentic Siddu, and wood-fired stone pizzas.
2. 🍏 **Orchard Canopy Tea Pavilion**: Fresh apple pies baked daily from our orchard, artisanal Kangra teas, and hot spiced cocoa.

May I reserve a cozy hearth-side table for your evening?`;
  } else if (queryLower.includes('trek') || queryLower.includes('activity') || queryLower.includes('fish') || queryLower.includes('park') || queryLower.includes('hike')) {
    responseText = `Tirthan Valley is a paradise for nature lovers & trekkers! 🌲⛰️

Our top curated mountain activities include:
- **Great Himalayan National Park Trek**: Guided day hikes to Chhoie Waterfall & Rolla.
- **Tirthan River Fly-Fishing**: Catch-and-release rainbow trout angling with expert river guides.
- **Jalori Pass & Serolsar Lake Tour**: Scenic 360° snow peak excursion (3,120 meters altitude).
- **Evening Stargazing & Bonfire**: Live Himachali folk acoustic music by the river.

Would you like me to reserve a certified trek guide or fishing permit for your stay?`;
  } else {
    responseText = `Namaste! I am **Aura**, your dedicated AI Mountain Butler at **Tirthan Alpine Resort & Sanctuary**, Himachal Pradesh. 🏔️🍃

I am at your service to curate your Himalayan retreat:
- 🪵 Explore Cedar Chalets & Riverside Cottages
- 🐟 Reserve Fresh Tirthan Trout Dining & Bonfires
- ⛰️ Plan Great Himalayan National Park Treks & Jalori Pass Tours
- 🚗 Arrange SUV Transfers from Kullu/Chandigarh

How may I make your mountain stay unforgettable today?`;
  }

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      const chunks = responseText.split(' ');
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk + ' ')}\n`));
        await new Promise((r) => setTimeout(r, 40));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Vercel-AI-Data-Stream': 'v1',
    },
  });
}
