import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Match only the slashless URL; /docs/ must reach the index rewrite.
      { source: "/docs((?!/)$)", destination: "/docs/", permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: "/docs/", destination: "/docs/index.html" }];
  },
};

export default nextConfig;
