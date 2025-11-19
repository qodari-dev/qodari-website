import { type SchemaTypeDefinition } from "sanity";

// Objects
import { blockContentType } from "./objects/block-content-type";
import { seo } from "./objects/seo";
import { link } from "./objects/link";

// Componentes
import { simpleContentType } from "./components/simple-content-type";
import { partnersType } from "./components/partners-type";
import { cardsType } from "./components/cards-type";

import { categoryType } from "./category-type";
import { postType } from "./post-type";
import { authorType } from "./author-type";
import { pageType } from "./page-type";
import { siteSettings } from "./site-settings-type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    pageType,
    simpleContentType,
    partnersType,
    cardsType,
    siteSettings,
    seo,
    link,
  ],
};
