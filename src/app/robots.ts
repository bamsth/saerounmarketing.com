import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Yeti", // 네이버 검색 봇
        allow: "/",
        disallow: "/thank-you",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/thank-you",
      },
    ],
    sitemap: "https://saerounmarketing.com/sitemap.xml",
  };
}
