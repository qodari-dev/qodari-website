import { Post } from "@/components/blog/post";
import { client } from "@/sanity/lib/client";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = false;

async function getPost(slug: string) {
  return client.fetch(
    POST_QUERY,
    { slug },
    {
      next: {
        tags: ["post", `post:${slug}`],
      },
    },
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || "",
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(POSTS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}
