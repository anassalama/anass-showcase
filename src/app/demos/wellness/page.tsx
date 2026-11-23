import type { Metadata } from "next";
import { DemoBar } from "@/components/DemoBar";
import { Newsletter } from "./Newsletter";

export const metadata: Metadata = { title: "Halo Botanics | Demo" };

const products = [
  { name: "Morning Ritual Tea", note: "Tulsi, lemongrass, ginger", price: 24, color: "bg-amber-200" },
  { name: "Calm Night Drops", note: "Ashwagandha, lavender", price: 38, color: "bg-violet-200" },
  { name: "Glow Daily Powder", note: "Collagen, rosehip, vitamin C", price: 46, color: "bg-rose-200" },
];

const reviews = [
  { name: "Maya R.", text: "The tea replaced my second coffee. I sleep better and I'm not crashing at 3pm." },
  { name: "Daniel K.", text: "Clean ingredients, beautiful packaging, and it actually tastes good." },
  { name: "Sofia L.", text: "I've reordered three times. The night drops are part of my routine now." },
];

export default function Wellness() {
  return (
    <div className="bg-[#f6f1ea] text-[#2d3a2e]">
      <DemoBar label="Wellness brand landing page (fictional brand)" />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <span className="font-serif text-2xl">Halo Botanics</span>
        <div className="hidden gap-8 text-sm sm:flex">
          <a href="#shop">Shop</a>
          <a href="#story">Our story</a>
          <a href="#reviews">Reviews</a>
        </div>
        <a href="#shop" className="rounded-full bg-[#2d3a2e] px-4 py-2 text-sm text-[#f6f1ea]">
          Shop now
        </a>
      </nav>

      <header className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-10 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#7a8b5c]">Plant-based daily rituals</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl">
            Feel grounded, <em>every single day.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-[#4d5a4e]">
            Small-batch herbal blends made with organic ingredients you can pronounce. No fillers, no
            synthetic flavors, just plants that work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-[#2d3a2e] px-6 py-3 text-[#f6f1ea]">
              Find your ritual
            </a>
            <a href="#story" className="rounded-full border border-[#2d3a2e] px-6 py-3">
              Learn more
            </a>
          </div>
          <p className="mt-6 text-sm text-[#4d5a4e]">★★★★★ 4.9 from 2,300+ customers</p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#c9d4b0] via-[#e8dcc7] to-[#f0c9a9]">
          <div className="absolute left-1/2 top-1/2 h-56 w-36 -translate-x-1/2 -translate-y-1/2 rounded-t-full rounded-b-3xl bg-[#2d3a2e] shadow-2xl" />
          <div className="absolute left-1/2 top-[58%] -translate-x-1/2 rounded-full bg-[#f6f1ea] px-4 py-1 font-serif text-sm">
            halo
          </div>
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[#f6f1ea]/60 blur-sm" />
        </div>
      </header>

      <section className="bg-[#2d3a2e] py-6 text-center text-sm text-[#f6f1ea]">
        Organic · Third-party tested · Vegan · Free shipping over $50
      </section>

      <section id="shop" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-serif text-4xl">Bestsellers</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="rounded-3xl bg-white p-5">
              <div className={`aspect-[4/3] rounded-2xl ${p.color}`} />
              <h3 className="mt-5 font-serif text-xl">{p.name}</h3>
              <p className="text-sm text-[#4d5a4e]">{p.note}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg">${p.price}</span>
                <button className="rounded-full bg-[#2d3a2e] px-4 py-2 text-sm text-[#f6f1ea]">Add to bag</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
        <h2 className="font-serif text-4xl">Rooted in tradition, backed by research.</h2>
        <div className="space-y-4 text-[#4d5a4e]">
          <p>
            Halo started in a small kitchen with one goal: herbal blends that are as rigorous as they are
            comforting. Every ingredient is sourced from certified organic farms and tested by an independent lab.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            {[
              ["100%", "Organic"],
              ["0", "Fillers"],
              ["30-day", "Guarantee"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white p-4">
                <p className="font-serif text-2xl text-[#2d3a2e]">{n}</p>
                <p className="text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#e8dcc7] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-serif text-4xl">Loved by our community</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <blockquote key={r.name} className="rounded-3xl bg-[#f6f1ea] p-6">
                <p>★★★★★</p>
                <p className="mt-3">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-4 text-sm text-[#4d5a4e]">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <footer className="mx-auto max-w-6xl px-5 py-10 text-sm text-[#4d5a4e]">
        © Halo Botanics (fictional demo brand). These statements have not been evaluated by any authority.
      </footer>
    </div>
  );
}
