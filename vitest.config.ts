import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "node",
    passWithNoTests: true,
    // Test files: src/**/*.test.ts(x) — tests of the project code.
    // tests/** — tooling tests shipped with the template itself.
    include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx,mjs}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
