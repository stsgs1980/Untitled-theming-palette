# Untitled Theming palette

[![CI][ci-badge]][ci-workflow]
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22.22.2-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescript.org/)
[![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3.svg)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.x-F7B93E.svg)](https://prettier.io/)
[![Stylelint](https://img.shields.io/badge/Stylelint-17.x-263227.svg)](https://stylelint.io/)

> **Status**: ACTIVE
> **Last Updated**: 2026-10-21

## Overview

Шоукейс всей палитры Untitled UI React для CLI-флага `init --color`: 23 палитры
(фирменная `brand` и 22 встроенные палитры Tailwind) по 11 оттенков (50–950) с HEX-кодами
и готовыми CLI-командами. Каждый оттенок и каждая команда копируются в буфер обмена в один клик.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Docs](#docs)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Features

- 23 палитры × 11 оттенков = 253 цвета с HEX-кодами и категориями (тёплые, холодные, нейтральные).
- Копирование HEX-кода оттенка, CLI-команды палитры и сниппета `theme.css` в один клик.
- Поиск по имени и русской подписи палитры, фильтр по категории, empty-state без результатов.
- Переключение светлой и тёмной темы (next-themes, класс `.dark`).
- FAQ-аккордеон без `useId`: статические id исключают расхождение SSR и клиента.
- Ручной сценарий настройки темы через перенаправление `--color-brand-*` в `theme.css`.

## Tech Stack

- **Language**: TypeScript (strict)
- **Framework**: Next.js 16 (App Router, Turbopack), React 19
- **Styling**: Tailwind CSS 4 (CSS-first конфигурация, `@theme inline`)
- **UI**: shadcn/ui (badge, button, input, sonner), Radix Slot, lucide-react, next-themes
- **Linting**: ESLint (flat config шаблона), Stylelint, markdownlint, Prettier
- **Testing**: Vitest
- **Hooks**: Husky, lint-staged, Commitlint

## Getting Started

### Prerequisites

- Node.js >= 22.22.2 (в CI и локально — 24.15.0 из `.nvmrc`)
- npm >= 10.9.0

Pre-commit останавливается на первой ошибке: сначала `lint-staged`, затем проверка длины файлов.
Перед пушем pre-push дополнительно прогоняет `npm run typecheck` и `npm test`.

### Installation

```bash
git clone <repository-url>
cd "Untitled Theming pallete"
npm install
```

### Запуск

```bash
npm run dev    # http://localhost:3000
npm run build  # продакшен-сборка
npm start      # продакшен-сервер
```

### CHANGELOG.md

`CHANGELOG.md` генерируется из conventional commits командой `npm run changelog`.
Запускайте её перед пушем в `main`: CI проверяет свежесть файла на ветке `main` (джоба `changelog`).

IDE: [docs/webstorm.md](docs/webstorm.md) (импорт code style, on save, анализ при коммите — **вручную**).

## Scripts

| Команда                     | Описание                           |
| --------------------------- | ---------------------------------- |
| `npm run dev`               | Dev-сервер Next.js на порту 3000   |
| `npm run build`             | Продакшен-сборка                   |
| `npm start`                 | Продакшен-сервер                   |
| `npm run lint`              | ESLint                             |
| `npm run typecheck`         | TypeScript (`tsc --noEmit`)        |
| `npm run lint:css`          | Stylelint                          |
| `npm run lint:md`           | markdownlint                       |
| `npm run format`            | Prettier (запись)                  |
| `npm run format:check`      | Prettier (проверка, как в CI)      |
| `npm run check:file-length` | Проверка лимита 250 строк          |
| `npm run check:docs`        | Сверка доков с конфигами (шаблон)  |
| `npm test`                  | Vitest                             |
| `npm run test:watch`        | Vitest (watch)                     |
| `npm run test:coverage`     | Vitest + coverage                  |
| `npm run changelog`         | Генерация CHANGELOG.md из коммитов |

## Docs

| Документ                                      | О чём                                 |
| --------------------------------------------- | ------------------------------------- |
| [getting-started.md](docs/getting-started.md) | Фреймворк, `src/`, Tailwind, проверка |
| [kickoff.md](docs/kickoff.md)                 | Стартовый промт для AI Assistant      |
| [webstorm.md](docs/webstorm.md)               | Настройка WebStorm                    |
| [testing.md](docs/testing.md)                 | Vitest, `jsdom`, Testing Library      |
| [markdown.md](docs/markdown.md)               | Правила оформления `.md`              |

## Architecture

- `src/app/` — маршруты Next.js (главная страница и layout).
- `src/components/showcase/` — секции шоукейса (шапка, hero, сетка палитр, ручная настройка,
  FAQ, футер) и хуки состояния.
- `src/lib/palettes/` — данные палитр: типы, категории (brand/warm/cool/neutral), порядок вывода,
  CLI-хелпер и публичный API модуля.
- `src/components/ui/` — компоненты shadcn/ui, которые использует проект.
- `scripts/` — инструменты шаблона: проверка длины файлов, сверка доков, генерация changelog.

## Contributing

1. `git checkout -b feat/your-feature`
2. `git commit -m "feat: add your feature"`
3. `git push origin feat/your-feature`

## Conventions

Стиль кода: 2 пробела, точка с запятой, двойные кавычки, trailing commas,
JSDoc для публичного API, `const`/`let`. Лимит файла — 250 строк (тесты исключены).
См. `.aiassistant/rules/AI Rules.md`.

## License

MIT

[ci-badge]: https://github.com/stsgs1980/untitled-theming-palette/actions/workflows/ci.yml/badge.svg
[ci-workflow]: https://github.com/stsgs1980/untitled-theming-palette/actions/workflows/ci.yml
