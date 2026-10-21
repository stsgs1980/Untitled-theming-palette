"use client";

import { Check, Copy, Search } from "lucide-react";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRAND_DEFAULT_600, cliCommand, type Palette } from "@/lib/palettes";
import { cn } from "@/lib/utils";

import { CodeChip } from "./code-chip";
import { CATEGORIES } from "./data";
import type { CopyFn } from "./use-copy-to-clipboard";
import type { PaletteFilterState } from "./use-palette-filter";

/**
 * Карточка палитры: оттенки с копированием HEX и CLI-команда.
 * @param props - палитра, состояние копирования и функция копирования
 * @returns элемент карточки палитры
 */
function PaletteCard({
  palette,
  copiedId,
  onCopy,
}: {
  palette: Palette;
  copiedId: string | null;
  onCopy: CopyFn;
}): ReactElement {
  const primary = palette.shades[6]!;

  return (
    <article className="bg-card flex flex-col rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2.5">
        <span
          className="size-6 shrink-0 rounded-md border border-black/10 shadow-sm dark:border-white/10"
          style={{ backgroundColor: primary.hex }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate leading-none font-semibold">{palette.name}</h3>
            {palette.isDefault && (
              <Badge
                className="border-0 px-1.5 py-0 text-[10px] text-white"
                style={{ backgroundColor: BRAND_DEFAULT_600 }}
              >
                по умолчанию
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-1 truncate text-xs">{palette.label}</p>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-11 gap-1">
        {palette.shades.map((shade) => (
          <div key={shade.step} className="flex min-w-0 flex-col items-center gap-1">
            <button
              type="button"
              title={`${palette.name}-${shade.step} · ${shade.hex}`}
              aria-label={`Скопировать цвет ${palette.name}-${shade.step}, ${shade.hex}`}
              onClick={() =>
                onCopy(shade.hex, `${palette.name}-${shade.step}`, `${palette.name}-${shade.step} · ${shade.hex}`)
              }
              className="group focus-visible:outline-ring relative h-8 w-full rounded-md border border-black/10 transition-transform duration-150 hover:z-10 hover:scale-110 hover:shadow-md focus-visible:z-10 focus-visible:outline-2 sm:h-9 dark:border-white/10"
              style={{ backgroundColor: shade.hex }}
            >
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 hidden items-center justify-center text-[9px] font-semibold tracking-tight opacity-0 transition-opacity duration-150 group-hover:opacity-100 md:flex",
                  shade.step >= 400 ? "text-white" : "text-zinc-900",
                )}
              >
                {shade.hex.slice(1)}
              </span>
            </button>
            <span className="text-muted-foreground text-[9px] leading-none">{shade.step}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label={`Скопировать CLI-команду для палитры ${palette.name}`}
        onClick={() => onCopy(cliCommand(palette.name), `cli-${palette.name}`, "Команда скопирована")}
        className="group/cli bg-muted/40 hover:bg-muted focus-visible:outline-ring mt-3 flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-2"
      >
        <code className="text-muted-foreground group-hover/cli:text-foreground truncate font-mono text-[11px] transition-colors">
          {cliCommand(palette.name)}
        </code>
        {copiedId === `cli-${palette.name}` ? (
          <Check className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        ) : (
          <Copy className="text-muted-foreground size-3.5 shrink-0" aria-hidden="true" />
        )}
      </button>
    </article>
  );
}

/**
 * Секция со списком палитр: фильтры, поиск и сетка карточек.
 * @param props - состояние фильтра, состояние копирования и функция копирования
 * @returns элемент секции со списком палитр
 */
export function PaletteGrid({
  filter,
  copiedId,
  copy,
}: {
  filter: PaletteFilterState;
  copiedId: string | null;
  copy: CopyFn;
}): ReactElement {
  return (
    <section id="palettes" className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Все палитры</h2>
          <p className="text-muted-foreground mt-1 max-w-xl text-sm">
            11 оттенков от 50 до 950 в каждой. Выбор палитры меняет только <CodeChip>--color-brand-*</CodeChip> —
            остальная тема не трогается.
          </p>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Фильтр по категории">
            {CATEGORIES.map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={filter.category === item.value ? "default" : "outline"}
                onClick={() => filter.setCategory(item.value)}
                aria-pressed={filter.category === item.value}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              value={filter.query}
              onChange={(event) => filter.setQuery(event.target.value)}
              placeholder="Найти: rose, teal, бирюзовый…"
              aria-label="Поиск палитры"
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filter.filtered.map((palette) => (
          <PaletteCard key={palette.name} palette={palette} copiedId={copiedId} onCopy={copy} />
        ))}
        {filter.filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
            <Search className="text-muted-foreground/50 size-8" aria-hidden="true" />
            <p className="mt-3 font-medium">Ничего не найдено</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Попробуйте другое название, например «rose» или «teal».
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
