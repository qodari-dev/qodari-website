import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PartnersSection } from "@/sanity/types";
import { getColorClasses } from "@/sanity/lib/colorOptions";
import { cn } from "@/utils/cn";

export function Partners({
  title,
  content,
  images,
  backgroundColor,
}: PartnersSection) {
  const { bg, text } = getColorClasses(backgroundColor);
  return (
    <section className={cn("py-16 px-4 ", bg, text)}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
        {content && (
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
            {content}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {images.map((image, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <Image
                src={urlFor(image).width(200).height(100).auto("format").url()}
                alt={image.alt}
                width={200}
                height={100}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
