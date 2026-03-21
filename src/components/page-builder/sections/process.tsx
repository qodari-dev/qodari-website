"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { ProcessSection } from "@/sanity/types";
import { cn } from "@/utils/cn";

export function Process({
  backgroundColor,
  content,
  deliverableLabel,
  eyebrow,
  steps,
  title,
}: ProcessSection) {
  const { bg, text } = getColorClasses(backgroundColor);
  const stepDeliverableLabel = deliverableLabel || "Deliverable";

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

          <p className="mx-auto section-content">{content}</p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-12 hidden h-1 bg-[linear-gradient(90deg,rgba(63,100,176,0.12),rgba(62,198,238,0.28),rgba(63,100,176,0.12))] lg:block" />

          <div className="grid gap-5 lg:grid-cols-4">
            {steps.map((step, index) => (
              <article
                key={step._key}
                className="relative rounded-[1.6rem] border border-black/6 bg-white p-6 shadow-[0_12px_26px_rgba(16,24,40,0.05)]"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--brand-primary)/14 bg-[linear-gradient(135deg,rgba(63,100,176,0.12),rgba(62,198,238,0.2))] text-sm font-semibold text-(--brand-primary)">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-semibold text-(--text-primary)">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-(--text-body)">
                  {step.content}
                </p>

                {step.deliverable ? (
                  <div className="mt-6 border-t border-black/6 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-muted)">
                      {stepDeliverableLabel}
                    </p>
                    <p className="mt-2 text-sm font-medium text-(--text-body)">
                      {step.deliverable}
                    </p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
