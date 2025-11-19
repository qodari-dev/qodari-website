import { SimpleContentSection } from "@/sanity/types";
import Link from "next/link";

export function SimpleContent({
  title,
  content,
  button,
}: SimpleContentSection) {
  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">{content}</p>
      {button && button.text && button.url && (
        <Link
          href={button.url}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {button.text}
        </Link>
      )}
    </section>
  );
}
