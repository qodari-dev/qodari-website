import { getColorClasses } from "@/sanity/lib/colorOptions";
import { StatsSection } from "@/sanity/types";
import { cn } from "@/utils/cn";

export function Stats({
  backgroundColor,
  content,
  eyebrow,
  stats,
  title,
}: StatsSection) {
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

          <p className="mx-auto section-content max-w-2xl">{content}</p>
        </div>

        {stats && stats.length > 0 ? (
          <div
            className={cn(
              "mx-auto mt-12 grid max-w-4xl gap-4",
              stats.length === 2 && "grid-cols-2",
              stats.length === 3 && "grid-cols-3",
              stats.length >= 4 && "grid-cols-2 sm:grid-cols-4",
            )}
          >
            {stats.map((stat) => (
              <div
                key={stat._key}
                className="rounded-[1.4rem] border border-black/6 bg-white/94 p-6 text-center shadow-[0_10px_24px_rgba(16,24,40,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <p className="bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-secondary))] bg-clip-text text-4xl font-bold tracking-[-0.04em] text-transparent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium leading-5 text-(--text-muted)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
