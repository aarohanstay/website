---
name: nextjs-app-router
description: Next.js 16 and React 19 App Router architecture guidelines, server/client boundaries, and performance patterns.
---

# Next.js 16 App Router Skill

Use this skill when adding routes, layouts, server actions, or performance optimizations to the Next.js codebase.

## Core Rules

1. **Server-First Mindset**:
   - Keep page containers, layout wrappers, and static content as Server Components.
   - Only add `"use client"` directive at the top of small, dedicated interactive sub-components (e.g., dynamic search filter, floating chat widget, modal drawer).

2. **Font & Image Optimization**:
   - Use Next.js `Image` with standard width/height attributes or `fill` with `sizes`.
   - Use `next/font` for Google Fonts loading with zero layout shift.

3. **Styling & CSS Utilities**:
   - Utilize `@tailwindcss/postcss` v4 directives in `app/globals.css`.
   - Maintain dark mode compatibility using Tailwind `dark:` variants and semantic color variables.

4. **Security & Environment Variables**:
   - Keep API secrets (`GOOGLE_GENERATIVE_AI_API_KEY`, `OPENAI_API_KEY`) on the server side (`app/api/chat/route.ts`).
   - Only prefix with `NEXT_PUBLIC_` variables that are safe to expose to the browser bundle.
