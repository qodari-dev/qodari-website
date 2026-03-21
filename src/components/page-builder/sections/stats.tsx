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

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-(--text-secondary)">
            {content}
          </p>
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
                <p className="mt-2 text-sm font-medium leading-5 text-(--text-secondary)">
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
