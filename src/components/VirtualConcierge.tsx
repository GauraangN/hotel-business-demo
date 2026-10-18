"use client";

import React, { useState } from "react";
import { Sparkles, MessageSquare, X, Send, Clock, Phone, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  sender: "butler" | "guest";
  text: string;
  time: string;
}

export function VirtualConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "butler",
      text: "Good afternoon. Welcome to The Luminary Hotel & Residences. I am Arthur, your personal digital concierge. How may I assist your stay or reservation today?",
      time: "Just now",
    },
  ]);

  const quickQuestions = [
    "Michelin dining hours?",
    "Book a Rolls-Royce transfer",
    "What are checkout times?",
    "Private spa access",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const guestMsg: Message = {
      sender: "guest",
      text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, guestMsg]);
    if (!textToSend) setInputMessage("");

    // Automated smart concierge responses
    setTimeout(() => {
      let reply = "Our head concierge has received your note and will coordinate with our team immediately.";
      const lower = text.toLowerCase();

      if (lower.includes("dining") || lower.includes("michelin") || lower.includes("aura")) {
        reply = "Aura Sky Dining (3 Michelin Stars) is located on the 55th floor. Dinner service runs from 6:00 PM to 11:30 PM. Suite guests receive guaranteed priority table seating.";
      } else if (lower.includes("rolls") || lower.includes("transfer") || lower.includes("airport")) {
        reply = "Complimentary private Rolls-Royce Phantom transfers are included with all Penthouse & Ambassador suites. For other suites, transfers can be booked for $250. Would you like us to schedule a chauffeur greeting?";
      } else if (lower.includes("checkout") || lower.includes("checkin") || lower.includes("time")) {
        reply = "Standard check-in is 3:00 PM and check-out is 12:00 PM. Direct website reservations enjoy guaranteed complimentary late check-out until 2:00 PM.";
      } else if (lower.includes("spa") || lower.includes("pool")) {
        reply = "Our Hydro-Thermal Spa and heated rooftop infinity pool on the 54th floor are open daily from 6:00 AM to 10:00 PM. Private cabanas can be reserved via the concierge.";
      }

      const butlerMsg: Message = {
        sender: "butler",
        text: reply,
        time: "Just now",
      };
      setMessages((prev) => [...prev, butlerMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/80 hover:to-amber-900/90 text-white px-5 py-3.5 rounded-full border border-amber-400/40 shadow-2xl hover:shadow-amber-500/20 backdrop-blur-xl transition-all duration-300 hover:scale-105"
            aria-label="Open Concierge Chat"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-serif font-bold text-xs shadow-md">
                <Sparkles className="w-4 h-4 text-slate-950" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                VIP Butler & Concierge
              </div>
              <div className="text-[10px] text-amber-400/80">
                Online • Instant Assistance
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Concierge Chat Dialog Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] sm:max-w-[420px] glass-panel-gold rounded-3xl border border-amber-400/30 shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-slate-950/90 border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                AL
              </div>
              <div>
                <div className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                  <span>Arthur Laurent</span>
                  <span className="text-[10px] text-amber-300 bg-amber-500/20 border border-amber-400/30 px-1.5 py-0.2 rounded font-sans">
                    Head Butler
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>The Luminary Concierge Desk</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-950/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === "guest" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    m.sender === "guest"
                      ? "bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md"
                      : "bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2.5 bg-slate-950/90 border-t border-white/5 flex gap-1.5 overflow-x-auto">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 px-2.5 py-1 rounded-full text-[11px] transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-950 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask your butler anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
              <Button
                type="submit"
                size="sm"
                className="h-9 w-9 p-0 rounded-xl flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
