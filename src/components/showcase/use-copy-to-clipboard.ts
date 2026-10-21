"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

/** Функция копирования текста в буфер обмена. */
export type CopyFn = (text: string, id: string, message?: string) => void;

/** Состояние копирования, которым управляет хук. */
export interface CopyState {
  /** Копирует текст в буфер обмена и показывает тост. */
  copy: CopyFn;
  /** Идентификатор последнего скопированного элемента. */
  copiedId: string | null;
}

/**
 * Копирование текста в буфер обмена с тостом и подсветкой скопированного элемента.
 * @returns функцию копирования и идентификатор последнего скопированного элемента
 */
export function useCopyToClipboard(): CopyState {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = useCallback<CopyFn>(async (text, id, message) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success(message ?? "Скопировано", { description: text });
      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 1600);
    } catch {
      toast.error("Не удалось скопировать в буфер обмена");
    }
  }, []);

  return { copy, copiedId };
}
