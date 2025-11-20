import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const isSupported = routing.locales.includes(requested as Locale);
  const locale = (
    isSupported ? requested : routing.defaultLocale
  ) as (typeof routing)["defaultLocale"];

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
