import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const revalidate = false;

const locales = routing.locales;

type TranslationEntry = {
  _key: string | null;
  language: string | null;
  ref: string | null;
};

type TranslationGroup = {
  translations: TranslationEntry[] | null;
};

/**
 * Build a lookup: docId → { locale: docId, locale: docId }
 * from translation.metadata documents.
 */
function buildTranslationMap(groups: TranslationGroup[]) {
  const map = new Map<string, Map<string, string>>();

  for (const group of groups) {
    if (!group.translations) continue;

    // Collect all refs in this translation group
    // Some entries use `language` field, others use `_key` as the locale
    const peers = new Map<string, string>();
    for (const t of group.translations) {
      const locale = t.language || t._key;
      if (locale && t.ref) {
        peers.set(locale, t.ref);
      }
    }

    // Each doc in this group gets the full peer map
    for (const ref of peers.values()) {
      map.set(ref, peers);
    }
  }

  return map;
}

type DocWithSlug = {
  _id: string | null;
  slug: string | null;
  parentSlug?: string | null;
  language: string | null;
  _updatedAt?: string | null;
};

/**
 * Given a document, its path builder, and the translation map,
 * produce alternates { languages: { en: url, es: url } }.
 */
function resolveAlternates(
  doc: DocWithSlug,
  allDocs: DocWithSlug[],
  translationMap: Map<string, Map<string, string>>,
  pathBuilder: (d: DocWithSlug) => string,
) {
  const languages: Record<string, string> = {};

  if (!doc._id) return undefined;

  const peers = translationMap.get(doc._id);

  if (peers) {
    // Build a quick lookup of id → doc
    const docsById = new Map(
      allDocs.filter((d) => d._id).map((d) => [d._id!, d]),
    );

    for (const [locale, refId] of peers) {
      const peerDoc = docsById.get(refId);
      if (peerDoc && peerDoc.language && peerDoc.slug) {
        languages[locale] = `${siteUrl}/${peerDoc.language}/${pathBuilder(peerDoc)}`;
      }
    }
  } else {
    // No translation group — self-reference only
    if (doc.language && doc.slug) {
      languages[doc.language] = `${siteUrl}/${doc.language}/${pathBuilder(doc)}`;
    }
  }

  return Object.keys(languages).length > 0 ? { languages } : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages, posts, categories, translations } = await client.fetch(
    SITEMAP_QUERY,
    {},
    { next: { tags: ["sitemap"] } },
  );

  const now = new Date();
  const translationMap = buildTranslationMap(translations || []);

  // Homepage — one entry per locale with cross-locale alternates
  const homepageAlternates: Record<string, string> = {};
  for (const locale of locales) {
    homepageAlternates[locale] = `${siteUrl}/${locale}`;
  }

  const homepage: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: now,
    alternates: { languages: homepageAlternates },
  }));

  // Pages
  const allPages = (pages || []) as DocWithSlug[];
  const pagePath = (d: DocWithSlug) =>
    d.parentSlug ? `${d.parentSlug}/${d.slug}` : `${d.slug}`;

  const pageEntries: MetadataRoute.Sitemap = allPages.flatMap((page) => {
    if (!page.language || !page.slug) return [];

    return [
      {
        url: `${siteUrl}/${page.language}/${pagePath(page)}`,
        lastModified: page._updatedAt ? new Date(page._updatedAt) : now,
        alternates: resolveAlternates(page, allPages, translationMap, pagePath),
      },
    ];
  });

  // Blog posts
  const allPosts = (posts || []) as DocWithSlug[];
  const postPath = (d: DocWithSlug) => `blog/${d.slug}`;

  const postEntries: MetadataRoute.Sitemap = allPosts.flatMap((post) => {
    if (!post.language || !post.slug) return [];

    return [
      {
        url: `${siteUrl}/${post.language}/${postPath(post)}`,
        lastModified: post._updatedAt ? new Date(post._updatedAt) : now,
        alternates: resolveAlternates(post, allPosts, translationMap, postPath),
      },
    ];
  });

  // Blog categories
  const allCats = (categories || []) as DocWithSlug[];
  const catPath = (d: DocWithSlug) => `blog/category/${d.slug}`;

  const categoryEntries: MetadataRoute.Sitemap = allCats.flatMap((cat) => {
    if (!cat.language || !cat.slug) return [];

    return [
      {
        url: `${siteUrl}/${cat.language}/${catPath(cat)}`,
        lastModified: now,
        alternates: resolveAlternates(cat, allCats, translationMap, catPath),
      },
    ];
  });

  return [...homepage, ...pageEntries, ...postEntries, ...categoryEntries];
}
