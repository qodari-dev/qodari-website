import { PostCard } from "@/components/blog/post-card";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export const revalidate = false;

async function getPosts() {
  return client.fetch(
    POSTS_QUERY,
    {},
    {
      next: {
        tags: ["post", "post-index"],
      },
    },
  );
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">Blog</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard {...post} />
          </li>
        ))}
      </ul>
    </main>
  );
}
