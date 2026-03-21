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
