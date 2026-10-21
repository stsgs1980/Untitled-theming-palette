"use client";

import { ChevronDown } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

import { PALETTE_NAMES } from "@/lib/palettes";
import { cn } from "@/lib/utils";

import { CodeChip } from "./code-chip";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Можно ли использовать свои цвета вместо готовых палитр?",
    a: (
      <p>
        Да. Задайте каждую переменную <CodeChip>--color-brand-*</CodeChip> в блоке <CodeChip>@theme</CodeChip> файла{" "}
        <CodeChip>theme.css</CodeChip> своими значениями <CodeChip>rgb()</CodeChip>. Определите все одиннадцать оттенков
        — от 50 до 950, — потому что компоненты используют всю шкалу.
      </p>
    ),
  },
  {
    q: "Как изменить брендовый цвет после первичной настройки?",
    a: (
      <p>
        Выполните <CodeChip>npx untitledui@latest init --colors-list</CodeChip>, чтобы снова открыть выбор палитры, или
        передайте палитру напрямую: <CodeChip>npx untitledui@latest init --color &lt;name&gt;</CodeChip>. Можно также
        отредактировать <CodeChip>theme.css</CodeChip> вручную, например{" "}
        <CodeChip>--color-brand-600: var(--color-rose-600);</CodeChip>
      </p>
    ),
  },
  {
    q: "Какие палитры можно выбрать брендовым цветом?",
    a: (
      <div>
        <p>
          <CodeChip>brand</CodeChip> сохраняет фиолетовый по умолчанию. Остальные значения — встроенные палитры
          Tailwind, все они показаны выше:
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {PALETTE_NAMES.map((name) => (
            <code key={name} className="bg-muted text-foreground rounded-md border px-1.5 py-0.5 font-mono text-[11px]">
              {name}
            </code>
          ))}
        </div>
      </div>
    ),
  },
  {
    q: "Влияет ли смена брендового цвета на серый, error или success?",
    a: (
      <p>
        Нет. Выбор палитры перенаправляет только переменные <CodeChip>--color-brand-*</CodeChip>; шкала серого и цвета
        error, warning и success остаются как есть.
      </p>
    ),
  },
  {
    q: "Как смена темы влияет на тёмный режим?",
    a: (
      <p>
        Обновляются оба режима. Токены тёмной темы в блоке <CodeChip>.dark-mode</CodeChip> файла{" "}
        <CodeChip>theme.css</CodeChip> ссылаются на ту же шкалу <CodeChip>--color-brand-*</CodeChip> (например,{" "}
        <CodeChip>--color-utility-brand-50</CodeChip> → <CodeChip>--color-brand-950</CodeChip>), поэтому новая палитра
        переносится в тёмный режим без дополнительных изменений.
      </p>
    ),
  },
];

/**
 * Элемент FAQ без useId: Radix Accordion генерирует id через React useId, и в
 * dev-режиме (стриминг + HMR-гонки Turbopack) id сервера и клиента могут разойтись,
 * вызывая hydration-ошибку. Статические id полностью детерминированы, сохраняют
 * доступность (aria-expanded/aria-controls/region) и визуально повторяют shadcn Accordion.
 * @param props - вопрос, ответ и индекс элемента
 * @returns элемент аккордеона FAQ
 */
function FaqItem({ question, answer, index }: { question: string; answer: ReactNode; index: number }): ReactElement {
  const [open, setOpen] = useState(false);
  const triggerId = `faq-trigger-${index}`;
  const contentId = `faq-content-${index}`;

  return (
    <div className="border-b last:border-b-0">
      <h3 className="flex">
        <button
          type="button"
          id={triggerId}
          aria-controls={contentId}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] sm:text-base"
        >
          {question}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </h3>
      {open && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={triggerId}
          className="animate-in fade-in-0 slide-in-from-top-1 text-muted-foreground pb-4 text-sm leading-relaxed"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

/**
 * Секция с часто задаваемыми вопросами.
 * @returns элемент секции FAQ
 */
export function FaqSection(): ReactElement {
  return (
    <section id="faq" className="scroll-mt-16 border-t">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight">Частые вопросы</h2>
        <div className="mt-6">
          {FAQS.map((faq, index) => (
            <FaqItem key={faq.q} question={faq.q} answer={faq.a} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
