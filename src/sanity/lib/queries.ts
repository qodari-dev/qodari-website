import { defineQuery } from "next-sanity";

export const POSTS_PER_PAGE = 6;

export const BLOG_CATEGORY = defineQuery(
  `*[_type == "category" && language == $language && slug.current == $slug][0]{title,"slug": slug.current,language}`,
);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && defined(slug.current)]{
    title,
    language,
    "slug": slug.current
  } | order(title asc)
`);

export const BLOG_CATEGORIES_QUERY_LANGUAGE = defineQuery(`
  *[_type == "category" && language == $language && defined(slug.current)]{
    title,
    language,
    "slug": slug.current
  } | order(title asc)
`);

export const BLOG_CATEGORY_QUERY = defineQuery(`
  *[_type == "category" && language == $language && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "posts": *[_type == "post" 
      && defined(slug.current) 
      && (!defined(seo.noIndex) || seo.noIndex == false) 
      && ^._id in categories[]._ref]
      | order(coalesce(publishedAt, _createdAt) desc)
      [$start...$end]{
        _id,
        title,
        "slug": slug.current,
        seo,
        body, 
        excerpt,
        mainImage,
        language,
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
      },
    "total": count(*[_type == "post" 
      && language == $language
      && defined(slug.current) 
      && (!defined(seo.noIndex) || seo.noIndex == false) 
      && ^._id in categories[]._ref])
  }
`);

export const POSTS_INDEX_QUERY = defineQuery(`
{
  "posts": *[_type == "post" && language == $language && defined(slug.current) && (!defined(seo.noIndex) || seo.noIndex == false)]
    | order(coalesce(publishedAt, _createdAt) desc)
    [$start...$end]{
      _id, 
      title,
      "slug": slug.current,
      seo,
      body, 
      excerpt,
      mainImage,
      language,
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
    },
  "total": count(*[_type == "post" && language == $language && defined(slug.current) && (!defined(seo.noIndex) || seo.noIndex == false)])
}
`);

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  "slug": slug.current,
  seo,
  body, 
  excerpt,
  mainImage,
  language,
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
  defineQuery(`*[_type == "post" && language == $language && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo,
  body, 
  excerpt,
  mainImage,
  language,
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
    language,
    pageBuilder
  }`);

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && language == $language && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    seo,
    language,
    pageBuilder
  }`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && language == $language][0]{
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

export const SITEMAP_QUERY = defineQuery(`
{
  "pages": *[
    _type == "page" 
    && defined(slug.current)
    && (!defined(seo.noIndex) || seo.noIndex == false)
  ]{
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    _updatedAt
  },

  "posts": *[
    _type == "post" 
    && defined(slug.current) 
    && (!defined(seo.noIndex) || seo.noIndex == false)
  ]{
    "slug": slug.current,
    _updatedAt
  },

  "categories": *[
    _type == "category" 
    && defined(slug.current)
  ]{
    "slug": slug.current
  }
}
`);
