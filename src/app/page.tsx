import Link from "next/link";

const demos = [
  {
    href: "/demos/wellness",
    tag: "Landing page · Next.js · Tailwind",
    title: "Halo Botanics",
    text: "A brand landing page for a wellness company: hero, product story, ingredients, reviews and a newsletter sign-up. Fully responsive, built from a one-page brand outline.",
  },
  {
    href: "/demos/store",
    tag: "E-commerce · Cart & checkout",
    title: "Atlas Leather",
    text: "A storefront with product variants, a slide-out cart, quantity updates, totals and a validated checkout form - the same flows I fix on WooCommerce stores.",
  },
  {
    href: "/demos/advisory",
    tag: "Bilingual · English / Arabic RTL",
    title: "Meridian Advisory",
    text: "A premium lead-magnet landing page with a one-click English/Arabic switch: full right-to-left layout, Arabic typography and a validated opt-in form.",
  },
  {
    href: "/demos/assistant",
    tag: "AI integration · Arabic / English",
    title: "Riad Concierge",
    text: "An AI assistant for a guesthouse that answers guests in English or Arabic (with right-to-left layout). The API key stays on the server and usage is rate-limited.",
  },
];

const projects = [
  {
    href: "https://github.com/anassalama/Fitness-CRM",
    title: "Fitness CRM",
    text: "Google Sheets + Apps Script CRM: leads, memberships, trainer scheduling, reminders and a live dashboard.",
  },
  {
    href: "https://github.com/anassalama/Employee-Profile-App",
    title: "Employee Profile App",
    text: "Vue.js + Vuetify web app served by Apps Script, reading employee profiles from a spreadsheet.",
  },
  {
    href: "https://github.com/anassalama/Export-Gmail-Threads-as-PDFs",
    title: "Gmail to PDF Exporter",
    text: "Searches Gmail threads and saves them as PDFs to Google Drive automatically.",
  },
  {
    href: "https://github.com/anassalama/Personal-Time-Tracker",
    title: "Personal Time Tracker",
    text: "Start/stop task timers in Google Sheets with automatic email summary reports.",
  },
];

const services = [
  ["WordPress & WooCommerce", "Bug fixes, checkout issues, theme tweaks, speed, migrations"],
  ["Next.js / React", "Landing pages, dashboards, Figma-to-code"],
  ["AI features", "Chatbots and AI tools added safely to your site"],
  ["Google Apps Script", "Sheets, Gmail and Drive automations"],
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-24">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-emerald-700">Anass S. · Full stack developer · Morocco (UTC+1)</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
          Websites fixed, built and shipped fast, at a fixed price.
        </h1>
        <p className="mt-5 text-lg text-stone-600">
          I build with Next.js, React and WordPress, and I use AI coding tools like Claude Code to
          deliver in days what usually takes weeks. Every change is reviewed and tested before it
          reaches you. English, French and Arabic.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://github.com/anassalama"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
          >
            GitHub
          </a>
          <a
            href="#demos"
            className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium hover:bg-white"
          >
            See demos
          </a>
        </div>
      </header>

      <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-stone-200 bg-white p-5">
            <h3 className="font-medium">{title}</h3>
            <p className="mt-1 text-sm text-stone-600">{text}</p>
          </div>
        ))}
      </section>

      <section id="demos" className="mt-20">
        <h2 className="font-serif text-3xl">Live demos</h2>
        <p className="mt-2 text-stone-600">Click through them - they work.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-emerald-700">{d.tag}</span>
              <h3 className="mt-3 font-serif text-2xl">{d.title}</h3>
              <p className="mt-2 flex-1 text-sm text-stone-600">{d.text}</p>
              <span className="mt-5 text-sm font-medium group-hover:underline">Open demo →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-serif text-3xl">Open-source projects</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-400"
            >
              <h3 className="font-medium">{p.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{p.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl bg-stone-900 p-8 text-stone-100 sm:p-12">
        <h2 className="font-serif text-3xl">How I work</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          <li>
            <p className="font-medium text-white">1. Send the details in writing</p>
            <p className="mt-1 text-sm text-stone-400">A URL, a list of issues, a Figma file - whatever you have.</p>
          </li>
          <li>
            <p className="font-medium text-white">2. Get a plan and a fixed price</p>
            <p className="mt-1 text-sm text-stone-400">Clear milestones. You pay for results, not hours.</p>
          </li>
          <li>
            <p className="font-medium text-white">3. Review on a live preview</p>
            <p className="mt-1 text-sm text-stone-400">Written updates, same-day revisions, no mandatory calls.</p>
          </li>
        </ol>
      </section>

      <footer className="mt-16 text-sm text-stone-500">Hire me on Upwork · © 2026 Anass S.</footer>
    </main>
  );
}
