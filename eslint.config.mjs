import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("eslint:recommended"),
  {
    ignores: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.node,
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },
    rules: {
      indent: [
        "error",
        2,
        {
          SwitchCase: 1,
        },
      ],

      "linebreak-style": ["error", "unix"],
      "no-console": 0,
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
];
