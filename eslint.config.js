import js from "@eslint/js";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.stylisticTypeChecked],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: react.configs.all,
      "@stylistic/jsx": stylisticJsx,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@stylistic/jsx/jsx-self-closing-comp": "error",
    },
  },
);
