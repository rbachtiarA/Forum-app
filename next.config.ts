import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xeizuicyddjyjrsakqkj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/avatar/**",
      },
    ]
  }
};

export default nextConfig;
