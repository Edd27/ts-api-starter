import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-console": "error",
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".eslintrc.json",
      ".prettierrc.json",
      ".husky",
      "package-lock.json",
      ".lintstagedrc.js",
    ],
  },
  eslintConfigPrettier,
];
