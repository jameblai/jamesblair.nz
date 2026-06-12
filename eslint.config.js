import astro from "eslint-plugin-astro";
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  globalIgnores(["dist/", ".astro/", ".vercel/", "node_modules/"]),
  {
    files: ["**/*.{js,mjs,ts,tsx,astro}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      "astro/no-set-html-directive": "off",
    },
  },
);
