import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "free95417.wordpress.com",
      },
    ],
  },
};

export default nextConfig;
