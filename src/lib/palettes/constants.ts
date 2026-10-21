import { BRAND_PALETTES } from "./brand";

/** HEX фирменного фиолетового Untitled UI (шаг 600). */
export const BRAND_DEFAULT_600: string = BRAND_PALETTES[0]!.shades[6]!.hex;

/** Сниппет для ручного перенаправления --color-brand-* в theme.css. */
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
