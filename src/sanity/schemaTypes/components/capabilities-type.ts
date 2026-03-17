import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const capabilitiesType = defineType({
  name: "capabilitiesSection",
  title: "Capabilities",
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
      title: "Capabilities",
      type: "array",
      of: [
        defineField({
          name: "capability",
          title: "Capability",
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
              validation: (Rule) => Rule.required().max(180),
            }),
            defineField({
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.max(3),
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
    prepare({ title, subtitle }) {
      return {
        title: `Capabilities: ${title}`,
        subtitle,
      };
    },
  },
});
