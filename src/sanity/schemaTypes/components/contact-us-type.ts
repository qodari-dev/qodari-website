import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const contactUsType = defineType({
  name: "contactUsSection",
  title: "Contact Us",
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
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detailsTitle",
      title: "Details title",
      type: "string",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "detailsContent",
      title: "Details content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: "formEyebrow",
      title: "Form eyebrow",
      type: "string",
      initialValue: "Contact form",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (Rule) => Rule.email().max(120),
    }),
    defineField({
      name: "responseTime",
      title: "Response time",
      type: "string",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "whatsappText",
      title: "WhatsApp text",
      type: "string",
      description: 'E.g. "Prefer WhatsApp? Start a chat"',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp URL",
      type: "url",
      description: "Full URL, e.g. https://wa.me/1234567890",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Contact Us: ${title}`,
        subtitle,
      };
    },
  },
});
