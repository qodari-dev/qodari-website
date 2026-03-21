"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { cn } from "@/utils/cn";

type ProcessHeroSectionData = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]>[number],
  { _type: "processHeroSection" }
>;

export function ProcessHero({
  backgroundColor,
  content,
  eyebrow,
  panelEyebrow,
  steps,
  title,
}: ProcessHeroSectionData) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("relative overflow-hidden ", bg, text)}>
      <div className="gradient-glow" />

      <div className="site-container relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.92fr)] lg:items-end lg:gap-12">
        <div className="max-w-4xl">
          {eyebrow ? (
            <div className="section-eyebrow">
              <span />
              <p>{eyebrow}</p>
            </div>
          ) : null}

          <h1 className="max-w-[15ch] text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance text-(--text-primary) sm:text-6xl lg:text-[4.4rem]">
            {title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-(--text-body)">
            {content}
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,198,238,0.14),transparent_70%)] blur-3xl" />

          <div className="relative rounded-[2rem] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,249,252,0.88))] p-5 shadow-[0_28px_72px_rgba(16,24,40,0.08)]">
            <div className="mb-5 flex items-center justify-between border-b border-black/6 pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--brand-primary)">
                {panelEyebrow || "Process flow"}
              </p>
              <div className="flex items-center gap-1.5">
                {steps.map((_, index) => (
                  <span
                    key={index}
                    className="h-1.5 w-6 rounded-full bg-[linear-gradient(90deg,rgba(63,100,176,0.16),rgba(62,198,238,0.34))]"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {steps.map((step, index) => (
                <div
                  key={step._key}
                  className="rounded-[1.2rem] border border-black/6 bg-white/90 px-4 py-3.5 shadow-[0_10px_22px_rgba(16,24,40,0.035)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(63,100,176,0.12),rgba(62,198,238,0.2))] px-2.5 text-[10px] font-semibold tracking-[0.16em] text-(--brand-primary)">
                      0{index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[15px] font-semibold text-(--text-primary)">
                        {step.title}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-sm leading-5.5 text-(--text-body)">
                        {step.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
