import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      ...js.configs.recommended.rules,
      semi: "error",
      "no-unused-vars": ["error", { args: "none" }],
      "no-undef": "error",
    },
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.jest 
      }
    },
  },
]);