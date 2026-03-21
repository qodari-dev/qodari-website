"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { ServiceDetailsSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { Check, Dot } from "lucide-react";

export function ServiceDetails({
  backgroundColor,
  content,
  eyebrow,
  items,
  title,
}: ServiceDetailsSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("", bg, text)}>
      <div className="site-container">
        <div className="mx-auto max-w-4xl text-center">
          {eyebrow ? (
            <div className="section-eyebrow">
              <span />
              <p>{eyebrow}</p>
            </div>
          ) : null}

          <h2 className="mx-auto section-heading text-(--text-primary)">{title}</h2>

          <p className="mx-auto section-content max-w-3xl">{content}</p>
        </div>

        <div className="mt-10 lg:mt-11">
          {items.map((item, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={item._key}
                className="grid gap-5 border-t border-black/7 py-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-8 lg:py-8"
              >
                <div
                  className={cn(
                    !isReversed ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6",
                  )}
                >
                  <div className="mb-3.5 flex items-center gap-3">
                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-(--brand-primary)/12 bg-[linear-gradient(135deg,rgba(63,100,176,0.08),rgba(62,198,238,0.14))] px-2.5 text-[10px] font-semibold tracking-[0.16em] text-(--brand-primary)">
                      0{index + 1}
                    </span>
                    {item.tags && item.tags.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-(--text-muted)">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5"
                          >
                            {tagIndex > 0 ? (
                              <Dot className="h-3.5 w-3.5" />
                            ) : null}
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <h3 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-(--text-primary)">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-(--text-body)">
                    {item.content}
                  </p>
                </div>

                <div
                  className={cn(
                    "grid gap-3 sm:grid-cols-2",
                    !isReversed ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <div className="rounded-[1.4rem] border border-black/6 bg-white/92 p-4 shadow-[0_10px_24px_rgba(16,24,40,0.035)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
                      {item.includedTitle || "What we typically build"}
                    </p>
                    <ul className="mt-3.5 space-y-2.5">
                      {item.includedItems?.map((listItem) => (
                        <li
                          key={listItem}
                          className="flex items-start gap-3 text-sm leading-6.5 text-(--text-body)"
                        >
                          <span className="mt-0.5 icon-box-sm">
                            <Check className="h-3.25 w-3.25" />
                          </span>
                          <span>{listItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.4rem] border border-black/6 bg-[rgba(247,249,252,0.72)] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
                      {item.outcomesTitle || "Where it helps"}
                    </p>
                    <ul className="mt-3.5 space-y-2.5">
                      {item.outcomes?.map((outcome) => (
                        <li
                          key={outcome}
                          className="border-b border-black/5 pb-2.5 text-sm leading-6.5 text-(--text-body) last:border-b-0 last:pb-0"
                        >
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
