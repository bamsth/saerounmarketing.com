import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://saerounmarketing.com",
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
