import { getColorClasses } from "@/sanity/lib/colorOptions";
import { urlFor } from "@/sanity/lib/image";
import { resolveLink } from "@/sanity/lib/resolve-link";
import { cn } from "@/utils/cn";
import type { PageSection } from "../page-builder";

type SolutionCardsSection = Extract<
  PageSection,
  { _type: "solutionCardsSection" }
>;

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SolutionCards({
  backgroundColor,
  content,
  eyebrow,
  solutions,
  title,
}: SolutionCardsSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("relative overflow-hidden", bg, text)}>
      <div className="gradient-glow" />

      <div className="site-container relative">
        {eyebrow || title ? (
          <div className="mx-auto max-w-4xl text-center">
            {eyebrow ? (
              <div className="section-eyebrow">
                <span />
                <p>{eyebrow}</p>
                <span />
              </div>
            ) : null}

            {title ? (
              <h2 className="mx-auto section-heading text-(--text-primary)">
                {title}
              </h2>
            ) : null}

            {content ? (
              <p className="mx-auto section-content max-w-3xl">{content}</p>
            ) : null}
          </div>
        ) : null}

        {solutions && solutions.length > 0 ? (
          <div
            className={cn(
              "mt-12 grid gap-5",
              solutions.length <= 2 && "md:grid-cols-2",
              solutions.length === 3 && "md:grid-cols-3",
              solutions.length >= 4 && "md:grid-cols-2",
            )}
          >
            {solutions.map((item) => {
              const resolved = item.button
                ? resolveLink(item.button)
                : null;

              // Append anchor hash if present
              const href = resolved
                ? item.anchor
                  ? `${resolved.href}#${item.anchor}`
                  : resolved.href
                : item.anchor
                  ? `#${item.anchor}`
                  : null;

              const label = resolved?.label || item.button?.label;
              const isExternal = href?.startsWith("http");
              const isAnchorOnly = href?.startsWith("#");

              return (
                <article
                  key={item._key}
                  className="group relative flex flex-col overflow-hidden rounded-[1.8rem] border border-black/6 bg-white/94 p-6 shadow-[0_14px_34px_rgba(16,24,40,0.05)] transition-transform duration-200 hover:-translate-y-1 lg:p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(63,100,176,0.35),rgba(62,198,238,0.16),transparent)]" />

                  <div className="mb-4 flex items-center gap-2">
                    {item.logo ? (
                      <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/6 bg-white shadow-[0_2px_6px_rgba(16,24,40,0.05)]">
                        <Image
                          src={urlFor(item.logo)
                            .width(96)
                            .height(96)
                            .fit("max")
                            .url()}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="h-14 w-14 object-contain"
                        />
                      </div>
                    ) : null}
                    <span className="text-base font-semibold text-(--brand-primary)">
                      {item.name}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-(--text-primary)">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-[15px] leading-7 text-(--text-body)">
                    {item.content}
                  </p>

                  {href && label ? (
                    <div className="mt-5">
                      {isAnchorOnly ? (
                        <a
                          href={href}
                          className="inline-flex items-center gap-2 rounded-xl border border-(--brand-primary)/15 bg-(--brand-primary)/5 px-4 py-2.5 text-sm font-semibold text-(--brand-primary) transition-colors hover:bg-(--brand-primary)/10"
                        >
                          {label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={href}
                          {...(isExternal
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                          className="inline-flex items-center gap-2 rounded-xl border border-(--brand-primary)/15 bg-(--brand-primary)/5 px-4 py-2.5 text-sm font-semibold text-(--brand-primary) transition-colors hover:bg-(--brand-primary)/10"
                        >
                          {label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
