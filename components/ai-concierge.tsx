"use client";

import { useState } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, User, Mountain } from "lucide-react";

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; role: "user" | "assistant"; content: string }>
  >([
    {
      id: "1",
      role: "assistant",
      content:
        "Namaste! I am Aura, your personal AI Butler at Aarohan Retreat. How may I assist you with suite bookings, dining recommendations, or UNESCO Tirthan Valley excursions today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Dynamic AI response simulation grounded in hotel data
    setTimeout(() => {
      let aiReply = "Thank you for reaching out! Our concierge team is happy to assist you with your stay at Aarohan Retreat.";
      const queryLower = currentInput.toLowerCase();

      if (queryLower.includes("price") || queryLower.includes("cost") || queryLower.includes("rate") || queryLower.includes("room")) {
        aiReply = "Our Deluxe Alpine Haven starts at ₹3,750/night (regular ₹5,000) and our Family Cedar Suite starts at ₹7,500/night (regular ₹10,000) with a 25% direct discount pre-applied. Plus, use code TIRTHAN10 for an extra 10% OFF!";
      } else if (queryLower.includes("food") || queryLower.includes("dining") || queryLower.includes("eat") || queryLower.includes("trout")) {
        aiReply = "Our Culinary Lounge offers authentic Himalayan Siddu with pure ghee, fresh pan-seared Tirthan River Trout, and evening campfire cocoa.";
      } else if (queryLower.includes("location") || queryLower.includes("map") || queryLower.includes("where")) {
        aiReply = "We are located along the pristine Tirthan River in Gushaini, Kullu, Himachal Pradesh, near the Great Himalayan National Park entrance.";
      } else if (queryLower.includes("contact") || queryLower.includes("phone") || queryLower.includes("email")) {
        aiReply = "You can call us directly at +91 91093 22140 or email stay@aarohan.com anytime.";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: aiReply },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme-Matching Gold & Frosted Glass Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Aarohan Concierge"
          className="relative group w-14 h-14 rounded-full bg-slate-950/85 backdrop-blur-xl border-2 border-amber-500/50 hover:border-amber-400 text-amber-400 shadow-[0_8px_30px_rgb(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {/* Gold Sparkle & Message Icon */}
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 fill-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>

          {/* Theme Emerald Online Pulse Badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-md" />
        </button>
      )}

      {/* AI Concierge Chat Dialog Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 ios-glass rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Mountain className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                  Aura AI Concierge
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Instant Concierge Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs text-slate-200">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-amber-400 border border-white/10"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 fill-amber-400" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md"
                      : "ios-glass-card border border-white/10 text-slate-200 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
                <Sparkles className="w-4 h-4 animate-bounce text-amber-400" />
                <span>Aura is typing response...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aura about suites, dining, treks..."
              className="flex-1 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/60"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export const AIConciergeWidget = AIConcierge;
