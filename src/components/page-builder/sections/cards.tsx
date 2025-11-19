import { CardsSection } from "@/sanity/types";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

export function Cards({ title, content, cardItems }: CardsSection) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">{title}</h2>
        {content && (
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            {content}
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardItems.map((card, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              {card.icon && (
                <div className="mb-4">
                  <DynamicIcon
                    name={card.icon as IconName}
                    className="h-6 w-6"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
