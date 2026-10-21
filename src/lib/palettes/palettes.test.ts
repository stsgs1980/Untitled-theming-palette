import { describe, expect, it } from "vitest";

import {
  BRAND_DEFAULT_600,
  MANUAL_SNIPPET,
  PALETTES,
  PALETTE_NAMES,
  SHADE_STEPS,
  TOTAL_SHADES,
  cliCommand,
} from "@/lib/palettes";

describe("палитры", () => {
  it("содержит 23 палитры, включая brand по умолчанию", () => {
    expect(PALETTES).toHaveLength(23);
    expect(PALETTES[0]!.name).toBe("brand");
    expect(PALETTES[0]!.isDefault).toBe(true);
  });

  it("у каждой палитры 11 оттенков со шагами 50-950", () => {
    for (const palette of PALETTES) {
      expect(palette.shades).toHaveLength(11);
      expect(palette.shades.map((shade) => shade.step)).toEqual([...SHADE_STEPS]);
    }
  });

  it("считает суммарное количество оттенков", () => {
    expect(TOTAL_SHADES).toBe(23 * 11);
  });

  it("возвращает HEX фирменного фиолетового в шаге 600", () => {
    expect(BRAND_DEFAULT_600).toBe("#7F56D9");
  });

  it("уникальны имена палитр и HEX-коды оттенков внутри палитры", () => {
    expect(new Set(PALETTE_NAMES).size).toBe(PALETTES.length);

    for (const palette of PALETTES) {
      const hexes = palette.shades.map((shade) => shade.hex);

      expect(new Set(hexes).size).toBe(hexes.length);
    }
  });

  it("относит каждую палитру к известной категории", () => {
    const categories = new Set(["warm", "cool", "neutral"]);

    for (const palette of PALETTES) {
      expect(categories.has(palette.category)).toBe(true);
    }
  });
});

describe("cliCommand", () => {
  it("строит команду инициализации с флагом --color", () => {
    expect(cliCommand("rose")).toBe("npx untitledui@latest init --color rose");
  });
});

describe("MANUAL_SNIPPET", () => {
  it("перенаправляет все 11 шагов brand-шкалы", () => {
    for (const step of SHADE_STEPS) {
      expect(MANUAL_SNIPPET).toContain(`--color-brand-${step}:`);
    }
  });
});
