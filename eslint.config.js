const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["node_modules/**", "output.css"]
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^(addItem|removeItem|bookNow)$"
        }
      ]
    }
  }
];
