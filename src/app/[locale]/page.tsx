import { PageBuilder } from "@/components/page-builder/page-builder";
import { routing, type Locale } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

export const revalidate = false;

const HOME_SLUG_BY_LOCALE: Record<Locale, string> = {
  en: "home",
  es: "inicio",
};

async function getHomePage(locale: Locale) {
  const slug = HOME_SLUG_BY_LOCALE[locale];

  return client.fetch(
    PAGE_QUERY,
    { slug, language: locale },
    {
      next: {
        tags: ["page", `page:${locale}:${slug}`],
      },
    },
  );
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const locale = rawLocale as Locale;
  const page = await getHomePage(locale);

  if (!page || !page.seo) {
    return {};
  }

  const seo = page.seo;
  const title = seo.metaTitle || page.title;
  const description = seo.metaDescription || "";
  const imageUrl = seo.metaImage ? urlFor(seo.metaImage).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const page = await getHomePage(locale);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageBuilder locale={locale} sections={page.pageBuilder} />
    </main>
  );
}
