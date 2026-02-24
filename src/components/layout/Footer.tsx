"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="border-t border-border/60 bg-background/50 pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        {/* Copyright & disclaimer */}
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Megumu Isshiki. {t.footer.copyright}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {t.footer.disclaimer}
          </p>
          {t._meta.aiTranslated && (
            <p className="text-[10px] text-muted-foreground/60">
              {t.footer.aiTranslationNote}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/search?q=gcoordinator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            gcoordinator GitHub
          </a>
          <span className="text-muted-foreground/30">|</span>
          <Link
            href="/guide"
            className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            {t.header.guide}
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <Link
            href="/about"
            className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            {t.header.about}
          </Link>
        </div>
      </div>
    </footer>
  );
}
