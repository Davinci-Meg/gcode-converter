"use client";

import { useGCodeStore } from "@/stores/useGCodeStore";

export function BuyMeCoffeeButton() {
  const fileName = useGCodeStore((s) => s.fileName);

  if (!fileName) return null;

  return (
    <a
      href="https://www.buymeacoffee.com/megumu"
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFDD00] px-4 py-2.5 font-[Cookie,cursive] text-base text-black shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
    >
      <span className="text-lg">☕</span>
      <span>Buy me a coffee</span>
    </a>
  );
}
