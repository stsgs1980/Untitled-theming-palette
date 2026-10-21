import createPreset from "conventional-changelog-conventionalcommits";

/**
 * Типы коммитов, попадающих в CHANGELOG.
 *
 * В пресете conventionalcommits типы docs, style, chore, refactor, test, build и ci
 * по умолчанию скрыты (effect: hidden) — в changelog попадают только пользовательские
 * feat и fix. В этом репозитории вся работа идёт под служебными типами, поэтому
 * effect: none открывает их.
 */
const TYPES = [
  { type: "feat", section: "Features", effect: "bump" },
  { type: "feature", section: "Features", effect: "bump" },
  { type: "fix", section: "Bug Fixes", effect: "bump" },
  { type: "perf", section: "Performance Improvements", effect: "bump" },
  { type: "revert", section: "Reverts", effect: "bump" },
  { type: "docs", section: "Documentation", effect: "none" },
  { type: "style", section: "Styles", effect: "none" },
  { type: "chore", section: "Chores", effect: "none" },
  { type: "refactor", section: "Code Refactoring", effect: "none" },
  { type: "test", section: "Tests", effect: "none" },
  { type: "build", section: "Build System", effect: "none" },
  { type: "ci", section: "Continuous Integration", effect: "none" },
];

/**
 * Пресет для генерации CHANGELOG.md.
 * @returns конфигурация пресета conventionalcommits с открытыми типами
 */
export default function createChangelogPreset() {
  return createPreset({ types: TYPES });
}
