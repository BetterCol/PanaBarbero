import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: !!process.env.CI,
  },
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
