import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "heroSection",
  title: "Hero",
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
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "link",
      validation: (Rule) =>
        Rule.custom((value: { page?: unknown; url?: string } | undefined) => {
          if (!value?.page && !value?.url) {
            return "Select an internal page or provide an external URL.";
          }

          return true;
        }),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "link",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        defineField({
          name: "highlight",
          title: "Highlight",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "visualEyebrow",
      title: "Visual panel label",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "visualContent",
      title: "Visual panel content",
      type: "string",
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "visualCards",
      title: "Visual cards",
      type: "array",
      of: [
        defineField({
          name: "visualCard",
          title: "Visual card",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "lucide-icon",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "content",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Hero: ${title}`,
        subtitle,
      };
    },
  },
});
