import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const pageHeroType = defineType({
  name: "pageHeroSection",
  title: "Page hero",
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
      name: "highlightItems",
      title: "Highlight items",
      type: "array",
      of: [
        defineField({
          name: "highlightItem",
          title: "Highlight item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "lucide-icon",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "icon",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare({ subtitle, title }) {
      return {
        title: `Page hero: ${title}`,
        subtitle,
      };
    },
  },
});
