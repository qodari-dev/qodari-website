import { getColorClasses } from "@/sanity/lib/colorOptions";
import { ValuesSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { ArrowUpRight } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

export function Values({
  backgroundColor,
  content,
  eyebrow,
  title,
  values,
}: ValuesSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("relative overflow-hidden", bg, text)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(62,198,238,0.14),transparent_60%)] blur-3xl" />

      <div className="site-container relative">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-(--brand-secondary)" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--brand-primary)">
                {eyebrow}
              </p>
              <span className="h-px w-10 bg-(--brand-secondary)" />
            </div>
          ) : null}

          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-balance text-slate-950 sm:text-5xl">
            {title}
          </h2>

          {content ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-(--text-secondary)">
              {content}
            </p>
          ) : null}
        </div>

        {values && values.length > 0 ? (
          <div
            className={cn(
              "mx-auto mt-12 grid max-w-5xl gap-4",
              values.length <= 3 && "md:grid-cols-3",
              values.length === 4 && "md:grid-cols-2",
              values.length >= 5 && "md:grid-cols-3",
            )}
          >
            {values.map((item, index) => (
              <article
                key={item._key}
                className="group rounded-[1.65rem] border border-black/6 bg-white/94 p-6 shadow-[0_12px_28px_rgba(16,24,40,0.05)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(63,100,176,0.12),rgba(62,198,238,0.18))] text-(--brand-primary)">
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

                <h3 className="mb-2 text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-7 text-(--text-secondary)">
                  {item.content}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
