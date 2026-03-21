"use client";

import { Link } from "@/i18n/navigation";
import { getColorClasses } from "@/sanity/lib/colorOptions";
import { resolveLink } from "@/sanity/lib/resolve-link";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { isExternalHref } from "@/utils/is-external-href";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

type HeroSectionData = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]>[number],
  { _type: "heroSection" }
>;

function HeroLink({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className?: string;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} rel="noreferrer" target="_blank">
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {text}
    </Link>
  );
}

export function Hero({
  backgroundColor,
  content,
  eyebrow,
  highlights,
  primaryCta,
  secondaryCta,
  title,
  visualContent,
  visualCards,
  visualEyebrow,
}: HeroSectionData) {
  const { bg, text } = getColorClasses(backgroundColor);
  const isDark =
    backgroundColor === "deep-navy" || backgroundColor === "primary";
  const primaryLink = primaryCta ? resolveLink(primaryCta) : null;
  const secondaryLink = secondaryCta ? resolveLink(secondaryCta) : null;

  return (
    <section className={cn("relative overflow-hidden", bg, text)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-40 opacity-80 blur-3xl",
          isDark
            ? "bg-[radial-gradient(circle_at_top,rgba(62,198,238,0.18),transparent_62%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(62,198,238,0.18),transparent_58%)]",
        )}
      />

      <div className="site-container relative grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="section-eyebrow">
              <span />
              <p>{eyebrow}</p>
            </div>
          ) : null}

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-(--text-primary) sm:text-6xl lg:text-[4.2rem]">
            {title}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-(--text-body)">
            {content}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {primaryLink ? (
              <HeroLink
                href={primaryLink.href}
                text={primaryLink.label}
                className="brand-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
              />
            ) : null}

            {secondaryLink ? (
              <HeroLink
                href={secondaryLink.href}
                text={secondaryLink.label}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/8 bg-white/62 px-6 py-3.5 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-white"
              />
            ) : null}
          </div>

          {highlights && highlights.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item._key}
                  className="rounded-full border border-black/6 bg-white/80 px-4 py-2 text-sm font-medium text-(--text-body) shadow-[0_10px_30px_rgba(16,24,40,0.05)]"
                >
                  {item.title}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,198,238,0.16),transparent_66%)] blur-3xl" />

          <div className="relative rounded-4xl border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.92))] p-5 shadow-[0_32px_90px_rgba(16,24,40,0.12)]">
            <div className="mb-5 flex items-center justify-between border-b border-black/6 pb-4">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--brand-primary)">
                  {visualEyebrow}
                </p>
                <p className="mt-2 text-sm text-(--text-body)">
                  {visualContent}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-secondary))] text-white shadow-[0_18px_36px_rgba(62,198,238,0.28)]">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {visualCards.map((card, index) => (
                <div
                  key={card._key}
                  className={cn(
                    "rounded-[1.4rem] border border-black/6 bg-white p-5 shadow-[0_14px_32px_rgba(16,24,40,0.06)]",
                    index === 0 && "sm:col-span-2",
                  )}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="icon-box">
                      {card.icon ? (
                        <DynamicIcon
                          name={card.icon as IconName}
                          className="h-5 w-5"
                        />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-body)">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-lg font-semibold text-(--text-primary)">
                    {card.title}
                  </p>
                  <p
                    className={cn("mt-2 text-(--text-body) text-sm leading-7")}
                  >
                    {card.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
