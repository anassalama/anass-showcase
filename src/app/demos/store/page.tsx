import type { Metadata } from "next";
import { DemoBar } from "@/components/DemoBar";
import { Store } from "./Store";

export const metadata: Metadata = { title: "Atlas Leather | Demo" };

export default function StorePage() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBar label="E-commerce storefront with cart & checkout (fictional shop)" />
      <Store />
    </div>
  );
}
