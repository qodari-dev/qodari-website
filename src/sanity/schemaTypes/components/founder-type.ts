import { SwatchColorInput } from "@/sanity/components/swatch-color-input";
import { colorOptions } from "@/sanity/lib/colorOptions";
import { defineField, defineType } from "sanity";

export const founderType = defineType({
  name: "founderSection",
  title: "Founder / Team member",
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
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional. If not set, initials will be shown instead.",
    }),
    defineField({
      name: "quote",
      title: "Quote / Tagline",
      type: "text",
      rows: 3,
      description:
        "A highlighted quote or personal statement. Optional.",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(600),
    }),
    defineField({
      name: "links",
      title: "Social links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "X (Twitter)", value: "x" },
                  { title: "Email", value: "email" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Website", value: "website" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description:
                'Full URL (https://...) or mailto:email@example.com for email.',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ["https", "mailto", "tel"],
                }),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `Founder: ${title}`,
        subtitle,
        media,
      };
    },
  },
});
