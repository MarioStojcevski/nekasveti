import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build a self-contained server bundle for small Docker images.
  output: "standalone",
};

export default nextConfig;
