import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

/**
 * Build `alternates` metadata for a page:
 * - `canonical`: absolute URL for the current locale
 * - `languages`: hreflang mapping for all locales
 *
 * @param locale  Current locale (e.g. "en")
 * @param path    Path after the locale prefix, WITHOUT leading slash
 *                (e.g. "blog/my-post", "solutions/ai"). Empty string for homepage.
 */
export function buildAlternates(locale: string, path?: string) {
  const suffix = path ? `/${path}` : "";
  const canonical = `${siteUrl}/${locale}${suffix}`;
  const languages: Record<string, string> = {};

  for (const loc of routing.locales) {
    languages[loc] = `${siteUrl}/${loc}${suffix}`;
  }

  // x-default points to the default locale variant
  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${suffix}`;

  return { canonical, languages };
}
