export type ResolvedLink = {
  label: string;
  href: string;
};

type LinkFromSanity = {
  label?: string | null;
  url?: string | null;
  pageSlug?: string | null;
  pageParentSlug?: string | null;
  pageTitle?: string | null;
};

export function resolveLink(link: LinkFromSanity): ResolvedLink | null {
  if (!link) return null;

  // Ruta interna
  if (link.pageSlug) {
    const parent = link.pageParentSlug;
    const slug = link.pageSlug;
    const href = parent ? `/${parent}/${slug}` : `/${slug}`;
    return {
      href,
      label: link.label || link.pageTitle || slug || href,
    };
  }

  // Ruta externa
  if (link.url) {
    return {
      href: link.url,
      label: link.label || new URL(link.url).hostname,
    };
  }

  return null;
}
