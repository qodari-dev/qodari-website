import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const solutionDetailsType = defineType({
  name: "solutionDetailsSection",
  title: "Solution details",
  type: "object",
  fields: [
    defineField({
      name: "backgroundColor",
      title: "Background color",
      type: "string",
      options: {
        list: [...colorOptions],
      },
      components: {
        input: SwatchColorInput,
      },
      initialValue: "white",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "content",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: "items",
      title: "Solutions",
      type: "array",
      of: [
        defineField({
          name: "solution",
          title: "Solution",
          type: "object",
          fields: [
            defineField({
              name: "slug",
              title: "Anchor slug",
              type: "slug",
              description:
                'Used as anchor ID for scroll links. E.g. "qodari-iam". Must match the slug in Solution cards.',
              options: { source: "title" },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              description: "Product logo or icon.",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: 'E.g. "Qodari IAM"',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
              description: "Short tagline under the title.",
              validation: (Rule) => Rule.max(120),
            }),
            defineField({
              name: "content",
              title: "Description",
              type: "text",
              rows: 6,
              description: "Full description of the solution.",
              validation: (Rule) => Rule.required().max(600),
            }),
            defineField({
              name: "button",
              title: "Button",
              type: "link",
              description: "CTA button. Select an internal page or enter an external URL.",
            }),
            defineField({
              name: "capabilitiesTitle",
              title: "Capabilities list title",
              type: "string",
              initialValue: "Core capabilities",
              validation: (Rule) => Rule.max(60),
            }),
            defineField({
              name: "capabilities",
              title: "Capabilities",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(2).max(8),
            }),
            defineField({
              name: "adaptableTitle",
              title: "Adaptable list title",
              type: "string",
              initialValue: "Adaptable for",
              validation: (Rule) => Rule.max(60),
            }),
            defineField({
              name: "adaptableItems",
              title: "Adaptable for",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(2).max(8),
            }),
            defineField({
              name: "stack",
              title: "Tech stack",
              type: "array",
              of: [{ type: "string" }],
              description:
                'Technologies used. E.g. "Next.js", "PostgreSQL", "Redis"',
              validation: (Rule) => Rule.max(8),
            }),
            defineField({
              name: "media",
              title: "Screenshots & videos",
              type: "array",
              of: [
                defineField({
                  name: "screenshot",
                  title: "Screenshot",
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Alt text",
                      type: "string",
                    }),
                  ],
                }),
                defineField({
                  name: "video",
                  title: "Video (external URL)",
                  type: "object",
                  description:
                    "Embed a YouTube or Vimeo video by URL.",
                  fields: [
                    defineField({
                      name: "url",
                      title: "Video URL",
                      type: "url",
                      description:
                        "YouTube or Vimeo URL. E.g. https://www.youtube.com/watch?v=abc",
                      validation: (Rule) =>
                        Rule.required().uri({ scheme: ["https"] }),
                    }),
                    defineField({
                      name: "poster",
                      title: "Poster image",
                      type: "image",
                      description: "Thumbnail shown before play.",
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt text",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: { title: "alt", subtitle: "url" },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || "Video (external)",
                        subtitle,
                      };
                    },
                  },
                }),
                defineField({
                  name: "uploadedVideo",
                  title: "Video (uploaded file)",
                  type: "object",
                  description:
                    "Upload a video file directly (MP4, WebM). Best for short demos under 50 MB.",
                  fields: [
                    defineField({
                      name: "file",
                      title: "Video file",
                      type: "file",
                      options: {
                        accept: "video/mp4,video/webm",
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "poster",
                      title: "Poster image",
                      type: "image",
                      description: "Thumbnail shown before play.",
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt text",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "alt",
                      subtitle: "file.asset.originalFilename",
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title: title || "Video (uploaded)",
                        subtitle: subtitle || "No file",
                      };
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.max(6),
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              description:
                'E.g. "Implemented and working", "In development"',
              validation: (Rule) => Rule.max(80),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "logo",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      sectionTitle: "title",
      subtitle: "eyebrow",
      item0: "items.0.title",
      item1: "items.1.title",
    },
    prepare({ sectionTitle, subtitle, item0, item1 }) {
      const fallback = [item0, item1].filter(Boolean).join(", ");
      return {
        title: `Solution details: ${sectionTitle || fallback}`,
        subtitle,
      };
    },
  },
});
