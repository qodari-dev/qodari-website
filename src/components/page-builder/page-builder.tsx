import { Locale } from "@/i18n/routing";
import { PAGE_QUERY_RESULT } from "@/sanity/types";
import { Capabilities } from "./sections/capabilities";
import { Cards } from "./sections/cards";
import { ContactUs } from "./sections/contact-us";
import { FinalCta } from "./sections/final-cta";
import { Hero } from "./sections/hero";
import { PageHero } from "./sections/page-hero";
import { Process } from "./sections/process";
import { ProcessHero } from "./sections/process-hero";
import { ServiceDetails } from "./sections/service-details";
import { SimpleContent } from "./sections/simple-content";
import { PageSimpleHero } from "./sections/page-simple-hero";
import { Stats } from "./sections/stats";
import { Founder } from "./sections/founder";
import { Values } from "./sections/values";
import { SolutionDetails } from "./sections/solution-details";
import { SolutionCards } from "./sections/solution-cards";

export type PageSection = NonNullable<
  NonNullable<PAGE_QUERY_RESULT>["pageBuilder"]
>[number];

interface PageBuilderProps {
  locale: Locale;
  sections?: NonNullable<PAGE_QUERY_RESULT>["pageBuilder"] | null;
}

export function PageBuilder({ sections, locale }: PageBuilderProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div>
      {sections.map((section, index) => {
        switch (section._type) {
          case "heroSection":
            return <Hero key={index} {...section} />;
          case "pageHeroSection":
            return <PageHero key={index} {...section} />;
          case "pageSimpleHeroSection":
            return <PageSimpleHero key={index} {...section} />;
          case "processHeroSection":
            return <ProcessHero key={index} {...section} />;
          case "capabilitiesSection":
            return <Capabilities key={index} {...section} />;
          case "processSection":
            return <Process key={index} {...section} />;
          case "finalCtaSection":
            return <FinalCta key={index} {...section} />;
          case "serviceDetailsSection":
            return <ServiceDetails key={index} {...section} />;
          case "simpleContentSection":
            return <SimpleContent key={index} {...section} />;
          case "cardsSection":
            return <Cards key={index} {...section} />;
          case "contactUsSection":
            return <ContactUs key={index} locale={locale} {...section} />;
          case "statsSection":
            return <Stats key={index} {...section} />;
          case "founderSection":
            return <Founder key={index} {...section} />;
          case "valuesSection":
            return <Values key={index} {...section} />;
          case "solutionDetailsSection":
            return <SolutionDetails key={index} {...section} />;
          case "solutionCardsSection":
            return <SolutionCards key={index} {...section} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
