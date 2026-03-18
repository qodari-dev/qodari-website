import type { Locale } from "@/i18n/routing";
import { client } from "./client";
import { urlFor } from "./image";
import { SITE_SETTINGS_QUERY } from "./queries";

export async function getSiteSettings(locale: Locale) {
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

/**
 * Returns the global OG image URL from site settings, or undefined.
 * Pages can use this as fallback when they don't have their own OG image.
 */
export async function getGlobalOgImage(locale: Locale) {
  const settings = await getSiteSettings(locale);
  const metaImage = settings?.seo?.metaImage;
  return metaImage ? urlFor(metaImage).url() : undefined;
}
