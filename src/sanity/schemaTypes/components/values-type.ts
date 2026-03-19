import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const valuesType = defineType({
  name: "valuesSection",
  title: "Values / Principles",
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
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineField({
          name: "value",
          title: "Value",
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
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "content",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(180),
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
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Values: ${title}`,
        subtitle,
      };
    },
  },
});
