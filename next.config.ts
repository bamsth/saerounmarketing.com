import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → non-www 리다이렉트 (중복 페이지 문제 해결)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.saerounmarketing.com" }],
        destination: "https://saerounmarketing.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
