import type { PaletteFilter } from "@/lib/palettes";

/** Ссылки навигации в шапке страницы. */
export const NAV_LINKS = [
  { href: "#palettes", title: "Палитры" },
  { href: "#manual", title: "Вручную" },
  { href: "#faq", title: "FAQ" },
] as const;

/** CLI-команды, показанные в hero-блоке. */
export const TERMINAL_COMMANDS = [
  {
    cmd: "npx untitledui@latest init --color <name>",
    hint: "создать проект с выбранной палитрой",
  },
  {
    cmd: "npx untitledui@latest init --colors-list",
    hint: "переоткрыть интерактивный выбор палитры",
  },
] as const;

/** Варианты фильтра по категории палитры. */
export const CATEGORIES: { value: PaletteFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "warm", label: "Тёплые" },
  { value: "cool", label: "Холодные" },
  { value: "neutral", label: "Нейтральные" },
];
