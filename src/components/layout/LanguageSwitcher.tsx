"use client";

import { useLocaleStore, LOCALE_LIST, type Locale } from "@/lib/i18n";
import { useTranslation } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();
  const t = useTranslation();

  const currentLocale = LOCALE_LIST.find((l) => l.code === locale);

  return (
    <div className="flex flex-col items-end gap-0.5">
      <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
        <SelectTrigger className="h-8 text-xs gap-1.5">
          <Globe className="size-3.5" />
          <SelectValue>
            {currentLocale
              ? `${currentLocale.flag} ${currentLocale.code.toUpperCase()}`
              : locale.toUpperCase()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {LOCALE_LIST.map((l) => (
            <SelectItem key={l.code} value={l.code}>
              {l.flag} {l.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {t._meta.aiTranslated && (
        <p className="text-[10px] text-muted-foreground/60">
          {t.footer.aiTranslationNote}
        </p>
      )}
    </div>
  );
}
