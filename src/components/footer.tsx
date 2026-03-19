"use client";

import { Link as LocalizedLink } from "@/i18n/navigation";
import { resolveLink } from "@/sanity/lib/resolve-link";
import { SITE_SETTINGS_QUERY_RESULT } from "@/sanity/types";
import { isExternalHref } from "@/utils/is-external-href";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

function FooterLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} rel="noreferrer" target="_blank">
        {label}
      </a>
    );
  }

  return (
    <LocalizedLink href={href} className={className}>
      {label}
    </LocalizedLink>
  );
}

export function Footer({ settings }: { settings: SITE_SETTINGS_QUERY_RESULT }) {
  const {
    footerBottomLinks,
    footerMetaText,
    footerBottomText,
    footerColumns,
    footerDescription,
    footerPrimaryCta,
    logo,
    logoDark,
    siteName,
    socialLinks,
  } = settings || {};

  const primaryCta = footerPrimaryCta ? resolveLink(footerPrimaryCta) : null;
  const bottomLinks = (footerBottomLinks ?? [])
    .map(resolveLink)
    .filter((item) => item !== null);
  const columns = footerColumns ?? [];
  const brandLogo = logoDark || logo;

  return (
    <footer className="bg-(--surface-dark) text-(--text-on-dark)">
      <div className="site-container">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="max-w-md">
            <div className="flex items-start gap-4">
              {brandLogo ? (
                <div className="relative h-22 w-44 shrink-0">
                  <Image
                    src={urlFor(brandLogo)
                      .width(352)
                      .fit("max")
                      .auto("format")
                      .url()}
                    alt={siteName || "Qodari"}
                    fill
                    className="object-contain object-left"
                    sizes="176px"
                  />
                </div>
              ) : (
                <span className="text-2xl font-semibold uppercase tracking-[0.28em]">
                  {siteName || "Qodari"}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
              {footerDescription ||
                "Qodari designs and builds thoughtful websites, scalable content systems, and clean digital experiences for companies that need clarity, speed, and execution."}
            </p>

            {primaryCta?.href ? (
              <FooterLink
                href={primaryCta.href}
                label={primaryCta.label}
                className="brand-button-primary mt-6 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
              />
            ) : null}

            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3">
                {socialLinks.map((social, idx) =>
                  social.url ? (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/72 transition-colors hover:border-(--brand-secondary) hover:text-white"
                      aria-label={social.label || "Social link"}
                    >
                      {social.icon ? (
                        <DynamicIcon
                          name={social.icon as IconName}
                          className="h-4.5 w-4.5"
                        />
                      ) : (
                        <ArrowRight className="h-4.5 w-4.5" />
                      )}
                    </a>
                  ) : null,
                )}
              </div>
            )}
          </div>

          {columns.length > 0 && (
            <div className="grid gap-7 pt-1 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-3">
              {columns.map((col, idx) => (
                <div key={idx}>
                  {col.title && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/48">
                      {col.title}
                    </p>
                  )}
                  <ul className="space-y-2.5">
                    {col.links?.map((item, i) => {
                      const link = resolveLink(item);

                      return link ? (
                        <li key={i}>
                          <FooterLink
                            href={link.href}
                            label={link.label}
                            className="text-sm text-white/72 transition-colors hover:text-(--brand-secondary)"
                          />
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 pt-4 text-sm text-white/52 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <p>{footerBottomText || "© 2026 Qodari. All rights reserved."}</p>
            {bottomLinks.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {bottomLinks.map((link) => (
                  <FooterLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="transition-colors hover:text-white"
                  />
                ))}
              </div>
            )}
          </div>

          <p className="text-white/38">
            {footerMetaText || "Designed and built by Qodari."}
          </p>
        </div>
      </div>
    </footer>
  );
}
