export interface Shade {
  step: number;
  hex: string;
}

export type PaletteCategory = "cool" | "warm" | "neutral";

export interface Palette {
  /** Значение для флага --color в CLI */
  name: string;
  /** Русское название для поиска и подписи */
  label: string;
  /** brand — фиолетовый Untitled UI по умолчанию */
  isDefault?: boolean;
  category: PaletteCategory;
  shades: Shade[];
}

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const s = (hexes: string[]): Shade[] =>
  hexes.map((hex, i) => ({ step: STEPS[i]!, hex }));

export const PALETTES: Palette[] = [
  {
    name: "brand",
    label: "Фирменный фиолетовый Untitled UI",
    isDefault: true,
    category: "cool",
    shades: s([
      "#F9F5FF",
      "#F4EBFF",
      "#E9D7FE",
      "#D6BBFB",
      "#B692F6",
      "#9E77ED",
      "#7F56D9",
      "#6941C6",
      "#53389E",
      "#42307D",
      "#2C1C5F",
    ]),
  },
  {
    name: "red",
    label: "Красный",
    category: "warm",
    shades: s([
      "#FEF2F2",
      "#FEE2E2",
      "#FECACA",
      "#FCA5A5",
      "#F87171",
      "#EF4444",
      "#DC2626",
      "#B91C1C",
      "#991B1B",
      "#7F1D1D",
      "#450A0A",
    ]),
  },
  {
    name: "orange",
    label: "Оранжевый",
    category: "warm",
    shades: s([
      "#FFF7ED",
      "#FFEDD5",
      "#FED7AA",
      "#FDBA74",
      "#FB923C",
      "#F97316",
      "#EA580C",
      "#C2410C",
      "#9A3412",
      "#7C2D12",
      "#431407",
    ]),
  },
  {
    name: "amber",
    label: "Янтарный",
    category: "warm",
    shades: s([
      "#FFFBEB",
      "#FEF3C7",
      "#FDE68A",
      "#FCD34D",
      "#FBBF24",
      "#F59E0B",
      "#D97706",
      "#B45309",
      "#92400E",
      "#78350F",
      "#451A03",
    ]),
  },
  {
    name: "yellow",
    label: "Жёлтый",
    category: "warm",
    shades: s([
      "#FEFCE8",
      "#FEF9C3",
      "#FEF08A",
      "#FDE047",
      "#FACC15",
      "#EAB308",
      "#CA8A04",
      "#A16207",
      "#854D0E",
      "#713F12",
      "#422006",
    ]),
  },
  {
    name: "lime",
    label: "Лаймовый",
    category: "warm",
    shades: s([
      "#F7FEE7",
      "#ECFCCB",
      "#D9F99D",
      "#BEF264",
      "#A3E635",
      "#84CC16",
      "#65A30D",
      "#4D7C0F",
      "#3F6212",
      "#365314",
      "#1A2E05",
    ]),
  },
  {
    name: "green",
    label: "Зелёный",
    category: "cool",
    shades: s([
      "#F0FDF4",
      "#DCFCE7",
      "#BBF7D0",
      "#86EFAC",
      "#4ADE80",
      "#22C55E",
      "#16A34A",
      "#15803D",
      "#166534",
      "#14532D",
      "#052E16",
    ]),
  },
  {
    name: "emerald",
    label: "Изумрудный",
    category: "cool",
    shades: s([
      "#ECFDF5",
      "#D1FAE5",
      "#A7F3D0",
      "#6EE7B7",
      "#34D399",
      "#10B981",
      "#059669",
      "#047857",
      "#065F46",
      "#064E3B",
      "#022C22",
    ]),
  },
  {
    name: "teal",
    label: "Бирюзовый",
    category: "cool",
    shades: s([
      "#F0FDFA",
      "#CCFBF1",
      "#99F6E4",
      "#5EEAD4",
      "#2DD4BF",
      "#14B8A6",
      "#0D9488",
      "#0F766E",
      "#115E59",
      "#134E4A",
      "#042F2E",
    ]),
  },
  {
    name: "cyan",
    label: "Голубой",
    category: "cool",
    shades: s([
      "#ECFEFF",
      "#CFFAFE",
      "#A5F3FC",
      "#67E8F9",
      "#22D3EE",
      "#06B6D4",
      "#0891B2",
      "#0E7490",
      "#155E75",
      "#164E63",
      "#083344",
    ]),
  },
  {
    name: "sky",
    label: "Небесный",
    category: "cool",
    shades: s([
      "#F0F9FF",
      "#E0F2FE",
      "#BAE6FD",
      "#7DD3FC",
      "#38BDF8",
      "#0EA5E9",
      "#0284C7",
      "#0369A1",
      "#075985",
      "#0C4A6E",
      "#082F49",
    ]),
  },
  {
    name: "blue",
    label: "Синий",
    category: "cool",
    shades: s([
      "#EFF6FF",
      "#DBEAFE",
      "#BFDBFE",
      "#93C5FD",
      "#60A5FA",
      "#3B82F6",
      "#2563EB",
      "#1D4ED8",
      "#1E40AF",
      "#1E3A8A",
      "#172554",
    ]),
  },
  {
    name: "indigo",
    label: "Индиго",
    category: "cool",
    shades: s([
      "#EEF2FF",
      "#E0E7FF",
      "#C7D2FE",
      "#A5B4FC",
      "#818CF8",
      "#6366F1",
      "#4F46E5",
      "#4338CA",
      "#3730A3",
      "#312E81",
      "#1E1B4B",
    ]),
  },
  {
    name: "violet",
    label: "Фиолетовый",
    category: "cool",
    shades: s([
      "#F5F3FF",
      "#EDE9FE",
      "#DDD6FE",
      "#C4B5FD",
      "#A78BFA",
      "#8B5CF6",
      "#7C3AED",
      "#6D28D9",
      "#5B21B6",
      "#4C1D95",
      "#2E1065",
    ]),
  },
  {
    name: "purple",
    label: "Пурпурный",
    category: "cool",
    shades: s([
      "#FAF5FF",
      "#F3E8FF",
      "#E9D5FF",
      "#D8B4FE",
      "#C084FC",
      "#A855F7",
      "#9333EA",
      "#7E22CE",
      "#6B21A8",
      "#581C87",
      "#3B0764",
    ]),
  },
  {
    name: "fuchsia",
    label: "Фуксия",
    category: "cool",
    shades: s([
      "#FDF4FF",
      "#FAE8FF",
      "#F5D0FE",
      "#F0ABFC",
      "#E879F9",
      "#D946EF",
      "#C026D3",
      "#A21CAF",
      "#86198F",
      "#701A75",
      "#4A044E",
    ]),
  },
  {
    name: "pink",
    label: "Розовый",
    category: "warm",
    shades: s([
      "#FDF2F8",
      "#FCE7F3",
      "#FBCFE8",
      "#F9A8D4",
      "#F472B6",
      "#EC4899",
      "#DB2777",
      "#BE185D",
      "#9D174D",
      "#831843",
      "#500724",
    ]),
  },
  {
    name: "rose",
    label: "Роза",
    category: "warm",
    shades: s([
      "#FFF1F2",
      "#FFE4E6",
      "#FECDD3",
      "#FDA4AF",
      "#FB7185",
      "#F43F5E",
      "#E11D48",
      "#BE123C",
      "#9F1239",
      "#881337",
      "#4C0519",
    ]),
  },
  {
    name: "slate",
    label: "Сланцевый",
    category: "neutral",
    shades: s([
      "#F8FAFC",
      "#F1F5F9",
      "#E2E8F0",
      "#CBD5E1",
      "#94A3B8",
      "#64748B",
      "#475569",
      "#334155",
      "#1E293B",
      "#0F172A",
      "#020617",
    ]),
  },
  {
    name: "gray",
    label: "Серый",
    category: "neutral",
    shades: s([
      "#F9FAFB",
      "#F3F4F6",
      "#E5E7EB",
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#1F2937",
      "#111827",
      "#030712",
    ]),
  },
  {
    name: "zinc",
    label: "Цинковый",
    category: "neutral",
    shades: s([
      "#FAFAFA",
      "#F4F4F5",
      "#E4E4E7",
      "#D4D4D8",
      "#A1A1AA",
      "#71717A",
      "#52525B",
      "#3F3F46",
      "#27272A",
      "#18181B",
      "#09090B",
    ]),
  },
  {
    name: "neutral",
    label: "Нейтральный",
    category: "neutral",
    shades: s([
      "#FAFAFA",
      "#F5F5F5",
      "#E5E5E5",
      "#D4D4D4",
      "#A3A3A3",
      "#737373",
      "#525252",
      "#404040",
      "#262626",
      "#171717",
      "#0A0A0A",
    ]),
  },
  {
    name: "stone",
    label: "Каменный",
    category: "neutral",
    shades: s([
      "#FAFAF9",
      "#F5F5F4",
      "#E7E5E4",
      "#D6D3D1",
      "#A8A29E",
      "#78716C",
      "#57534E",
      "#44403C",
      "#292524",
      "#1C1917",
      "#0C0A09",
    ]),
  },
];

export const PALETTE_NAMES = PALETTES.map((p) => p.name);

export const TOTAL_SHADES = PALETTES.reduce(
  (acc, p) => acc + p.shades.length,
  0,
);

export const BRAND_DEFAULT_600 = PALETTES[0]!.shades[6]!.hex;

export function cliCommand(name: string): string {
  return `npx untitledui@latest init --color ${name}`;
}

export const MANUAL_SNIPPET = `@theme {
    /* перенаправьте --color-brand-* на встроенную палитру Tailwind */
    --color-brand-50: var(--color-rose-50);
    --color-brand-100: var(--color-rose-100);
    --color-brand-200: var(--color-rose-200);
    --color-brand-300: var(--color-rose-300);
    --color-brand-400: var(--color-rose-400);
    --color-brand-500: var(--color-rose-500);
    --color-brand-600: var(--color-rose-600);
    --color-brand-700: var(--color-rose-700);
    --color-brand-800: var(--color-rose-800);
    --color-brand-900: var(--color-rose-900);
    --color-brand-950: var(--color-rose-950);

    /* или задайте свои значения rgb() — все 11 оттенков */
    /* --color-brand-600: rgb(127 86 217); */
}`;
