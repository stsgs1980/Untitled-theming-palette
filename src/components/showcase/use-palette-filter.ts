"use client";

import { PALETTES, type Palette, type PaletteFilter } from "@/lib/palettes";
import { useMemo, useState } from "react";

/** Состояние фильтрации палитр. */
export interface PaletteFilterState {
  /** Текущий поисковый запрос. */
  query: string;
  /** Обновляет поисковый запрос. */
  setQuery: (query: string) => void;
  /** Выбранная категория палитр. */
  category: PaletteFilter;
  /** Обновляет выбранную категорию. */
  setCategory: (category: PaletteFilter) => void;
  /** Палитры, прошедшие фильтр по запросу и категории. */
  filtered: Palette[];
}

/**
 * Поиск и фильтрация палитр по названию и категории.
 * @returns состояние фильтра и отфильтрованный список палитр
 */
export function usePaletteFilter(): PaletteFilterState {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PaletteFilter>("all");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return PALETTES.filter((palette) => {
      const byCategory = category === "all" || palette.category === category;
      const byQuery = !search || palette.name.includes(search) || palette.label.toLowerCase().includes(search);

      return byCategory && byQuery;
    });
  }, [query, category]);

  return { query, setQuery, category, setCategory, filtered };
}
