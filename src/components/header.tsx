"use client";

import { Link as LocalizedLink, usePathname } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import { resolveLink } from "@/sanity/lib/resolve-link";
import { SITE_SETTINGS_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { isExternalHref } from "@/utils/is-external-href";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

function HeaderAnchor({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        rel="noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  return (
    <LocalizedLink href={href} className={className} onClick={onClick}>
      {label}
    </LocalizedLink>
  );
}

export function Header({ settings }: { settings: SITE_SETTINGS_QUERY_RESULT }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    announcementLink,
    announcementText,
    headerNav,
    headerPrimaryCta,
    headerSecondaryCta,
    logo,
    siteName,
  } = settings || {};
  const pathname = usePathname() || "/";

  const navLinks = (headerNav ?? [])
    .map(resolveLink)
    .filter((item) => item !== null);
  const primaryCta = headerPrimaryCta ? resolveLink(headerPrimaryCta) : null;
  const secondaryCta = headerSecondaryCta
    ? resolveLink(headerSecondaryCta)
    : null;
  const announcement = announcementLink ? resolveLink(announcementLink) : null;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinkClasses = cn(
    "relative text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors duration-200",
    "text-(--brand-deep-navy) hover:text-(--text-primary)",
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-[rgba(255,255,255,0.92)] text-(--text-primary) transition-colors duration-200">
      {announcementText && (
        <div className="border-b border-black/6 bg-(--surface-alt) px-4 py-1.5 text-center text-[10px] leading-[1.35] font-medium tracking-[0.02em] text-(--text-primary) sm:text-[11px] sm:leading-normal sm:py-2">
          <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-2.5">
            <span>{announcementText}</span>
            {announcement?.href ? (
              <HeaderAnchor
                href={announcement.href}
                label={announcement.label}
                className="inline-flex items-center gap-1 font-bold text-(--text-primary) transition-colors hover:text-(--brand-primary)"
              />
            ) : null}
          </div>
        </div>
      )}

      <div className="site-container flex items-center justify-between gap-4 py-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:py-3.5">
        <LocalizedLink
          href="/"
          className="flex min-w-0 items-center gap-3 lg:justify-self-start"
        >
          {logo ? (
            <div className="relative h-14 w-40 sm:h-16 sm:w-44 lg:h-18 lg:w-auto">
              <Image
                src={urlFor(logo).width(640).fit("max").auto("format").url()}
                alt={siteName || "Qodari"}
                width={40}
                height={10}
                className="object-contain object-left w-auto h-full"
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 256px, 224px"
                priority
              />
            </div>
          ) : (
            <span className="text-xl font-semibold uppercase tracking-[0.28em] text-(--text-primary)">
              {siteName || "Qodari"}
            </span>
          )}
        </LocalizedLink>

        {navLinks.length > 0 ? (
          <nav className="hidden items-center justify-self-center gap-6 xl:gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                !isExternalHref(link.href) &&
                (pathname === link.href ||
                  pathname.startsWith(`${link.href}/`));

              return (
                <HeaderAnchor
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  className={cn(
                    navLinkClasses,
                    isActive && "text-(--brand-primary)",
                  )}
                />
              );
            })}
          </nav>
        ) : (
          <div className="hidden lg:block" />
        )}

        <div className="hidden items-center justify-self-end gap-3 xl:gap-4 lg:flex">
          <LanguageSwitcher />

          <div className="flex items-center gap-3">
            {secondaryCta?.href ? (
              <HeaderAnchor
                href={secondaryCta.href}
                label={secondaryCta.label}
                className="brand-button-secondary px-4 py-2 text-sm font-semibold"
              />
            ) : null}
            {primaryCta?.href ? (
              <HeaderAnchor
                href={primaryCta.href}
                label={primaryCta.label}
                className="brand-button-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
              />
            ) : null}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white/92 text-(--text-primary) shadow-[0_6px_18px_rgba(16,24,40,0.06)] transition-colors lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-100%)] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[rgba(247,249,252,0.82)] backdrop-blur-[6px]"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="relative h-full overflow-y-auto px-4 pb-5 pt-3">
            <div className="brand-panel mx-auto max-w-md overflow-hidden rounded-3xl p-4">
              {navLinks.length > 0 && (
                <nav className="flex flex-col gap-0.5">
                  {navLinks.map((link) => {
                    const isActive =
                      !isExternalHref(link.href) &&
                      (pathname === link.href ||
                        pathname.startsWith(`${link.href}/`));

                    return (
                      <HeaderAnchor
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-2 text-[15px] font-medium transition-colors",
                          "text-(--text-body) hover:bg-black/4 hover:text-(--text-primary)",
                          isActive && "bg-black/4 text-(--brand-primary)",
                        )}
                      />
                    );
                  })}
                </nav>
              )}

              <div className="mt-3 flex flex-col gap-2.5">
                <LanguageSwitcher className="self-start" />

                {secondaryCta?.href ? (
                  <HeaderAnchor
                    href={secondaryCta.href}
                    label={secondaryCta.label}
                    onClick={() => setIsMenuOpen(false)}
                    className="brand-button-secondary flex items-center justify-center px-4 py-3 text-sm font-semibold"
                  />
                ) : null}

                {primaryCta?.href ? (
                  <HeaderAnchor
                    href={primaryCta.href}
                    label={primaryCta.label}
                    onClick={() => setIsMenuOpen(false)}
                    className="brand-button-primary flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
