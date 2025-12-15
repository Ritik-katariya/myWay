import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Suppress the webpack cache warning for big strings
    config.infrastructureLogging = {
      level: "error",
    };

    return config;
  },
};

export default nextConfig;
