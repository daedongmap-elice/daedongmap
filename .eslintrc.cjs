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
  plugins: ["react", "prettier"],
  rules: {
    "import/extensions": ["off"],
    "import/no-extraneous-dependencies": 0,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "linebreak-style": 0,
  },
  ignorePatterns: ["vite.config.ts"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".d.ts", ".tsx"],
      },
    },
  },
};
