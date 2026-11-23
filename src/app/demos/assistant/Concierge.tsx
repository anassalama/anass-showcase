"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

const SUGGESTIONS = [
  "How do I get from the airport?",
  "Combien coûte le hammam ?",
  "واش عندكم غرفة للعائلة؟",
];

const isArabic = (s: string) => /[؀-ۿ]/.test(s);

export function Concierge() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/concierge" }),
  });
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t.slice(0, 600) });
    setInput("");
  }

  return (
    <section className="flex h-[560px] flex-col overflow-hidden rounded-3xl border border-[#e7d6bf] bg-white shadow-xl">
      <div className="flex items-center gap-3 border-b border-[#f0e4d3] px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#b5652b] font-serif text-white">Y</div>
        <div>
          <p className="font-medium text-[#3b2417]">Riad Yasmine concierge</p>
          <p className="text-xs text-emerald-700">● Online · EN / FR / عربية</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <div className="pt-6 text-center">
            <p className="text-sm text-[#6b4f3c]">Try one of these:</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  dir={isArabic(s) ? "rtl" : "ltr"}
                  className="rounded-full border border-[#e7d6bf] px-3 py-1.5 text-sm hover:bg-[#fbf6ee]"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => {
          const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
          const mine = m.role === "user";
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <p
                dir={isArabic(text) ? "rtl" : "ltr"}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                  mine ? "bg-[#3b2417] text-white" : "bg-[#fbf6ee] text-[#3b2417]"
                }`}
              >
                {text}
              </p>
            </div>
          );
        })}
        {status === "submitted" && <p className="text-sm text-[#6b4f3c]">Typing…</p>}
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
            The assistant is busy right now - please try again in a minute.
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form
        className="flex gap-2 border-t border-[#f0e4d3] p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          dir={isArabic(input) ? "rtl" : "ltr"}
          maxLength={600}
          placeholder="Ask anything… / اسأل…"
          className="flex-1 rounded-full border border-[#e7d6bf] px-4 py-2.5 text-sm outline-none focus:border-[#b5652b]"
        />
        <button
          disabled={busy || !input.trim()}
          className="rounded-full bg-[#b5652b] px-5 text-sm font-medium text-white disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </section>
  );
}
