import type { ReactElement } from "react";

/**
 * Липкий футер страницы со ссылками на документацию.
 * @returns элемент футера
 */
export function SiteFooter(): ReactElement {
  return (
    <footer className="bg-background mt-auto border-t pb-[env(safe-area-inset-bottom)]">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <p>
          Шоукейс палитр по документации{" "}
          <span className="text-foreground font-medium">Untitled UI React · Theming</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            className="hover:text-foreground transition-colors"
            href="https://www.untitledui.com/react"
            target="_blank"
            rel="noreferrer"
          >
            untitledui.com
          </a>
          <a
            className="hover:text-foreground transition-colors"
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
          >
            tailwindcss.com
          </a>
        </div>
      </div>
    </footer>
  );
}
