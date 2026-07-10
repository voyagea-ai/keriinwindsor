import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { cities } from "@/lib/cities";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.domain, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.domain}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...products.map((p) => ({
      url: `${site.domain}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${site.domain}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...cities.map((c) => ({
      url: `${site.domain}/delivery/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${site.domain}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${site.domain}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${site.domain}/checkout`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.domain}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${site.domain}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
