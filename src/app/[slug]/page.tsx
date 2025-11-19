import { client } from "@/sanity/lib/client";
import { PageBuilder } from "@/components/page-builder/page-builder";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PAGE_QUERY, PAGES_QUERY } from "@/sanity/lib/queries";

export const revalidate = false;

async function getPage(slug: string) {
  return client.fetch(
    PAGE_QUERY,
    { slug },
    {
      next: {
        tags: ["page", `page:${slug}`],
      },
    },
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const page = await getPage(slug);
  if (!page) {
    return {};
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || "",
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(PAGES_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <PageBuilder sections={page.pageBuilder} />
    </main>
  );
}
