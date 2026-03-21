import { type SchemaTypeDefinition } from "sanity";

// Objects
import { blockContentType } from "./objects/block-content-type";
import { lucideIconType } from "./objects/lucide-icon-type";
import { seo } from "./objects/seo";
import { link } from "./objects/link";

// Componentes
import { simpleContentType } from "./components/simple-content-type";
import { heroType } from "./components/hero-type";
import { pageHeroType } from "./components/page-hero-type";
import { pageSimpleHeroType } from "./components/page-simple-hero-type";
import { processHeroType } from "./components/process-hero-type";
import { capabilitiesType } from "./components/capabilities-type";
import { processType } from "./components/process-type";
import { finalCtaType } from "./components/final-cta-type";
import { serviceDetailsType } from "./components/service-details-type";
import { cardsType } from "./components/cards-type";
import { contactUsType } from "./components/contact-us-type";
import { statsType } from "./components/stats-type";
import { founderType } from "./components/founder-type";
import { valuesType } from "./components/values-type";
import { solutionDetailsType } from "./components/solution-details-type";
import { solutionCardsType } from "./components/solution-cards-type";

import { categoryType } from "./category-type";
import { postType } from "./post-type";
import { authorType } from "./author-type";
import { pageType } from "./page-type";
import { siteSettings } from "./site-settings-type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //objects
    blockContentType,
    lucideIconType,
    seo,
    link,
    //components
    heroType,
    pageHeroType,
    pageSimpleHeroType,
    processHeroType,
    capabilitiesType,
    processType,
    finalCtaType,
    serviceDetailsType,
    simpleContentType,
    cardsType,
    contactUsType,
    statsType,
    founderType,
    valuesType,
    solutionDetailsType,
    solutionCardsType,
    //documents
    siteSettings,
    categoryType,
    postType,
    authorType,
    pageType,
  ],
};
