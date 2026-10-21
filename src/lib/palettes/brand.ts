import { makeShades, type Palette } from "./types";

/** Палитры категории «brand». */
export const BRAND_PALETTES: Palette[] = [
  {
    name: "brand",
    label: "Фирменный фиолетовый Untitled UI",
    isDefault: true,
    category: "cool",
    shades: makeShades([
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
];
