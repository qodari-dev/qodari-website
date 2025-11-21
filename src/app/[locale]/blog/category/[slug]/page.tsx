import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { client } from "@/sanity/lib/client";
import {
  BLOG_CATEGORY_QUERY,
  BLOG_CATEGORIES_QUERY,
  POSTS_PER_PAGE,
  BLOG_CATEGORY,
} from "@/sanity/lib/queries";
import { PostCard } from "@/components/blog/post-card";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { hasLocale } from "next-intl";

export const revalidate = false;

async function getCategoryPosts(locale: string, slug: string, page: number) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return client.fetch(
    BLOG_CATEGORY_QUERY,
    { slug, start, end, language: locale },
    {
      next: {
        tags: ["post-index", `category:${locale}:${slug}`],
      },
    },
  );
}

export async function generateStaticParams() {
  const categories = await client.fetch(BLOG_CATEGORIES_QUERY);

  return categories.map((cat) => ({
    locale: cat.language,
    slug: cat.slug,
  }));
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const category = await client.fetch(BLOG_CATEGORY, {
    slug,
    language: locale,
  });

  if (!category) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "Metadata.BlogCategory",
  });

  const title =
    t("title", { category: category.title ?? "" }) ||
    `Blog - ${category.title}`;
  const description =
    t("description", { category: category.title ?? "" }) ||
    `Artículos publicados en la categoría ${category.title}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: Props) {
  const { locale, slug } = await params;
  const { page } = await searchParams;

  const currentPage = (() => {
    const n = page ? Number(page) : 1;
    return Number.isNaN(n) || n < 1 ? 1 : n;
  })();

  const t = await getTranslations({ locale, namespace: "BlogCategory" });

  const categoryData = await getCategoryPosts(locale, slug, currentPage);

  if (!categoryData) {
    notFound();
  }

  const { title, posts, total } = categoryData;
  const hasMore = currentPage * POSTS_PER_PAGE < total;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-gray-600">
            {t("subtitle", { title: title ?? "" })}
          </p>
        </div>
        <Link
          href="/blog"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {t("back")}
        </Link>
      </div>

      {(!posts || posts.length === 0) && (
        <p className="text-gray-600">{t("empty")}</p>
      )}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard {...post} />
          </li>
        ))}
      </ul>

      {total > POSTS_PER_PAGE && (
        <div className="mt-10 flex items-center justify-center gap-4">
          {currentPage > 1 && (
            <Link
              href={`/blog/category/${slug}?page=${currentPage - 1}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {t("prev")}
            </Link>
          )}
          {hasMore && (
            <Link
              href={`/blog/category/${slug}?page=${currentPage + 1}`}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              {t("more")}
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
