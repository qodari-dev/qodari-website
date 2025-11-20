// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, posts, categories } = await client.fetch(
    SITEMAP_QUERY,
    {},
    {
      next: {
        tags: ["sitemap"],
      },
    },
  );

  const now = new Date();

  const homepage: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
    },
  ];

  const pageEntries: MetadataRoute.Sitemap = (pages || []).map((page) => {
    const path = page.parentSlug
      ? `/${page.parentSlug}/${page.slug}`
      : `/${page.slug}`;

    return {
      url: `${siteUrl}${path}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : now,
    };
  });

  const postEntries: MetadataRoute.Sitemap = (posts || []).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : now,
  }));

  const categoryEntries: MetadataRoute.Sitemap = (categories || []).map(
    (cat) => ({
      url: `${siteUrl}/blog/category/${cat.slug}`,
      lastModified: now,
    }),
  );

  return [...homepage, ...pageEntries, ...postEntries, ...categoryEntries];
}
