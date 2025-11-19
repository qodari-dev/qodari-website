import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, 
  title,
  "slug": slug.current,
  seo,
  body, 
  excerpt,
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
  relatedPosts[]{
    _key, 
    ...@->{_id, title, slug} 
  },
  publishedAt
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo,
  body, 
  excerpt,
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
  relatedPosts[]{
    _key, 
    ...@->{_id, title, slug}
  },
  publishedAt
}`);

export const PAGES_QUERY =
  defineQuery(`*[_type == "page" && defined(slug.current)]{
    title,
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    seo,
    pageBuilder
  }`);

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    seo,
    pageBuilder
  }`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteName,
    logo,
    seo,
    headerNav[]{
      label,
      url,
      "pageSlug": page->slug.current,
      "pageParentSlug": page->parent->slug.current,
      "pageTitle": page->title,
    },
    footerColumns[]{
      title,
      links[]{
        label,
        url,
        "pageSlug": page->slug.current,
        "pageParentSlug": page->parent->slug.current,
        "pageTitle": page->title,
      }
    },
    footerBottomText,
    socialLinks[]
  }
`);
