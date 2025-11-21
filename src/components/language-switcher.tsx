"use client";

import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";

export function LanguageSwitcher() {
  const params = useParams<{ locale: string }>();

  const currentLocale = (params.locale || routing.defaultLocale) as Locale;

  return (
    <div className="flex items-center gap-2 text-sm">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href="/"
          locale={locale}
          className={
            locale === currentLocale
              ? "font-semibold underline"
              : "opacity-60 hover:opacity-100"
          }
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
