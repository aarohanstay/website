import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AIConcierge } from "@/components/ai-concierge";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aarohan Hospitality | Luxury River Retreat Tirthan Valley",
  description: "Elevating Himalayan Stay Experiences along Tirthan River, Gushaini, Himachal Pradesh. Book luxury wood chalets, trout dining & UNESCO park treks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} ${cormorant.variable} scroll-smooth antialiased overflow-x-hidden max-w-full`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-[#090a0f] text-slate-100 font-sans min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden max-w-full">
        {children}
        <AIConcierge />
      </body>
    </html>
  );
}
