"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { PageSimpleHeroSection } from "@/sanity/types";
import { cn } from "@/utils/cn";

export function PageSimpleHero({
  backgroundColor,
  content,
  eyebrow,
  title,
}: PageSimpleHeroSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section
      className={cn("relative overflow-hidden py-16 lg:py-20", bg, text)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(62,198,238,0.14),transparent_60%)] blur-3xl" />

      <div className="site-container relative">
        <div className="">
          {eyebrow ? (
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-(--brand-secondary)" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--brand-primary)">
                {eyebrow}
              </p>
            </div>
          ) : null}

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-slate-950 sm:text-6xl lg:text-[4.6rem]">
            {title}
          </h1>

          <p className="mt-7 text-lg leading-8 text-(--text-secondary)">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
