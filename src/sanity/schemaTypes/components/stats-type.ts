import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const statsType = defineType({
  name: "statsSection",
  title: "Stats / Key numbers",
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
      initialValue: "light",
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
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineField({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'E.g. "5+", "100%", "12"',
              validation: (Rule) => Rule.required().max(10),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'E.g. "Years of experience"',
              validation: (Rule) => Rule.required().max(40),
            }),
          ],
          preview: {
            select: {
              title: "value",
              subtitle: "label",
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
        title: `Stats: ${title}`,
        subtitle,
      };
    },
  },
});
