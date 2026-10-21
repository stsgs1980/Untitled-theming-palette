"use client";

import { Moon, Palette as PaletteIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND_DEFAULT_600, TOTAL_SHADES } from "@/lib/palettes";

import { NAV_LINKS } from "./data";

/**
 * Липкая шапка страницы: логотип, навигация и переключатель темы.
 * @returns элемент шапки
 */
export function SiteHeader(): ReactElement {
  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = (): void => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
            style={{ backgroundColor: BRAND_DEFAULT_600 }}
          >
            <PaletteIcon className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold">Untitled UI React</span>
            <span className="text-muted-foreground hidden text-xs sm:block">Theming · брендовые палитры</span>
          </span>
        </Link>
        <nav aria-label="Разделы страницы" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              {link.title}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="hidden font-mono lg:inline-flex">
            {TOTAL_SHADES} цветов
          </Badge>
          <Button variant="outline" size="icon" aria-label="Переключить светлую или тёмную тему" onClick={toggleTheme}>
            <Sun className="size-4 dark:hidden" aria-hidden="true" />
            <Moon className="hidden size-4 dark:block" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
  );
}
