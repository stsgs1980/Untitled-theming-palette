import type { ReactElement, ReactNode } from "react";

/**
 * Инлайн-код в тексте: моноширинный код с фоном.
 * @param props - содержимое чипа
 * @returns элемент с подсвеченным фрагментом кода
 */
export function CodeChip({ children }: { children: ReactNode }): ReactElement {
  return <code className="bg-muted text-foreground rounded px-1 py-0.5 font-mono text-[0.85em]">{children}</code>;
}
