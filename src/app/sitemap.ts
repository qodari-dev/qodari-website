// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// Un solo GROQ para todo
const SITEMAP_QUERY = `
{
  "pages": *[
    _type == "page" 
    && defined(slug.current)
    && (!defined(seo.noIndex) || seo.noIndex == false)
  ]{
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    _updatedAt
  },

  "posts": *[
    _type == "post" 
    && defined(slug.current) 
    && (!defined(seo.noIndex) || seo.noIndex == false)
  ]{
    "slug": slug.current,
    _updatedAt
  },

  "categories": *[
    _type == "category" 
    && defined(slug.current)
  ]{
    "slug": slug.current
  }
}
`;

// No usamos ISR con segundos, solo tags (webhook)
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

  const pageEntries: MetadataRoute.Sitemap = (pages || []).map(
    (page: { slug: string; parentSlug?: string; _updatedAt?: string }) => {
      const path = page.parentSlug
        ? `/${page.parentSlug}/${page.slug}`
        : `/${page.slug}`;

      return {
        url: `${siteUrl}${path}`,
        lastModified: page._updatedAt ? new Date(page._updatedAt) : now,
      };
    },
  );

  const postEntries: MetadataRoute.Sitemap = (posts || []).map(
    (post: { slug: string; _updatedAt?: string }) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : now,
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = (categories || []).map(
    (cat: { slug: string }) => ({
      url: `${siteUrl}/blog/category/${cat.slug}`,
      lastModified: now,
    }),
  );

  return [...homepage, ...pageEntries, ...postEntries, ...categoryEntries];
}
