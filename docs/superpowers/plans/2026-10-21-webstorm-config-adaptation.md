# План: адаптация проекта под шаблон webstorm-config

Дата: 2026-10-21
Источник требований: [stsgs1980/webstorm-config](https://github.com/stsgs1980/webstorm-config)

> Решение про Bun в таблице ниже отменено планом
> [2026-10-21-sandbox-decoupling-cleanup.md](2026-10-21-sandbox-decoupling-cleanup.md): после удаления
> песочницной оркестрации проект переведён на npm.

## Цель

Привести проект «Untitled Theming palette» к требованиям шаблона `webstorm-config`:
линтеры, Prettier, Stylelint, markdownlint, TypeScript, Husky + lint-staged + commitlint,
Vitest, анти-монолит, AI Rules, документация, CI.

## Решения

| Решение                                                | Обоснование                                          |
| ------------------------------------------------------ | ---------------------------------------------------- |
| Пакетный менеджер остаётся Bun                         | `bun.lock` и `.zscripts/*.sh` заточены под Bun       |
| ESLint-конфиг шаблона лежит в `eslint.config.mjs`      | В проекте нет `"type": "module"` для JS-файлов       |
| `src/components/ui/**` исключены из проверки длины     | Вендорный код shadcn/ui, рефакторинг вне задачи      |
| `tsconfig.json` расширяет `tsconfig.base.json` шаблона | Сохраняем Next-часть (`plugins`, `paths`, типы)      |
| CI переведён на Bun                                    | Совпадает с локальным toolchain                      |
| Prettier форматирует весь `src/`                       | Double quotes, semicolons, trailing commas, 120 cols |

## Шаги

1. Скопировать конфиги шаблона: `.editorconfig`, `.prettierrc`, `.prettierignore`,
   `.stylelintrc.json`, `.markdownlint.json`, `.gitattributes`, `.npmrc`, `.nvmrc`,
   `tsconfig.base.json`, `vitest.config.ts`.
2. Скопировать `eslint-parsers/`, `eslint-processors/`, `eslint-rules/`, шаблонные
   `scripts/check-file-length.ts`, `scripts/check-docs.ts`, `scripts/generate-changelog.ts`
   и тесты `tests/*.test.mjs`.
3. Заменить ESLint-конфиг на шаблонный + правила Next.js.
4. Объединить `tsconfig.json` с базой шаблона.
5. `package.json`: имя, описание, engines, commitlint, lint-staged, скрипты шаблона,
   devDependencies шаблона, `@next/eslint-plugin-next`.
6. Husky: `.husky/commit-msg`, `.husky/pre-commit`, `.husky/pre-push` (на Bun).
7. Vitest: `vitest.config.ts` + тесты проекта.
8. Рефакторинг под анти-монолит: `palette-showcase.tsx` и `palettes.ts`.
9. Исключение `src/components/ui/**` в `scripts/check-file-length.ts`.
10. Prettier-форматирование, затем починка линтеров.
11. Документация: `README.md` (из `README.template.md`), `docs/*`, `CHANGELOG.md`,
    `SECURITY.md`, `LICENSE`, `.aiassistant/rules/AI Rules.md`, `.idea/*`.
12. CI: `.github/workflows/ci.yml`, `.github/dependabot.yml`.
13. `.gitignore` — объединить с шаблонным.
14. Проверка: `lint`, `typecheck`, `lint:css`, `lint:md`, `format:check`, `test`,
    `check:file-length`, `check:docs` + сборка и запуск проекта.

## Проверка готовности

- [ ] `bun run lint` — без ошибок и предупреждений (`--max-warnings=0`)
- [ ] `bun run typecheck` — без ошибок
- [ ] `bun run lint:css` — без ошибок
- [ ] `bun run lint:md` — без ошибок
- [ ] `bun run format:check` — без ошибок
- [ ] `bun run test` — тесты проходят
- [ ] `bun run check:file-length` — без нарушений
- [ ] `bun run check:docs` — документация согласована с конфигами
- [ ] `bun run build` и `bun run start` — приложение работает
