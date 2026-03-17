import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const processType = defineType({
  name: "processSection",
  title: "Process",
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
      name: "deliverableLabel",
      title: "Deliverable label",
      type: "string",
      initialValue: "Deliverable",
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineField({
          name: "processStep",
          title: "Step",
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
              rows: 3,
              validation: (Rule) => Rule.required().max(180),
            }),
            defineField({
              name: "deliverable",
              title: "Deliverable",
              type: "string",
              validation: (Rule) => Rule.max(60),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "deliverable",
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
        title: `Process: ${title}`,
        subtitle,
      };
    },
  },
});
