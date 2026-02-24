"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / App name */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500/10 border border-green-500/20">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span className="hidden font-mono text-sm font-semibold tracking-tight sm:inline-block">
            <span className="text-foreground">gcoordinator</span>
            <span className="mx-1.5 text-muted-foreground/60">&rarr;</span>
            <span className="text-green-500">Bambu Lab A1</span>
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight sm:hidden">
            <span className="text-green-500">gcode2bambu</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            href="/guide"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
          >
            {t.header.guide}
          </Link>
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
          >
            {t.header.about}
          </Link>
          <div className="ml-1 h-5 w-px bg-border" />
          <div className="ml-1">
            <LanguageSwitcher />
          </div>
          <div className="ml-1 h-5 w-px bg-border" />
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
