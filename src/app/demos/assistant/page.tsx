import type { Metadata } from "next";
import { DemoBar } from "@/components/DemoBar";
import { Concierge } from "./Concierge";

export const metadata: Metadata = { title: "Riad Concierge | Demo" };

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-[#fbf6ee]">
      <DemoBar label="AI assistant integration, English / Arabic (fictional guesthouse)" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1fr_1.1fr]">
        <section>
          <p className="text-sm uppercase tracking-[0.2em] text-[#b5652b]">Riad Yasmine · Marrakech</p>
          <h1 className="mt-3 font-serif text-5xl leading-tight text-[#3b2417]">Ask our concierge, any time.</h1>
          <p className="mt-4 text-lg text-[#6b4f3c]">
            Rooms, airport pickup, hammam, day trips - ask in English, French or Arabic and get an answer
            instantly.
          </p>
          <div className="mt-8 rounded-2xl border border-[#e7d6bf] bg-white/70 p-5 text-sm text-[#6b4f3c]">
            <p className="font-medium text-[#3b2417]">How it&apos;s built</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Next.js route handler streams answers from an AI model</li>
              <li>API key stays on the server - never exposed in the browser</li>
              <li>Business facts in the prompt so it doesn&apos;t invent prices</li>
              <li>Per-visitor rate limit and message caps to control costs</li>
              <li>Automatic right-to-left layout for Arabic messages</li>
            </ul>
          </div>
        </section>
        <Concierge />
      </div>
    </div>
  );
}
