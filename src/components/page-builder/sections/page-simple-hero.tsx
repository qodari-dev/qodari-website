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
      <div className="gradient-glow" />

      <div className="site-container relative">
        <div className="">
          {eyebrow ? (
            <div className="section-eyebrow">
              <span />
              <p>{eyebrow}</p>
            </div>
          ) : null}

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-(--text-primary) sm:text-6xl lg:text-[4.6rem]">
            {title}
          </h1>

          <p className="mt-7 text-lg leading-8 text-(--text-body)">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
