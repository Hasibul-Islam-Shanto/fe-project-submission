import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "waltonplaza.com.bd",
      },
      {
        protocol: "https",
        hostname: "www.waltonplaza.com.bd",
      },
      {
        protocol: "https",
        hostname: "cdn.waltonplaza.com.bd",
      },
      {
        protocol: "https",
        hostname: "devapi.waltonplaza.com.bd",
      },
      {
        protocol: "https",
        hostname: "api.waltonplaza.com.bd",
      },
    ],
  },
};

export default nextConfig;
