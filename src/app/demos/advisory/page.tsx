import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { DemoBar } from "@/components/DemoBar";
import { Advisory } from "./Advisory";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = { title: "Meridian Advisory | Bilingual demo" };

export default function AdvisoryPage() {
  return (
    <div className={arabic.variable}>
      <DemoBar label="Bilingual English / Arabic (RTL) opt-in landing page (fictional firm)" />
      <Advisory />
    </div>
  );
}
