"use client";

import { useState, useEffect } from "react";

const AI_INSIGHTS = [
  "Welcome to Aarohan Retreat — Tirthan Valley's premier luxury riverside sanctuary along the rushing waters of Tirthan River.",
  "Wake up to soothing river soundscapes, private water-view balconies, organic apple orchards & fresh wood-grilled trout dining.",
  "Enjoy 25% OFF on Family Cedar Suite & Deluxe Alpine Haven with 24/7 AI Butler assistance for river treks, bonfires & SUV pickups.",
];

export function AITypingSubtitle() {
  const [insightIndex, setInsightIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let charIndex = 0;
    const currentFullText = AI_INSIGHTS[insightIndex];

    const typingInterval = setInterval(() => {
      if (charIndex <= currentFullText.length) {
        setDisplayedText(currentFullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        setTimeout(() => {
          setInsightIndex((prev) => (prev + 1) % AI_INSIGHTS.length);
          setDisplayedText("");
          setIsTyping(true);
        }, 3500);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, [insightIndex]);

  return (
    <div className="flex min-h-[3.5rem] items-center justify-center text-center">
      <p className="max-w-2xl text-base text-slate-300 md:text-lg">
        {displayedText}
        {isTyping && <span className="animate-pulse text-emerald-400">|</span>}
      </p>
    </div>
  );
}
