import { MetadataRoute } from "next";

const BASE_URL = "https://saerounmarketing.com";
const LAST_MODIFIED = new Date("2026-03-26");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
