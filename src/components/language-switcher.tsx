"use client";

import { cn } from "@/utils/cn";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useParams } from "next/navigation";

type LanguageSwitcherProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function LanguageSwitcher({
  className,
  tone = "light",
}: LanguageSwitcherProps) {
  const params = useParams<{ locale: string }>();

  const currentLocale = (params.locale || routing.defaultLocale) as Locale;
  const activeClasses =
    "bg-(--brand-primary) text-white shadow-[0_10px_24px_rgba(63,100,176,0.28)]";
  const inactiveClasses =
    tone === "dark"
      ? "text-white/70 hover:text-white"
      : "text-(--text-muted) hover:text-(--text-primary)";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
        tone === "dark"
          ? "border-white/15 bg-white/5"
          : "border-black/5 bg-black/[0.02]",
        className,
      )}
    >
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href="/"
          locale={locale}
          className={cn(
            "rounded-full px-2.5 py-1.5 transition-colors",
            locale === currentLocale
              ? activeClasses
              : inactiveClasses,
          )}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
