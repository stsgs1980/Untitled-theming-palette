import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы Tailwind без конфликтов.
 * @param inputs - значения класса или массивы значений
 * @returns итоговая строка классов
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
