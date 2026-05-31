import type { MetadataRoute } from "next";
import { getAvailableProperties } from "@/lib/store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alhubishi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/properties", "/map", "/services", "/about", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const properties = getAvailableProperties().map((p) => ({
    url: `${siteUrl}/properties/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...properties];
}
