module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: [],
  rules: {
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".tsx", ".ts", ".js", "jsx"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      { ts: "never", tsx: "never" },
    ],
  },
};
