"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { CapabilitiesSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

export function Capabilities({
  backgroundColor,
  content,
  eyebrow,
  items,
  title,
}: CapabilitiesSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("", bg, text)}>
      <div className="site-container">
        <div className="mx-auto max-w-5xl text-center">
          {eyebrow ? (
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-(--brand-secondary)" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--brand-primary)">
                {eyebrow}
              </p>
            </div>
          ) : null}

          <h2 className="mx-auto text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-balance text-slate-950 sm:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-6 text-lg leading-8 text-(--text-secondary)">
            {content}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item._key}
              className="group rounded-[1.65rem] border border-black/6 bg-white/94 p-6 shadow-[0_12px_28px_rgba(16,24,40,0.05)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(63,115,201,0.12),rgba(67,179,233,0.18))] text-(--brand-primary)">
                  {item.icon ? (
                    <DynamicIcon
                      name={item.icon as IconName}
                      className="h-5 w-5"
                    />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-(--text-secondary)">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-xl mb-3 font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="text-base mb-3 leading-7 text-(--text-secondary)">
                {item.content}
              </p>

              {item.tags && item.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/6 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
