import type { Metadata } from "next";
import { Header } from "@/components/header";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Footer } from "@/components/footer";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = false;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

async function getSiteSettings() {
  return client.fetch(
    SITE_SETTINGS_QUERY,
    {},
    {
      next: {
        tags: ["site-settings"],
      },
    },
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const siteName = settings?.siteName || "Mi sitio";
  const seo = settings?.seo;

  const defaultTitle = seo?.metaTitle || siteName;
  const description = seo?.metaDescription || "";

  const imageUrl = seo?.metaImage ? urlFor(seo?.metaImage).url() : "";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      type: "website",
      //locale: "en_US",
      url: siteUrl,
      siteName,
      title: defaultTitle,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
