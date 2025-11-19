import { SimpleContent } from "./sections/simple-content";
import { Partners } from "./sections/partners";
import { Cards } from "./sections/cards";
import {
  CardsSection,
  PartnersSection,
  SimpleContentSection,
} from "@/sanity/types";

export type PageSection = SimpleContentSection | PartnersSection | CardsSection;

interface PageBuilderProps {
  sections?: PageSection[] | null;
}

export function PageBuilder({ sections }: PageBuilderProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div>
      {sections.map((section, index) => {
        switch (section._type) {
          case "simpleContentSection":
            return <SimpleContent key={index} {...section} />;
          case "partnersSection":
            return <Partners key={index} {...section} />;
          case "cardsSection":
            return <Cards key={index} {...section} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
