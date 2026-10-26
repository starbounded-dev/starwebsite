import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: "/docs", destination: "/docs/", permanent: true },
      { source: "/docs/index.html", destination: "/docs/", permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: "/docs/", destination: "/docs/index.html" }];
  },
};

export default nextConfig;
