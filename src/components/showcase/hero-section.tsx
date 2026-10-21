"use client";

import { Check, Copy, Terminal } from "lucide-react";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { PALETTES, TOTAL_SHADES } from "@/lib/palettes";

import { CodeChip } from "./code-chip";
import { TERMINAL_COMMANDS } from "./data";
import type { CopyFn } from "./use-copy-to-clipboard";

/**
 * Hero-блок: заголовок, терминал с CLI-командами и статистика по палитрам.
 * @param props - функция копирования и идентификатор скопированного элемента
 * @returns элемент hero-блока
 */
export function HeroSection({ copy, copiedId }: { copy: CopyFn; copiedId: string | null }): ReactElement {
  const stats = [
    { value: String(PALETTES.length), label: "палитр на выбор" },
    { value: String(PALETTES[0]!.shades.length), label: "оттенков в каждой" },
    { value: String(TOTAL_SHADES), label: "вариантов цвета" },
  ];

  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 55% at 50% 0%, rgba(127,86,217,0.10), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16">
        <Badge variant="outline" className="bg-card mb-4">
          Untitled UI React CLI · Theming
        </Badge>
        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Вся палитра для <span className="whitespace-nowrap">init --color</span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance sm:text-lg">
          Команда <CodeChip>init --color</CodeChip> перенаправляет переменные <CodeChip>--color-brand-*</CodeChip> в{" "}
          <CodeChip>theme.css</CodeChip> на выбранную палитру Tailwind. Ниже — все доступные варианты: нажмите на
          оттенок, чтобы скопировать HEX, или на команду, чтобы скопировать CLI-строку.
        </p>

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-left text-zinc-100 shadow-lg">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-2.5">
            <span className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Terminal className="size-3.5" aria-hidden="true" />
              Терминал
            </span>
            <span className="hidden text-[11px] text-zinc-500 sm:block">нажмите на строку, чтобы скопировать</span>
          </div>
          <div className="divide-y divide-zinc-800/60">
            {TERMINAL_COMMANDS.map((command) => (
              <button
                key={command.cmd}
                type="button"
                aria-label={`Скопировать команду ${command.cmd}`}
                onClick={() => copy(command.cmd, command.cmd, "Команда скопирована")}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-500"
              >
                <span className="font-mono text-sm text-zinc-500 select-none">$</span>
                <code className="min-w-0 flex-1 truncate font-mono text-[13px]">{command.cmd}</code>
                <span className="hidden shrink-0 text-[11px] text-zinc-500 md:block">{command.hint}</span>
                {copiedId === command.cmd ? (
                  <Check className="size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Copy className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border px-3 py-4 shadow-sm">
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-muted-foreground mt-1 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
