"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "ja" | "en" | "zh-CN" | "ko" | "es";

export const LOCALE_LIST: { code: Locale; name: string; flag: string }[] = [
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: "ja",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "gcode2bambu-locale" },
  ),
);
