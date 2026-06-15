import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a self-contained server bundle for small Docker images.
  output: "standalone",
  // Lint is run separately; don't fail production builds on lint warnings.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
