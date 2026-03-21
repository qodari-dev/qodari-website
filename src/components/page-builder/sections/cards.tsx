"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { CardsSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

export function Cards({
  backgroundColor,
  content,
  eyebrow,
  cardItems,
  title,
}: CardsSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("", bg, text)}>
      <div className="site-container">
        <div className="mx-auto max-w-5xl text-center">
          {eyebrow ? (
            <div className="section-eyebrow">
              <span />
              <p>{eyebrow}</p>
            </div>
          ) : null}

          <h2 className="mx-auto section-heading text-(--text-primary)">{title}</h2>

          {content ? (
            <p className="mx-auto section-content max-w-3xl">{content}</p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cardItems.map((card, index) => (
            <article
              key={card._key || index}
              className="group relative overflow-hidden rounded-[1.8rem] border border-black/6 bg-white/94 p-5 shadow-[0_14px_34px_rgba(16,24,40,0.05)] transition-transform duration-200 hover:-translate-y-1 lg:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(63,100,176,0.35),rgba(62,198,238,0.16),transparent)]" />

              <div className="mb-3 flex items-center justify-between">
                <div className="icon-box h-12 w-12">
                  {card.icon ? (
                    <DynamicIcon
                      name={card.icon as IconName}
                      className="h-7 w-7"
                    />
                  ) : null}
                </div>
              </div>

              <h3 className="text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-(--text-primary)">
                {card.title}
              </h3>

              <p className="mt-3 text-base leading-8 text-(--text-body)">
                {card.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
