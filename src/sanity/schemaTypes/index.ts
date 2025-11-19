import { type SchemaTypeDefinition } from "sanity";

// Componentes
import { simpleContentType } from "./components/simple-content-type";
import { partnersType } from "./components/partners-type";
import { cardsType } from "./components/cards-type";

import { blockContentType } from "./block-content-type";
import { categoryType } from "./category-type";
import { postType } from "./post-type";
import { authorType } from "./author-type";
import { pageType } from "./page-type";

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
  ],
};
