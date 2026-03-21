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
      <div className="gradient-glow" />

      <div className="site-container relative">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <div className="section-eyebrow">
              <span />
              <p>{eyebrow}</p>
              <span />
            </div>
          ) : null}

          <h2 className="section-heading text-(--text-primary)">{title}</h2>

          {content ? (
            <p className="mx-auto section-content max-w-2xl">{content}</p>
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
                  <div className="icon-box">
                    {item.icon ? (
                      <DynamicIcon
                        name={item.icon as IconName}
                        className="h-5 w-5"
                      />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-(--text-body)">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-(--text-primary)">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-7 text-(--text-body)">
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
