import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { routing, type Locale } from "@/i18n/routing";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";

export const revalidate = false;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

async function getSiteSettings(locale: Locale) {
  return client.fetch(
    SITE_SETTINGS_QUERY,
    { language: locale },
    {
      next: {
        tags: [`site-settings`, `site-settings:${locale}`],
      },
    },
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const settings = await getSiteSettings(locale);

  const siteName = settings?.siteName || "Qodari";
  const seo = settings?.seo;

  const defaultTitle = seo?.metaTitle || siteName;
  const description = seo?.metaDescription || "";

  const imageUrl = seo?.metaImage ? urlFor(seo?.metaImage).url() : "";
  const ogLocale = locale === "es" ? "es_ES" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `${siteUrl}/${locale}`,
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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const settings = await getSiteSettings(locale);
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </NextIntlClientProvider>
    </>
  );
}
