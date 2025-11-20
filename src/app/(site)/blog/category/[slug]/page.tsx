import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  BLOG_CATEGORY_QUERY,
  BLOG_CATEGORIES_QUERY,
  POSTS_PER_PAGE,
  BLOG_CATEGORY,
} from "@/sanity/lib/queries";
import { PostCard } from "@/components/blog/post-card";
import { Metadata } from "next";

export const revalidate = false;

async function getCategoryPosts(slug: string, page: number) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return client.fetch(
    BLOG_CATEGORY_QUERY,
    { slug, start, end },
    {
      next: {
        tags: ["post-index"],
      },
    },
  );
}

export async function generateStaticParams() {
  const categories = await client.fetch(BLOG_CATEGORIES_QUERY);

  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const category = await client.fetch(BLOG_CATEGORY, { slug });

  if (!category) {
    return {};
  }

  const title = `Blog - ${category.title}`;
  const description = `Artículos publicados en la categoría ${category.title}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogCategoryPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { page } = await searchParams;

  const currentPage = (() => {
    const n = page ? Number(page) : 1;
    return Number.isNaN(n) || n < 1 ? 1 : n;
  })();

  const categoryData = await getCategoryPosts(slug, currentPage);

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
          <p className="mt-2 text-gray-600">Posts en la categoría {title}.</p>
        </div>
        <Link
          href="/blog"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Volver al blog
        </Link>
      </div>

      {(!posts || posts.length === 0) && (
        <p className="text-gray-600">No hay posts en esta categoría todavía.</p>
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
              ← Anterior
            </Link>
          )}
          {hasMore && (
            <Link
              href={`/blog/category/${slug}?page=${currentPage + 1}`}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Mostrar más
            </Link>
          )}
        </div>
      )}
    </main>
  );
}
