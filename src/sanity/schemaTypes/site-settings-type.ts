import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
    }),
    // HEADER
    defineField({
      name: "headerNav",
      title: "Header navigation",
      type: "array",
      of: [{ type: "link" }], // usa el object link
    }),

    // FOOTER
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      of: [
        defineField({
          name: "footerColumn",
          title: "Footer column",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título de columna",
              type: "string",
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "link" }], // reutilizamos link aquí también
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "footerBottomText",
      title: "Texto inferior (copyright, etc.)",
      type: "string",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineField({
          name: "socialLink",
          title: "Social link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Ej: Twitter, GitHub, LinkedIn…",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "lucide-icon", // usa el plugin lucide icon picker
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
    }),
  ],
});
