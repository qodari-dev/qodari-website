import { SimpleContent } from "./sections/simple-content";
import { Partners } from "./sections/partners";
import { Cards } from "./sections/cards";
import {
  CardsSection,
  ContactUsSection,
  PartnersSection,
  SimpleContentSection,
} from "@/sanity/types";
import { ContactUs } from "./sections/contact-us";
import { Locale } from "@/i18n/routing";

export type PageSection =
  | SimpleContentSection
  | PartnersSection
  | CardsSection
  | ContactUsSection;

interface PageBuilderProps {
  locale: Locale;
  sections?: PageSection[] | null;
}

export function PageBuilder({ sections, locale }: PageBuilderProps) {
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
          case "contactUsSection":
            return <ContactUs key={index} locale={locale} {...section} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
