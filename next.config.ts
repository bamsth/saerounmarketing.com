import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 정적 export 시 필요
  },
  // www → non-www 리다이렉트는 Cloudflare에서 처리
};

export default nextConfig;
