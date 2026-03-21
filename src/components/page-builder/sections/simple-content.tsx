import { getButtonClasses, getColorClasses } from "@/sanity/lib/colorOptions";
import { SimpleContentSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import Link from "next/link";

export function SimpleContent({
  eyebrow,
  title,
  content,
  button,
  backgroundColor,
}: SimpleContentSection) {
  const { bg, text } = getColorClasses(backgroundColor);
  const buttonClasses = getButtonClasses(button?.buttonColor);

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

          {button?.text && button.url ? (
            <div className="mt-10">
              <Link
                href={button.url}
                className={cn(
                  "inline-block rounded-xl px-8 py-3.5 text-sm font-semibold transition-colors",
                  buttonClasses,
                )}
              >
                {button.text}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
