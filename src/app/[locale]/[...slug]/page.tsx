import { client } from "@/sanity/lib/client";
import { PageBuilder } from "@/components/page-builder/page-builder";
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import { PAGE_QUERY, PAGES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getGlobalOgImage } from "@/sanity/lib/site-settings";
import { buildAlternates } from "@/lib/seo";
import { Locale } from "@/i18n/routing";

// These slugs are reserved for the homepage route ([locale]/page.tsx).
// A 301 redirect to /{locale} prevents duplicate content at /en/home and /es/inicio.
const HOME_SLUGS = new Set(["home", "inicio"]);

export const revalidate = false;

async function getPage(locale: Locale, slug: string[]) {
  try {
    const lastSegment = slug.at(-1);
    if (!lastSegment) return null;

    return client.fetch(
      PAGE_QUERY,
      { slug: lastSegment, language: locale },
      {
        next: {
          tags: ["page", `page:${locale}:${lastSegment}`],
        },
      },
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

type Props = {
  params: Promise<{ locale: Locale; slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  if (slug.length === 1 && HOME_SLUGS.has(slug[0])) {
    permanentRedirect(`/${locale}`);
  }

  const page = await getPage(locale, slug);
  if (!page) {
    return {};
  }

  const seo = page.seo;

  if (!seo?.metaTitle && !seo?.metaDescription && !seo?.metaImage) {
    return {};
  }

  const title = seo?.metaTitle || page.title;
  const description = seo?.metaDescription;
  const pageImage = seo?.metaImage ? urlFor(seo?.metaImage).url() : undefined;
  const imageUrl = pageImage || (await getGlobalOgImage(locale));

  const meta: Metadata = {
    title,
    description,
    alternates: buildAlternates(locale, slug.join("/")),
    openGraph: {
      title,
      description,
      url: `/${locale}/${slug.join("/")}`,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };

  if (seo?.noIndex) {
    meta.robots = {
      index: false,
      follow: false,
    };
  }

  return meta;
}

export async function generateStaticParams() {
  const slugs = await client.fetch(PAGES_QUERY);
  return slugs.flatMap(({ slug, parentSlug, language }) => {
    if (!language) return [];
    // Skip homepage slugs — they are served by [locale]/page.tsx
    if (!parentSlug && HOME_SLUGS.has(slug)) return [];
    return [
      {
        locale: language,
        slug: parentSlug ? [parentSlug, slug] : [slug],
      },
    ];
  });
}

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params;

  // Redirect homepage slugs permanently — /{locale}/home → /{locale}
  if (slug.length === 1 && HOME_SLUGS.has(slug[0])) {
    permanentRedirect(`/${locale}`);
  }

  const page = await getPage(locale, slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageBuilder locale={locale} sections={page.pageBuilder} />
    </>
  );
}
