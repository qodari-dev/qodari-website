import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const solutionCardsType = defineType({
  name: "solutionCardsSection",
  title: "Solution cards",
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
      title: "Section title",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "content",
      title: "Section description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      of: [
        defineField({
          name: "solution",
          title: "Solution",
          type: "object",
          fields: [
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              description: "Product logo or icon image.",
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: 'E.g. "Qodari IAM"',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "Short headline for the solution.",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "content",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(200),
            }),
            defineField({
              name: "button",
              title: "Button",
              type: "link",
              description:
                "Link to solution details. Select an internal page or enter an external URL.",
            }),
            defineField({
              name: "anchor",
              title: "Anchor hash",
              type: "string",
              description:
                'Optional. Appended as #hash to the button URL. E.g. "qodari-iam" → /solutions#qodari-iam. Must match the slug in Solution details.',
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "title",
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
      title: "title",
      subtitle: "eyebrow",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Solution cards: ${title || "Untitled"}`,
        subtitle,
      };
    },
  },
});
