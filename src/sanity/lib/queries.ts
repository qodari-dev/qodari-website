import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, 
  title,
  "slug": slug.current,
  seo,
  body, 
  mainImage,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  publishedAt
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  seo,
  body, 
  mainImage,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  publishedAt
}`);

export const PAGES_QUERY =
  defineQuery(`*[_type == "page" && defined(slug.current)]{
    title,
    "slug": slug.current,
    seo,
    pageBuilder
  }`);

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    seo,
    pageBuilder
  }`);
