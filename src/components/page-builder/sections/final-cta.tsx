"use client";

import { Link } from "@/i18n/navigation";
import { getColorClasses } from "@/sanity/lib/colorOptions";
import { resolveLink } from "@/sanity/lib/resolve-link";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { isExternalHref } from "@/utils/is-external-href";

type FinalCtaSectionData = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]>[number],
  { _type: "finalCtaSection" }
>;

function CtaLink({
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

export function FinalCta({
  backgroundColor,
  content,
  eyebrow,
  highlights,
  primaryCta,
  secondaryCta,
  title,
}: FinalCtaSectionData) {
  const { bg, text } = getColorClasses(backgroundColor);
  const primaryLink = primaryCta ? resolveLink(primaryCta) : null;
  const secondaryLink = secondaryCta ? resolveLink(secondaryCta) : null;

  return (
    <section className={cn(bg, text)}>
      <div className="site-container">
        <div className="relative overflow-hidden">
          <div className="relative mx-auto max-w-208 text-center">
            {eyebrow ? (
              <div className="section-eyebrow">
                <span />
                <p className="!text-(--brand-secondary)">{eyebrow}</p>
              </div>
            ) : null}

            <h2 className="mx-auto section-heading text-white">{title}</h2>

            <p className="mx-auto mt-6 text-lg leading-8 text-white/72">
              {content}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {primaryLink ? (
                <CtaLink
                  href={primaryLink.href}
                  text={primaryLink.label}
                  className="brand-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
                />
              ) : null}

              {secondaryLink ? (
                <CtaLink
                  href={secondaryLink.href}
                  text={secondaryLink.label}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                />
              ) : null}
            </div>

            {highlights && highlights.length > 0 ? (
              <div className="mt-9 flex flex-wrap justify-center gap-2.5">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/76"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
