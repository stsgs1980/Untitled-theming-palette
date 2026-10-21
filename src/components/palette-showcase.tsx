"use client";

import type { ReactElement } from "react";

import { FaqSection } from "@/components/showcase/faq-section";
import { HeroSection } from "@/components/showcase/hero-section";
import { ManualSection } from "@/components/showcase/manual-section";
import { PaletteGrid } from "@/components/showcase/palette-grid";
import { SiteFooter } from "@/components/showcase/site-footer";
import { SiteHeader } from "@/components/showcase/site-header";
import { useCopyToClipboard } from "@/components/showcase/use-copy-to-clipboard";
import { usePaletteFilter } from "@/components/showcase/use-palette-filter";

/**
 * Главный экран шоукейса: шапка, hero, список палитр, ручная настройка, FAQ и футер.
 * @returns элемент страницы шоукейса
 */
export function PaletteShowcase(): ReactElement {
  const { copy, copiedId } = useCopyToClipboard();
  const filter = usePaletteFilter();

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection copy={copy} copiedId={copiedId} />
        <PaletteGrid filter={filter} copiedId={copiedId} copy={copy} />
        <ManualSection copiedId={copiedId} copy={copy} />
        <FaqSection />
      </main>

      <SiteFooter />
    </div>
  );
}
