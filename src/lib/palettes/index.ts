import { BRAND_PALETTES } from "./brand";
import { COOL_PALETTES } from "./cool";
import { NEUTRAL_PALETTES } from "./neutral";
import { PALETTE_ORDER } from "./order";
import type { Palette } from "./types";
import { WARM_PALETTES } from "./warm";

export { cliCommand } from "./cli";
export { BRAND_DEFAULT_600, MANUAL_SNIPPET } from "./constants";
export { PALETTE_ORDER } from "./order";
export { SHADE_STEPS } from "./types";
export type { Palette, PaletteCategory, PaletteFilter, Shade } from "./types";

const BY_NAME = new Map<string, Palette>(
  [...BRAND_PALETTES, ...WARM_PALETTES, ...COOL_PALETTES, ...NEUTRAL_PALETTES].map((palette) => [
    palette.name,
    palette,
  ]),
);

/** Все палитры проекта в каноническом порядке вывода. */
export const PALETTES: Palette[] = PALETTE_ORDER.map((name) => BY_NAME.get(name)!);

/** Имена палитр в каноническом порядке вывода. */
export const PALETTE_NAMES: readonly string[] = PALETTES.map((palette) => palette.name);

/** Суммарное количество оттенков во всех палитрах. */
export const TOTAL_SHADES: number = PALETTES.reduce((acc, palette) => acc + palette.shades.length, 0);
