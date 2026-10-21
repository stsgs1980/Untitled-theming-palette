"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

/**
 * Обёртка над next-themes: переключение светлой и тёмной темы.
 * @param props - свойства провайдера темы и дочерние элементы
 * @returns элемент провайдера темы
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>): React.ReactElement {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
