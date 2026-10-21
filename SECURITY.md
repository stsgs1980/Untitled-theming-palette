# Security Policy

## Поддерживаемые версии

Шаблон развивается в ветке `main`, исправления выходят в последней версии.
Форки поддерживают себя самостоятельно.

## Как сообщить об уязвимости

Публичные issue для уязвимостей не используйте. Приватный канал:

1. Откройте вкладку `Security` в репозитории.
2. Нажмите `Report a vulnerability` (GitHub Private Vulnerability Reporting).
3. Опишите шаги воспроизведения, влияние и, если есть, предложение по исправлению.

Первый ответ — в течение 7 дней. После исправления информация попадает в `CHANGELOG.md`.

## Что относится к политике безопасности

- Конфигурация инструментов: ESLint (включая `eslint-rules/`), Prettier, Stylelint,
  markdownlint, Vitest, Husky.
- Git-хуки и скрипты: `.husky/`, `scripts/`.
- Шаблоны IDE в `.idea/`, если они генерируют небезопасный или падающий код.
- Workflow `.github/workflows/ci.yml`: утечки секретов, избыточные права.

## Что не относится

- Уязвимости npm-пакетов: сообщайте разработчикам пакета, обновления приходят
  через Dependabot (`.github/dependabot.yml`).
- Настройки форков и приложений, собранных на базе шаблона.

## npm audit

`npm audit --omit=dev` не находит проблем: дерево production-зависимостей чистое.

В полном `npm audit` остаются 11 high. Все они — один транзитивный advisory
`braces` (GHSA-vfj7-8cjw-p6xm, CVE-2026-93687): DoS на глубоко вложенных
brace-паттернах, CWE-674. Пакет приходит в dev-дерево дважды:

- `stylelint` -> `fast-glob` / `globby` / `micromatch` -> `braces`
- `@next/eslint-plugin-next` -> `fast-glob` -> `micromatch` -> `braces`

Исправленной версии `braces` не существует: последний релиз — 3.0.3, и он же
уязвим (`Patched versions: None`). Апстрим--issue `micromatch/braces#70` открыт
и помечен как blocking, но релиз не выпущен; обновление `micromatch`, `fast-glob`,
`globby`, `stylelint` и `@next/eslint-plugin-next` цепочку не разрывает.

Оценка риска для этого репозитория:

- Проблема возникает только если недоверенный ввод управляет glob-паттернами.
  Все паттерны здесь — статические строки из `package.json` и `eslint.config.js`.
- Последствие — падение процесса линтера, а не выполнение кода и не утечка данных.
- В production-зависимостях уязвимости нет: пакет не попадает в сборку приложения.

Меры:

- `overrides` в `package.json` закрывают остальные advisory (`katex`, `smol-toml`,
  `js-yaml`); полный `npm audit` падает с 18 уязвимостей до 11.
- Джоба `audit` в CI проверяет production-дерево: `npm audit --omit=dev --audit-level=high`.
- Dependabot проверяет npm еженедельно, чтобы подхватить фикс `braces` сразу после
  его выхода.
- `overrides` с форком `braces` не применяются: установка из git-ссылки ломает
  воспроизводимость `npm ci`.

## Меры в репозитории

- Включены secret scanning и push protection.
- В CI минимальные права (`contents: read`) и `HUSKY: 0` для чистой установки.
- Dependabot следит за npm-пакетами и GitHub Actions.
