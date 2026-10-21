"use client";

import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Check,
  Copy,
  FileCode2,
  Moon,
  Palette,
  Search,
  Sun,
  Terminal,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  BRAND_DEFAULT_600,
  MANUAL_SNIPPET,
  PALETTES,
  PALETTE_NAMES,
  TOTAL_SHADES,
  cliCommand,
  type Palette,
  type PaletteCategory,
} from "@/lib/palettes";

/* ---------- статические данные ---------- */

const NAV_LINKS = [
  { href: "#palettes", title: "Палитры" },
  { href: "#manual", title: "Вручную" },
  { href: "#faq", title: "FAQ" },
] as const;

const TERMINAL_COMMANDS = [
  {
    cmd: "npx untitledui@latest init --color <name>",
    hint: "создать проект с выбранной палитрой",
  },
  {
    cmd: "npx untitledui@latest init --colors-list",
    hint: "переоткрыть интерактивный выбор палитры",
  },
] as const;

const CATEGORIES: { value: "all" | PaletteCategory; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "warm", label: "Тёплые" },
  { value: "cool", label: "Холодные" },
  { value: "neutral", label: "Нейтральные" },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Можно ли использовать свои цвета вместо готовых палитр?",
    a: (
      <p>
        Да. Задайте каждую переменную <K>--color-brand-*</K> в блоке <K>@theme</K> файла{" "}
        <K>theme.css</K> своими значениями <K>rgb()</K>. Определите все одиннадцать оттенков —
        от 50 до 950, — потому что компоненты используют всю шкалу.
      </p>
    ),
  },
  {
    q: "Как изменить брендовый цвет после первичной настройки?",
    a: (
      <p>
        Выполните <K>npx untitledui@latest init --colors-list</K>, чтобы снова открыть выбор
        палитры, или передайте палитру напрямую: <K>npx untitledui@latest init --color &lt;name&gt;</K>.
        Можно также отредактировать <K>theme.css</K> вручную, например{" "}
        <K>--color-brand-600: var(--color-rose-600);</K>
      </p>
    ),
  },
  {
    q: "Какие палитры можно выбрать брендовым цветом?",
    a: (
      <div>
        <p>
          <K>brand</K> сохраняет фиолетовый по умолчанию. Остальные значения — встроенные
          палитры Tailwind, все они показаны выше:
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {PALETTE_NAMES.map((n) => (
            <code
              key={n}
              className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground"
            >
              {n}
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
        Нет. Выбор палитры перенаправляет только переменные <K>--color-brand-*</K>; шкала серого
        и цвета error, warning и success остаются как есть.
      </p>
    ),
  },
  {
    q: "Как смена темы влияет на тёмный режим?",
    a: (
      <p>
        Обновляются оба режима. Токены тёмной темы в блоке <K>.dark-mode</K> файла{" "}
        <K>theme.css</K> ссылаются на ту же шкалу <K>--color-brand-*</K> (например,{" "}
        <K>--color-utility-brand-50</K> → <K>--color-brand-950</K>), поэтому новая палитра
        переносится в тёмный режим без дополнительных изменений.
      </p>
    ),
  },
];

/* ---------- вспомогательные компоненты ---------- */

function K({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

interface CopyFn {
  (text: string, id: string, message?: string): void;
}

function PaletteCard({
  palette,
  copiedId,
  onCopy,
}: {
  palette: Palette;
  copiedId: string | null;
  onCopy: CopyFn;
}) {
  const primary = palette.shades[6]!;
  return (
    <article className="flex flex-col rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2.5">
        <span
          className="size-6 shrink-0 rounded-md border border-black/10 shadow-sm dark:border-white/10"
          style={{ backgroundColor: primary.hex }}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold leading-none">{palette.name}</h3>
            {palette.isDefault && (
              <Badge
                className="border-0 px-1.5 py-0 text-[10px] text-white"
                style={{ backgroundColor: BRAND_DEFAULT_600 }}
              >
                по умолчанию
              </Badge>
            )}
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">{palette.label}</p>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-11 gap-1">
        {palette.shades.map((shade) => (
          <div key={shade.step} className="flex min-w-0 flex-col items-center gap-1">
            <button
              type="button"
              title={`${palette.name}-${shade.step} · ${shade.hex}`}
              aria-label={`Скопировать цвет ${palette.name}-${shade.step}, ${shade.hex}`}
              onClick={() => onCopy(shade.hex, `${palette.name}-${shade.step}`, `${palette.name}-${shade.step} · ${shade.hex}`)}
              className="group relative h-8 w-full rounded-md border border-black/10 transition-transform duration-150 hover:z-10 hover:scale-110 hover:shadow-md focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-ring dark:border-white/10 sm:h-9"
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
            <span className="text-[9px] leading-none text-muted-foreground">{shade.step}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label={`Скопировать CLI-команду для палитры ${palette.name}`}
        onClick={() => onCopy(cliCommand(palette.name), `cli-${palette.name}`, "Команда скопирована")}
        className="group/cli mt-3 flex w-full items-center justify-between gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-left transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
      >
        <code className="truncate font-mono text-[11px] text-muted-foreground transition-colors group-hover/cli:text-foreground">
          {cliCommand(palette.name)}
        </code>
        {copiedId === `cli-${palette.name}` ? (
          <Check className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
      </button>
    </article>
  );
}

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
}) {
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

/* ---------- основной компонент ---------- */

export function PaletteShowcase() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | PaletteCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { setTheme, resolvedTheme } = useTheme();

  const copy = useCallback<CopyFn>(async (text, id, message) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success(message ?? "Скопировано", { description: text });
      window.setTimeout(() => {
        setCopiedId((cur) => (cur === id ? null : cur));
      }, 1600);
    } catch {
      toast.error("Не удалось скопировать в буфер обмена");
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PALETTES.filter((p) => {
      const byCategory = category === "all" || p.category === category;
      const byQuery = !q || p.name.includes(q) || p.label.toLowerCase().includes(q);
      return byCategory && byQuery;
    });
  }, [query, category]);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const stats = [
    { value: String(PALETTES.length), label: "палитр на выбор" },
    { value: String(PALETTES[0]!.shades.length), label: "оттенков в каждой" },
    { value: String(TOTAL_SHADES), label: "вариантов цвета" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Шапка */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#" className="flex min-w-0 items-center gap-2.5">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
              style={{ backgroundColor: BRAND_DEFAULT_600 }}
            >
              <Palette className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold">Untitled UI React</span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                Theming · брендовые палитры
              </span>
            </span>
          </a>
          <nav aria-label="Разделы страницы" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.title}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden font-mono lg:inline-flex">
              {TOTAL_SHADES} цветов
            </Badge>
            <Button
              variant="outline"
              size="icon"
              aria-label="Переключить светлую или тёмную тему"
              onClick={toggleTheme}
            >
              <Sun className="size-4 dark:hidden" aria-hidden="true" />
              <Moon className="hidden size-4 dark:block" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, rgba(127,86,217,0.10), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16">
            <Badge variant="outline" className="mb-4 bg-card">
              Untitled UI React CLI · Theming
            </Badge>
            <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Вся палитра для <span className="whitespace-nowrap">init --color</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-muted-foreground sm:text-lg">
              Команда <K>init --color</K> перенаправляет переменные <K>--color-brand-*</K> в{" "}
              <K>theme.css</K> на выбранную палитру Tailwind. Ниже — все доступные варианты:
              нажмите на оттенок, чтобы скопировать HEX, или на команду, чтобы скопировать CLI-строку.
            </p>

            <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-left text-zinc-100 shadow-lg">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 px-4 py-2.5">
                <span className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                  <Terminal className="size-3.5" aria-hidden="true" />
                  Терминал
                </span>
                <span className="hidden text-[11px] text-zinc-500 sm:block">
                  нажмите на строку, чтобы скопировать
                </span>
              </div>
              <div className="divide-y divide-zinc-800/60">
                {TERMINAL_COMMANDS.map((c) => (
                  <button
                    key={c.cmd}
                    type="button"
                    aria-label={`Скопировать команду ${c.cmd}`}
                    onClick={() => copy(c.cmd, c.cmd, "Команда скопирована")}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-500"
                  >
                    <span className="select-none font-mono text-sm text-zinc-500">$</span>
                    <code className="min-w-0 flex-1 truncate font-mono text-[13px]">{c.cmd}</code>
                    <span className="hidden shrink-0 text-[11px] text-zinc-500 md:block">{c.hint}</span>
                    {copiedId === c.cmd ? (
                      <Check className="size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Copy className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((st) => (
                <div key={st.label} className="rounded-xl border bg-card px-3 py-4 shadow-sm">
                  <div className="text-2xl font-bold tracking-tight">{st.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Палитры */}
        <section id="palettes" className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Все палитры</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                11 оттенков от 50 до 950 в каждой. Выбор палитры меняет только{" "}
                <K>--color-brand-*</K> — остальная тема не трогается.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Фильтр по категории">
                {CATEGORIES.map((c) => (
                  <Button
                    key={c.value}
                    size="sm"
                    variant={category === c.value ? "default" : "outline"}
                    onClick={() => setCategory(c.value)}
                    aria-pressed={category === c.value}
                  >
                    {c.label}
                  </Button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти: rose, teal, бирюзовый…"
                  aria-label="Поиск палитры"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <PaletteCard key={p.name} palette={p} copiedId={copiedId} onCopy={copy} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                <Search className="size-8 text-muted-foreground/50" aria-hidden="true" />
                <p className="mt-3 font-medium">Ничего не найдено</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Попробуйте другое название, например «rose» или «teal».
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Ручная настройка */}
        <section id="manual" className="scroll-mt-16 border-t bg-muted/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Или вручную в theme.css</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Если проект уже создан, просто перенаправьте каждую переменную{" "}
                <K>--color-brand-*</K> на встроенную палитру Tailwind или на свои значения{" "}
                <K>rgb()</K>. Что важно знать:
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  "brand оставляет фиолетовый Untitled UI по умолчанию",
                  "Остальные 22 значения — встроенные палитры Tailwind: от red до stone",
                  "Свои палитры rgb() (например, --color-ocean-50…950) тоже появятся в интерактивном списке --colors-list",
                  "Серый, error, warning и success не меняются — только --color-brand-*",
                  "Тёмная тема подхватится автоматически: dark-токены ссылаются на ту же шкалу",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <CodeBlock
              title="theme.css"
              code={MANUAL_SNIPPET}
              copiedId={copiedId}
              copyId="manual-snippet"
              onCopy={copy}
            />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-16 border-t">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 className="text-center text-2xl font-semibold tracking-tight">Частые вопросы</h2>
            <Accordion type="single" collapsible className="mt-6">
              {FAQS.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Липкий футер */}
      <footer className="mt-auto border-t bg-background pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>
            Шоукейс палитр по документации{" "}
            <span className="font-medium text-foreground">Untitled UI React · Theming</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              className="transition-colors hover:text-foreground"
              href="https://www.untitledui.com/react"
              target="_blank"
              rel="noreferrer"
            >
              untitledui.com
            </a>
            <a
              className="transition-colors hover:text-foreground"
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
            >
              tailwindcss.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
