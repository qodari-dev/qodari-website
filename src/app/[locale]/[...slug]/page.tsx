import { client } from "@/sanity/lib/client";
import { PageBuilder } from "@/components/page-builder/page-builder";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PAGE_QUERY, PAGES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Locale } from "@/i18n/routing";

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
  const imageUrl = seo?.metaImage ? urlFor(seo?.metaImage).url() : "";

  const meta: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}/${slug.join("/")}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
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
  return slugs.map(({ slug, parentSlug, language }) => ({
    locale: language,
    slug: parentSlug ? [parentSlug, slug] : [slug],
  }));
}

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params;
  const page = await getPage(locale, slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageBuilder locale={locale} sections={page.pageBuilder} />
    </main>
  );
}
