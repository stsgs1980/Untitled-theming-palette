/** Оттенок палитры: шаг шкалы Tailwind и HEX-код. */
export interface Shade {
  /** Шаг шкалы: 50, 100, 200 ... 950. */
  step: number;
  /** HEX-код оттенка без префикса альфа-канала. */
  hex: string;
}

/** Категория палитры для фильтра на странице. */
export type PaletteCategory = "cool" | "warm" | "neutral";

/** Фильтр списка палитр: все палитры или одна категория. */
export type PaletteFilter = "all" | PaletteCategory;

/** Палитра, доступная для флага `--color` в CLI. */
export interface Palette {
  /** Значение для флага --color в CLI. */
  name: string;
  /** Русское название для поиска и подписи. */
  label: string;
  /** brand — фиолетовый Untitled UI по умолчанию. */
  isDefault?: boolean;
  /** Категория для фильтра. */
  category: PaletteCategory;
  /** Оттенки от 50 до 950. */
  shades: Shade[];
}

/** Шаги шкалы оттенков: 50, 100, 200 ... 950. */
export const SHADE_STEPS: readonly number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/**
 * Превращает список HEX-кодов в оттенки, расставляя шаги шкалы.
 * @param hexes - HEX-коды оттенков, от светлого к тёмному (11 штук)
 * @returns массив оттенков со шагами шкалы
 */
export function makeShades(hexes: string[]): Shade[] {
  return hexes.map((hex, index) => ({ step: SHADE_STEPS[index]!, hex }));
}
