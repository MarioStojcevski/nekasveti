import nextConfig from "eslint-config-next/core-web-vitals";

export default [
  ...nextConfig,
  {
    rules: {
      // Allow any during migration; tighten incrementally.
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
