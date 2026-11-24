"use client";

import { useState } from "react";

type Lang = "en" | "ar";

const T = {
  en: {
    nav: "Meridian Advisory",
    switch: "العربية",
    eyebrow: "Free guide for insurance brokerage owners",
    title: "Grow your brokerage without growing your overheads.",
    sub: "The 7 levers top-quartile brokerages in the GCC use to lift revenue per producer by 30% or more - distilled from 120 advisory engagements.",
    bullets: [
      "A 1-page diagnostic to find where your margin leaks",
      "The pricing and retention playbook used by market leaders",
      "A 90-day plan you can start on Monday",
    ],
    formTitle: "Get the free guide",
    name: "Full name",
    email: "Work email",
    cta: "Send me the guide",
    privacy: "We respect your inbox. Unsubscribe in one click.",
    errName: "Please enter your name",
    errEmail: "Please enter a valid email",
    done: "Thank you! The guide is on its way to your inbox.",
    proof: "Trusted by leaders at",
    stats: [
      ["120+", "Engagements"],
      ["30%", "Avg. revenue lift"],
      ["6", "GCC markets"],
    ],
    quote: "Meridian gave us a clear plan within weeks. Our renewal rate went from 78% to 91% in two quarters.",
    quoteBy: "Managing Director, regional brokerage",
    footer: "© Meridian Advisory (fictional demo firm)",
  },
  ar: {
    nav: "ميريديان للاستشارات",
    switch: "English",
    eyebrow: "دليل مجاني لملاك شركات وساطة التأمين",
    title: "نمِّ شركة الوساطة دون أن تزيد تكاليفك التشغيلية.",
    sub: "الروافع السبع التي تستخدمها أفضل شركات الوساطة في الخليج لرفع الإيراد لكل وسيط بنسبة 30٪ أو أكثر، مستخلصة من 120 مشروعاً استشارياً.",
    bullets: [
      "تشخيص في صفحة واحدة لمعرفة أين تتسرب أرباحك",
      "دليل التسعير والاحتفاظ بالعملاء الذي يعتمده رواد السوق",
      "خطة عمل لمدة 90 يوماً يمكنك البدء بها فوراً",
    ],
    formTitle: "احصل على الدليل المجاني",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني للعمل",
    cta: "أرسل لي الدليل",
    privacy: "نحترم خصوصيتك. يمكنك إلغاء الاشتراك بنقرة واحدة.",
    errName: "يرجى إدخال اسمك",
    errEmail: "يرجى إدخال بريد إلكتروني صحيح",
    done: "شكراً لك! الدليل في طريقه إلى بريدك الإلكتروني.",
    proof: "يثق بنا قادة في",
    stats: [
      ["+120", "مشروعاً استشارياً"],
      ["30٪", "متوسط نمو الإيرادات"],
      ["6", "أسواق خليجية"],
    ],
    quote: "قدمت لنا ميريديان خطة واضحة خلال أسابيع، وارتفع معدل تجديد الوثائق لدينا من 78٪ إلى 91٪ خلال ربعين.",
    quoteBy: "مدير عام، شركة وساطة إقليمية",
    footer: "© ميريديان للاستشارات (شركة وهمية لأغراض العرض)",
  },
} as const;

export function Advisory() {
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
  const rtl = lang === "ar";
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (form.name.trim().length < 2) errs.name = t.errName;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = t.errEmail;
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  }

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      lang={lang}
      className={`min-h-screen bg-[#0b1f33] text-white ${rtl ? "font-[family-name:var(--font-arabic)]" : "font-sans"}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <span className={`text-lg tracking-wide ${rtl ? "font-bold" : "font-serif"}`}>{t.nav}</span>
        <button
          onClick={() => {
            setLang(rtl ? "en" : "ar");
            setErrors({});
          }}
          className="rounded-full border border-white/30 px-4 py-1.5 text-sm hover:bg-white/10"
        >
          {t.switch}
        </button>
      </nav>

      <main className="mx-auto grid max-w-6xl items-start gap-12 px-5 pb-20 pt-8 lg:grid-cols-[1.2fr_1fr]">
        <section>
          <p className="text-sm text-[#c9a45c]">{t.eyebrow}</p>
          <h1 className={`mt-4 text-4xl leading-tight sm:text-5xl ${rtl ? "font-bold leading-snug" : "font-serif"}`}>{t.title}</h1>
          <p className="mt-5 text-lg text-slate-300">{t.sub}</p>
          <ul className="mt-8 space-y-3">
            {t.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#c9a45c] text-xs text-[#0b1f33]">✓</span>
                <span className="text-slate-200">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {t.stats.map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-semibold text-[#c9a45c]">{n}</p>
                <p className="text-xs text-slate-400">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-7 text-[#0b1f33] shadow-2xl">
          <div className="mb-5 flex h-36 items-end rounded-xl bg-gradient-to-br from-[#0b1f33] to-[#1d4466] p-4">
            <div className="h-28 w-20 rounded-sm border-s-4 border-[#c9a45c] bg-white/95 p-2 text-[8px] leading-tight text-[#0b1f33] shadow-lg">
              <p className="font-bold">{rtl ? "الروافع السبع" : "The 7 Levers"}</p>
              <p className="mt-1 text-slate-500">{rtl ? "دليل 2026" : "2026 Guide"}</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold">{t.formTitle}</h2>
          {done ? (
            <p className="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-emerald-800">{t.done}</p>
          ) : (
            <form onSubmit={submit} noValidate className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm text-slate-600">{t.name}</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  className={`mt-1 w-full rounded-lg border px-3 py-2.5 outline-none focus:border-[#0b1f33] ${errors.name ? "border-red-500" : "border-slate-300"}`}
                />
                {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
              </label>
              <label className="block">
                <span className="text-sm text-slate-600">{t.email}</span>
                <input
                  type="email"
                  dir="ltr"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  className={`mt-1 w-full rounded-lg border px-3 py-2.5 outline-none focus:border-[#0b1f33] ${rtl ? "text-right" : ""} ${errors.email ? "border-red-500" : "border-slate-300"}`}
                />
                {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
              </label>
              <button className="w-full rounded-lg bg-[#c9a45c] py-3 font-semibold text-[#0b1f33] hover:bg-[#d8b56d]">{t.cta}</button>
              <p className="text-center text-xs text-slate-500">{t.privacy}</p>
            </form>
          )}
        </section>
      </main>

      <section className="border-t border-white/10 bg-[#0e2840] py-14">
        <blockquote className="mx-auto max-w-3xl px-5 text-center">
          <p className={`text-xl text-slate-100 ${rtl ? "" : "font-serif italic"}`}>&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-4 text-sm text-slate-400">{t.quoteBy}</footer>
        </blockquote>
      </section>

      <footer className="mx-auto max-w-6xl px-5 py-8 text-xs text-slate-500">{t.footer}</footer>
    </div>
  );
}
