module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: 0,
    semi: [2, "always"],
    "space-before-function-paren": 0,
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "multiline-ternary": 0,
    "no-new": 0
  }
};
