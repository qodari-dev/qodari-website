import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const serviceDetailsType = defineType({
  name: "serviceDetailsSection",
  title: "Service details",
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
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: "items",
      title: "Services",
      type: "array",
      of: [
        defineField({
          name: "service",
          title: "Service",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "content",
              title: "Summary",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required().max(220),
            }),
            defineField({
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(4),
            }),
            defineField({
              name: "includedTitle",
              title: "Included title",
              type: "string",
              initialValue: "What we typically build",
              validation: (Rule) => Rule.max(60),
            }),
            defineField({
              name: "includedItems",
              title: "Included items",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(2).max(5),
            }),
            defineField({
              name: "outcomesTitle",
              title: "Outcomes title",
              type: "string",
              initialValue: "Where it helps",
              validation: (Rule) => Rule.max(60),
            }),
            defineField({
              name: "outcomes",
              title: "Outcomes",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(2).max(5),
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
        title: `Service details: ${title}`,
        subtitle,
      };
    },
  },
});
