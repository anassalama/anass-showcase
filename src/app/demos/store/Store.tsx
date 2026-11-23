"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  colors: { name: string; swatch: string }[];
  sizes?: string[];
};

const PRODUCTS: Product[] = [
  {
    id: "tote",
    name: "Medina Tote",
    price: 129,
    colors: [
      { name: "Cognac", swatch: "bg-amber-700" },
      { name: "Black", swatch: "bg-stone-900" },
      { name: "Sand", swatch: "bg-stone-300" },
    ],
  },
  {
    id: "wallet",
    name: "Slim Card Wallet",
    price: 39,
    colors: [
      { name: "Cognac", swatch: "bg-amber-700" },
      { name: "Olive", swatch: "bg-lime-800" },
    ],
  },
  {
    id: "belt",
    name: "Classic Belt",
    price: 55,
    colors: [
      { name: "Black", swatch: "bg-stone-900" },
      { name: "Cognac", swatch: "bg-amber-700" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "babouche",
    name: "Babouche Slippers",
    price: 69,
    colors: [
      { name: "Saffron", swatch: "bg-yellow-500" },
      { name: "Red", swatch: "bg-red-700" },
      { name: "Sand", swatch: "bg-stone-300" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43"],
  },
];

type Line = { key: string; productId: string; color: string; size?: string; qty: number };

const FREE_SHIPPING = 100;
const SHIPPING = 8;
const money = (n: number) => `$${n.toFixed(2)}`;

function ProductCard({ p, onAdd }: { p: Product; onAdd: (color: string, size?: string) => void }) {
  const [color, setColor] = useState(p.colors[0]);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [error, setError] = useState(false);

  return (
    <article className="flex flex-col">
      <div className={`relative aspect-[4/5] overflow-hidden rounded-xl ${color.swatch} transition-colors`}>
        <div className="absolute inset-x-10 bottom-10 top-16 rounded-2xl bg-white/15 ring-1 ring-white/20" />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-medium">{p.name}</h3>
        <span>{money(p.price)}</span>
      </div>
      <p className="text-sm text-stone-500">{color.name}</p>
      <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Color">
        {p.colors.map((c) => (
          <button
            key={c.name}
            role="radio"
            aria-checked={c.name === color.name}
            aria-label={c.name}
            onClick={() => setColor(c)}
            className={`h-6 w-6 rounded-full ${c.swatch} ring-offset-2 ${c.name === color.name ? "ring-2 ring-stone-900" : ""}`}
          />
        ))}
      </div>
      {p.sizes && (
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
          {p.sizes.map((s) => (
            <button
              key={s}
              role="radio"
              aria-checked={s === size}
              onClick={() => {
                setSize(s);
                setError(false);
              }}
              className={`min-w-9 rounded-md border px-2 py-1 text-sm ${s === size ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300"}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">Please choose a size.</p>}
      <button
        onClick={() => {
          if (p.sizes && !size) return setError(true);
          onAdd(color.name, size);
        }}
        className="mt-4 rounded-full bg-stone-900 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
      >
        Add to cart
      </button>
    </article>
  );
}

export function Store() {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.qty * PRODUCTS.find((p) => p.id === l.productId)!.price, 0),
    [lines],
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING;
  const total = subtotal + shipping;

  function add(p: Product, color: string, size?: string) {
    const key = `${p.id}-${color}-${size ?? ""}`;
    setLines((ls) =>
      ls.some((l) => l.key === key)
        ? ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
        : [...ls, { key, productId: p.id, color, size, qty: 1 }],
    );
    setStep("cart");
    setOpen(true);
  }

  function setQty(key: string, qty: number) {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? { ...l, qty } : l))));
  }

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-xl font-semibold tracking-tight">ATLAS LEATHER</span>
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-stone-300 px-4 py-2 text-sm hover:bg-stone-50"
        >
          Cart ({count})
        </button>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-6 pt-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Handmade in Fès.</h1>
        <p className="mt-3 max-w-lg text-stone-600">
          Full-grain leather goods stitched by artisan workshops. Free shipping over {money(FREE_SHIPPING)}.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={(c, s) => add(p, c, s)} />
        ))}
      </section>

      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/40" onClick={() => setOpen(false)}>
          <aside
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-semibold">
                {step === "cart" ? "Your cart" : step === "checkout" ? "Checkout" : "Order confirmed"}
              </h2>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-2xl leading-none">
                ×
              </button>
            </div>

            {step === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {lines.length === 0 && <p className="text-stone-500">Your cart is empty.</p>}
                  {lines.map((l) => {
                    const p = PRODUCTS.find((x) => x.id === l.productId)!;
                    return (
                      <div key={l.key} className="flex items-center justify-between border-b py-4">
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm text-stone-500">
                            {l.color}
                            {l.size ? ` · Size ${l.size}` : ""}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button onClick={() => setQty(l.key, l.qty - 1)} className="h-7 w-7 rounded border" aria-label="Decrease">
                              −
                            </button>
                            <span className="w-6 text-center">{l.qty}</span>
                            <button onClick={() => setQty(l.key, l.qty + 1)} className="h-7 w-7 rounded border" aria-label="Increase">
                              +
                            </button>
                            <button onClick={() => setQty(l.key, 0)} className="ml-2 text-sm text-stone-500 underline">
                              Remove
                            </button>
                          </div>
                        </div>
                        <span>{money(l.qty * p.price)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-1 border-t px-5 py-4 text-sm">
                  {subtotal > 0 && subtotal < FREE_SHIPPING && (
                    <p className="mb-2 rounded bg-amber-50 px-3 py-2 text-amber-800">
                      Add {money(FREE_SHIPPING - subtotal)} more for free shipping.
                    </p>
                  )}
                  <Row label="Subtotal" value={money(subtotal)} />
                  <Row label="Shipping" value={shipping === 0 ? "Free" : money(shipping)} />
                  <Row label="Total" value={money(total)} bold />
                  <button
                    disabled={lines.length === 0}
                    onClick={() => setStep("checkout")}
                    className="mt-3 w-full rounded-full bg-stone-900 py-3 font-medium text-white disabled:opacity-40"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}

            {step === "checkout" && (
              <Checkout
                total={total}
                onBack={() => setStep("cart")}
                onDone={() => {
                  setLines([]);
                  setStep("done");
                }}
              />
            )}

            {step === "done" && (
              <div className="flex-1 px-5 py-10 text-center">
                <p className="text-4xl">✓</p>
                <p className="mt-4 font-medium">Thank you! Your order is confirmed.</p>
                <p className="mt-1 text-sm text-stone-500">This is a demo - no payment was taken.</p>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "pt-1 text-base font-semibold" : "text-stone-600"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Checkout({ total, onBack, onDone }: { total: number; onBack: () => void; onDone: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.address.trim().length < 5) e.address = "Enter your street address";
    if (!form.city.trim()) e.city = "Enter your city";
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(form.zip)) e.zip = "Enter a valid postal code";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const field = (key: keyof typeof form, label: string, type = "text") => (
    <label className="block">
      <span className="text-sm">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        aria-invalid={!!errors[key]}
        className={`mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:border-stone-900 ${errors[key] ? "border-red-500" : "border-stone-300"}`}
      />
      {errors[key] && <span className="text-xs text-red-600">{errors[key]}</span>}
    </label>
  );

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) onDone();
      }}
    >
      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {field("name", "Full name")}
        {field("email", "Email", "email")}
        {field("address", "Address")}
        <div className="grid grid-cols-2 gap-3">
          {field("city", "City")}
          {field("zip", "Postal code")}
        </div>
      </div>
      <div className="border-t px-5 py-4">
        <button className="w-full rounded-full bg-stone-900 py-3 font-medium text-white">Place order · {money(total)}</button>
        <button type="button" onClick={onBack} className="mt-2 w-full text-sm text-stone-500 underline">
          Back to cart
        </button>
      </div>
    </form>
  );
}
