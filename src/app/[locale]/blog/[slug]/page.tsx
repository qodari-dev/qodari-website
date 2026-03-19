import { Post } from "@/components/blog/post";
import { routing } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getGlobalOgImage } from "@/sanity/lib/site-settings";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const revalidate = false;

async function getPost(locale: string, slug: string) {
  return client.fetch(
    POST_QUERY,
    { slug, language: locale },
    {
      next: {
        tags: ["post", `post:${locale}:${slug}`],
      },
    },
  );
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const post = await getPost(locale, slug);
  if (!post) return {};

  const seo = post.seo;

  if (!seo?.metaTitle && !seo?.metaDescription && !seo?.metaImage) {
    return {};
  }

  const title = seo?.metaTitle || post.title || "";
  const description = seo?.metaDescription || post.excerpt || "";
  const pageImage = seo?.metaImage ? urlFor(seo?.metaImage).url() : undefined;
  const imageUrl = pageImage || (await getGlobalOgImage(locale as Locale));

  const meta: Metadata = {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `/${locale}/blog/${slug}`,
      publishedTime: post.publishedAt || undefined,
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
  const slugs = await client.fetch(POSTS_QUERY);
  return slugs.flatMap(({ slug, language }) =>
    language
      ? [
          {
            locale: language,
            slug,
          },
        ]
      : [],
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </div>
  );
}
