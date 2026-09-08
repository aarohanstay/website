<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Hotel Web Application - AI Agent Guidelines & Architecture

Welcome to the **Grand Horizon Hotel & Resort** Web Application project. This is a modern, high-performance Next.js 16+ application built with React 19, Tailwind CSS, TypeScript, and integrated AI agent capabilities using the Vercel AI SDK and Google Gemini.

## Project Structure & Conventions

```
web-app/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes (e.g. /api/chat for AI Concierge)
│   ├── favicon.ico
│   ├── globals.css       # Global design tokens, luxury typography & animations
│   ├── layout.tsx        # Root layout with providers & navigation
│   └── page.tsx          # Luxury Hotel Landing & Booking Experience
├── components/           # UI Components
│   ├── navbar.tsx        # Responsive navigation header
│   ├── hero.tsx          # Main visual banner & quick booking search
│   ├── featured-rooms.tsx# Luxury room catalog & details modal
│   ├── amenities.tsx     # Hotel amenities & experience showcase
│   ├── ai-concierge.tsx  # Floating AI Assistant widget
│   └── footer.tsx        # Footer layout
├── lib/                  # Utilities & Data
│   ├── hotel-data.ts     # Mock data for rooms, suites & amenities
│   └── ai-tools.ts       # Structured AI tools (search, booking, recommendations)
├── .gemini/skills/       # Agent Skills Directory for specialized workflows
│   ├── hotel-domain/     # Hotel business logic, room categories & pricing rules
│   ├── ai-concierge-integration/ # AI agent streaming & tool calling rules
│   └── nextjs-app-router/ # App router best practices & performance rules
└── public/               # Static assets & images
```

## Key Guidelines for AI Agents

1. **Next.js 16 & React 19 Compliance**:
   - Use Client Components (`"use client"`) only when state, event handlers, or browser APIs are required (e.g., interactive widgets, stateful modals).
   - Use Server Components by default for static layout, layout fetching, and metadata.
   - Use Next.js `Image` component with proper `alt` tags and dimensions.

2. **Design & Aesthetics**:
   - Maintain a luxury, high-end hospitality feel using deep rich tones (`zinc-950`, slate, gold/amber accents), backdrop blurs, and glassmorphism.
   - All interactive elements must have hover/active micro-interactions and accessible focus rings.

3. **In-App AI Capabilities**:
   - The AI Concierge endpoint lives at `/api/chat`.
   - Tool calling is configured in `lib/ai-tools.ts` to execute hotel availability searches, dining recommendations, and guest queries dynamically.
   - Provide non-blocking fallback handling when `GOOGLE_GENERATIVE_AI_API_KEY` is not present, ensuring a smooth demo experience.

4. **Agent Custom Skills**:
   - Consult `.gemini/skills/` when adding new domain features, expanding AI tools, or refactoring App Router pages.
