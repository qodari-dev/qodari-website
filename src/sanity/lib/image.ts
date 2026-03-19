import { SanityImageSource, createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

/**
 * Build a CDN URL for a Sanity file asset reference.
 * Expects the shape `{ asset: { _ref: "file-<id>-<ext>" } }`.
 */
export function fileUrl(file: { asset?: { _ref?: string } }): string | null {
  const ref = file?.asset?._ref;
  if (!ref) return null;

  // _ref format: file-<id>-<extension>
  const [, id, ext] = ref.split("-");
  if (!id || !ext) return null;

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`;
}
