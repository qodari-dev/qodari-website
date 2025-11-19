import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { buttonColorOptions, colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const simpleContentType = defineType({
  name: "simpleContentSection",
  title: "Simple Content",
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
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "button",
      title: "Button",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
        },
        {
          name: "url",
          title: "Button URL",
          type: "string",
          description:
            "Can be a relative path (/about) or external URL (https://...)",
        },
        defineField({
          name: "buttonColor",
          title: "Button color",
          type: "string",
          options: {
            list: [...buttonColorOptions],
          },
          components: {
            input: SwatchColorInput,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "content",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Simple Content: ${title}`,
        subtitle: subtitle?.substring(0, 60) + "...",
      };
    },
  },
});
