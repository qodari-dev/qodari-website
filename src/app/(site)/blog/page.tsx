import { PostCard } from "@/components/blog/post-card";
import { client } from "@/sanity/lib/client";
import {
  BLOG_CATEGORIES_QUERY,
  POSTS_INDEX_QUERY,
  POSTS_PER_PAGE,
} from "@/sanity/lib/queries";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = false;

async function getBlogs(page: number) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  return client.fetch(
    POSTS_INDEX_QUERY,
    { start, end },
    {
      next: {
        tags: ["post-index"],
      },
    },
  );
}

async function getCategories() {
  return client.fetch(
    BLOG_CATEGORIES_QUERY,
    {},
    {
      next: {
        tags: ["post-index"],
      },
    },
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Noticias, artículos y notas sobre desarrollo, productos y proyectos.",
    openGraph: {
      title: "Blog",
      description:
        "Noticias, artículos y notas sobre desarrollo, productos y proyectos.",
    },
  };
}

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: Props) {
  const { page } = await searchParams;

  const currentPage = (() => {
    const n = page ? Number(page) : 1;
    return Number.isNaN(n) || n < 1 ? 1 : n;
  })();

  const [{ posts, total }, categories] = await Promise.all([
    getBlogs(currentPage),
    getCategories(),
  ]);

  const hasMore = currentPage * POSTS_PER_PAGE < total;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-2 text-gray-600">Noticias, artículos y notas.</p>
        </div>

        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="rounded-full border border-gray-200 px-3 py-1 hover:border-gray-400"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {(!posts || posts.length === 0) && (
        <p className="text-gray-600">No hay posts publicados todavía.</p>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.slug}>
            <PostCard {...post} />
          </div>
        ))}
      </div>

      {total > POSTS_PER_PAGE && (
        <div className="mt-10 flex items-center justify-center gap-4">
          {currentPage > 1 && (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              ← Anterior
            </Link>
          )}
          {hasMore && (
            <Link
              href={`/blog?page=${currentPage + 1}`}
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
