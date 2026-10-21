import { PaletteShowcase } from "@/components/palette-showcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Untitled UI React — Вся палитра для init --color",
  description:
    "Все палитры для npx untitledui@latest init --color <name>: brand и 22 встроенные палитры Tailwind, оттенки 50–950 с HEX-кодами и готовыми CLI-командами.",
};

/**
 * Главная страница: шоукейс всей палитры Untitled UI React.
 * @returns элемент страницы
 */
export default function Page(): React.ReactElement {
  return <PaletteShowcase />;
}
