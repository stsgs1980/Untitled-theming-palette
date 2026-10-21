import type { Metadata } from "next";
import { PaletteShowcase } from "@/components/palette-showcase";

export const metadata: Metadata = {
  title: "Untitled UI React — Вся палитра для init --color",
  description:
    "Все палитры для npx untitledui@latest init --color <name>: brand и 22 встроенные палитры Tailwind, оттенки 50–950 с HEX-кодами и готовыми CLI-командами.",
};

export default function Page() {
  return <PaletteShowcase />;
}
