import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const finalCtaType = defineType({
  name: "finalCtaSection",
  title: "Final CTA",
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
      initialValue: "deep-navy",
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
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "link",
      validation: (Rule) =>
        Rule.custom((value) => {
          const linkValue = value as { page?: unknown; url?: string } | undefined;

          if (!linkValue?.page && !linkValue?.url) {
            return "Select an internal page or provide an external URL.";
          }

          return true;
        }),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "link",
      validation: (Rule) =>
        Rule.custom((value) => {
          const linkValue = value as { page?: unknown; url?: string } | undefined;

          if (!linkValue) return true;

          if (!linkValue.page && !linkValue.url) {
            return "Select an internal page or provide an external URL.";
          }

          return true;
        }),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Final CTA: ${title}`,
        subtitle,
      };
    },
  },
});
