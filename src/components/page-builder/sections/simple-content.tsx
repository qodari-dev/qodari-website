"use client";

import { getButtonClasses, getColorClasses } from "@/sanity/lib/colorOptions";
import { SimpleContentSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import Link from "next/link";

export function SimpleContent({
  title,
  content,
  button,
  backgroundColor,
}: SimpleContentSection) {
  const { bg, text } = getColorClasses(backgroundColor);
  const buttonClasses = getButtonClasses(button?.buttonColor);

  return (
    <section className={cn("py-16 px-4 ", bg, text)}>
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <p className="text-lg mb-8 leading-relaxed">{content}</p>
      {button && button.text && button.url && (
        <Link
          href={button.url}
          className={cn(
            "inline-block px-8 py-3 rounded-lg transition-colors font-medium",
            buttonClasses,
          )}
        >
          {button.text}
        </Link>
      )}
    </section>
  );
}
