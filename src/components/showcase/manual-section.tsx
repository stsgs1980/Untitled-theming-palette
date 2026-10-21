"use client";

import { Check, Copy, FileCode2 } from "lucide-react";
import type { ReactElement } from "react";

import { MANUAL_SNIPPET } from "@/lib/palettes";

import { CodeChip } from "./code-chip";
import type { CopyFn } from "./use-copy-to-clipboard";

/**
 * Блок кода с кнопкой копирования.
 * @param props - заголовок блока, код, идентификаторы копирования и функция копирования
 * @returns элемент блока кода
 */
function CodeBlock({
  title,
  code,
  copiedId,
  copyId,
  onCopy,
}: {
  title: string;
  code: string;
  copiedId: string | null;
  copyId: string;
  onCopy: CopyFn;
}): ReactElement {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2 text-xs font-medium text-zinc-400">
          <FileCode2 className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{title}</span>
        </span>
        <button
          type="button"
          onClick={() => onCopy(code, copyId, "Сниппет скопирован")}
          className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-zinc-500"
        >
          {copiedId === copyId ? (
            <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          Копировать
        </button>
      </div>
      <pre className="scrollbar-thin max-h-96 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * Секция о ручной настройке темы через theme.css.
 * @param props - состояние копирования и функция копирования
 * @returns элемент секции
 */
export function ManualSection({ copiedId, copy }: { copiedId: string | null; copy: CopyFn }): ReactElement {
  const notes = [
    "brand оставляет фиолетовый Untitled UI по умолчанию",
    "Остальные 22 значения — встроенные палитры Tailwind: от red до stone",
    "Свои палитры rgb() (например, --color-ocean-50…950) тоже появятся в интерактивном списке --colors-list",
    "Серый, error, warning и success не меняются — только --color-brand-*",
    "Тёмная тема подхватится автоматически: dark-токены ссылаются на ту же шкалу",
  ];

  return (
    <section id="manual" className="bg-muted/40 scroll-mt-16 border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Или вручную в theme.css</h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Если проект уже создан, просто перенаправьте каждую переменную <CodeChip>--color-brand-*</CodeChip> на
            встроенную палитру Tailwind или на свои значения <CodeChip>rgb()</CodeChip>. Что важно знать:
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {notes.map((note) => (
              <li key={note} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
        <CodeBlock title="theme.css" code={MANUAL_SNIPPET} copiedId={copiedId} copyId="manual-snippet" onCopy={copy} />
      </div>
    </section>
  );
}
