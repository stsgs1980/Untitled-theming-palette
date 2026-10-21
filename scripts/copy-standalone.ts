import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

/**
 * Копирует статику Next.js и public/ в .next/standalone.
 *
 * Заменяет `cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/`:
 * утилиты cp/tee отсутствуют в shell Bun на Windows, а путь через node/fs работает
 * одинаково на всех платформах.
 * @returns void; завершает процесс с кодом 1, если нет standalone-сборки
 */
function main(): void {
  if (!existsSync(standalone)) {
    process.stderr.write("[FAIL] Не найден .next/standalone - сначала выполните `next build`.\n");
    process.exit(1);
  }

  const staticSrc = join(root, ".next", "static");
  const staticDest = join(standalone, ".next", "static");
  const publicSrc = join(root, "public");
  const publicDest = join(standalone, "public");

  if (existsSync(staticSrc)) {
    mkdirSync(join(standalone, ".next"), { recursive: true });
    cpSync(staticSrc, staticDest, { recursive: true });
    process.stdout.write("[OK] .next/static -> .next/standalone/.next/static\n");
  }

  if (existsSync(publicSrc)) {
    cpSync(publicSrc, publicDest, { recursive: true });
    process.stdout.write("[OK] public -> .next/standalone/public\n");
  }

  process.stdout.write("[OK] Standalone-артефакты готовы\n");
}

main();
