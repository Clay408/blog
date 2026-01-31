const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      ".contentlayer/**",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

module.exports = eslintConfig;
