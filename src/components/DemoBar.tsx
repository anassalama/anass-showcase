import Link from "next/link";

export function DemoBar({ label }: { label: string }) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-stone-900 px-4 py-2 text-xs text-stone-300">
      <span>
        Demo project: <span className="text-white">{label}</span>
      </span>
      <Link href="/" className="font-medium text-white underline-offset-4 hover:underline">
        Back to portfolio
      </Link>
    </div>
  );
}
