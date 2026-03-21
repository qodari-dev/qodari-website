"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { PageHeroSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

export function PageHero({
  backgroundColor,
  content,
  eyebrow,
  highlightItems,
  title,
}: PageHeroSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  const heroHighlights = highlightItems ?? [];

  return (
    <section
      className={cn("relative overflow-hidden py-16 lg:py-20", bg, text)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(62,198,238,0.14),transparent_60%)] blur-3xl" />

      <div className="site-container relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-end lg:gap-12">
        <div className="max-w-4xl">
          {eyebrow ? (
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-(--brand-secondary)" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--brand-primary)">
                {eyebrow}
              </p>
            </div>
          ) : null}

          <h1 className="max-w-[16ch] text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-slate-950 sm:text-6xl lg:text-[4.6rem]">
            {title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-(--text-secondary)">
            {content}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,198,238,0.12),transparent_68%)] blur-3xl" />

          <div className="relative rounded-4xl border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(247,249,252,0.86))] p-4 shadow-[0_26px_70px_rgba(16,24,40,0.08)]">
            <div className="grid gap-3 sm:grid-cols-2">
              {heroHighlights.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[1.3rem] border border-black/6 bg-white/92 px-5 py-5 shadow-[0_12px_30px_rgba(16,24,40,0.05)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(63,100,176,0.12),rgba(62,198,238,0.2))] text-[13px] font-semibold text-(--brand-primary)">
                      0{index + 1}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/2.5 text-(--brand-primary)">
                      {item.icon && (
                        <DynamicIcon
                          name={item.icon as IconName}
                          className="h-4 w-4"
                        />
                      )}
                    </span>
                  </div>

                  <p className="text-base font-medium text-slate-700">
                    {item.title}
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
