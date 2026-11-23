"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 text-center">
      <h2 className="font-serif text-4xl">Get 15% off your first order</h2>
      <p className="mt-3 text-[#4d5a4e]">Rituals, recipes and early access. No spam.</p>
      {state === "done" ? (
        <p className="mt-8 rounded-full bg-[#2d3a2e] px-6 py-3 text-[#f6f1ea]">
          You&apos;re in! Your code is HALO15.
        </p>
      ) : (
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setState("idle");
            }}
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-[#2d3a2e]/30 bg-white px-5 py-3 outline-none focus:border-[#2d3a2e]"
            aria-invalid={state === "error"}
          />
          <button className="rounded-full bg-[#2d3a2e] px-6 py-3 text-[#f6f1ea]">Subscribe</button>
        </form>
      )}
      {state === "error" && <p className="mt-2 text-sm text-red-700">Please enter a valid email.</p>}
    </section>
  );
}
