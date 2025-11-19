import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PartnersSection } from "@/sanity/types";

export function Partners({ title, content, images }: PartnersSection) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
        {content && (
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
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
