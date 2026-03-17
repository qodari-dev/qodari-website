import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const processHeroType = defineType({
  name: "processHeroSection",
  title: "Process hero",
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
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "panelEyebrow",
      title: "Panel label",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "steps",
      title: "Process steps",
      type: "array",
      of: [
        defineField({
          name: "processHeroStep",
          title: "Process step",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "content",
              title: "Content",
              type: "string",
              validation: (Rule) => Rule.required().max(120),
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
      validation: (Rule) => Rule.required().min(3).max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare({ subtitle, title }) {
      return {
        title: `Process hero: ${title}`,
        subtitle,
      };
    },
  },
});
