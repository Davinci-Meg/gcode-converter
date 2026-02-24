"use client";

import { useMemo } from "react";
import { useLocaleStore } from "./store";
import type { Locale } from "./store";
import type { Translations } from "./locales/ja";
import ja from "./locales/ja";

// Lazy-loaded translation modules
const loaders: Record<Locale, () => Translations> = {
  ja: () => ja,
  en: () => require("./locales/en").default,
  "zh-CN": () => require("./locales/zh-CN").default,
  ko: () => require("./locales/ko").default,
  es: () => require("./locales/es").default,
  de: () => require("./locales/de").default,
  fr: () => require("./locales/fr").default,
};

const cache = new Map<Locale, Translations>();
cache.set("ja", ja);

function getTranslation(locale: Locale): Translations {
  let t = cache.get(locale);
  if (!t) {
    try {
      t = loaders[locale]();
    } catch {
      t = ja; // fallback
    }
    cache.set(locale, t);
  }
  return t;
}

/** Returns the translation object for the current locale. */
export function useTranslation(): Translations {
  const locale = useLocaleStore((s) => s.locale);
  return useMemo(() => getTranslation(locale), [locale]);
}
