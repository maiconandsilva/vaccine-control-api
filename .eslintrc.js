const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "class-methods-use-this": OFF,
    "no-console": OFF,
    "no-unused-vars": WARN,
    quotes: [ERROR, "double", {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
  },
};
