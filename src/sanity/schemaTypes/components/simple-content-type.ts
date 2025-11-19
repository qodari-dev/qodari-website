import { defineField, defineType } from "sanity";

export const simpleContentType = defineType({
  name: "simpleContentSection",
  title: "Simple Content",
  type: "object",
  fields: [
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
