/**
 * CLI-команда для создания проекта с выбранной палитрой.
 * @param name - имя палитры, значение флага `--color`
 * @returns готовая команда для терминала
 */
export function cliCommand(name: string): string {
  return `npx untitledui@latest init --color ${name}`;
}
