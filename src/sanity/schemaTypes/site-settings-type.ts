import { CogIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fieldsets: [
    { name: "branding", title: "Branding", options: { collapsible: true } },
    { name: "header", title: "Header", options: { collapsible: true } },
    { name: "footer", title: "Footer", options: { collapsible: true } },
    { name: "seo", title: "SEO", options: { collapsible: true } },
  ],
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
      fieldset: "branding",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fieldset: "branding",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "logoDark",
      title: "Footer / dark logo",
      type: "image",
      fieldset: "branding",
      description: "Optional logo used on dark surfaces like the footer.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "seo",
      fieldset: "seo",
    }),
    // HEADER
    defineField({
      name: "announcementText",
      title: "Announcement text",
      type: "string",
      fieldset: "header",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "announcementLink",
      title: "Announcement link",
      type: "link",
      fieldset: "header",
    }),
    defineField({
      name: "headerNav",
      title: "Header navigation",
      type: "array",
      fieldset: "header",
      of: [{ type: "link" }], // usa el object link
    }),
    defineField({
      name: "headerSecondaryCta",
      title: "Header secondary CTA",
      type: "link",
      fieldset: "header",
    }),
    defineField({
      name: "headerPrimaryCta",
      title: "Header primary CTA",
      type: "link",
      fieldset: "header",
    }),

    // FOOTER
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      fieldset: "footer",
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
      name: "footerDescription",
      title: "Footer description",
      type: "text",
      fieldset: "footer",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "footerPrimaryCta",
      title: "Footer primary CTA",
      type: "link",
      fieldset: "footer",
    }),
    defineField({
      name: "footerBottomLinks",
      title: "Footer bottom links",
      type: "array",
      fieldset: "footer",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "footerMetaText",
      title: "Footer meta text",
      type: "string",
      fieldset: "footer",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "footerBottomText",
      title: "Texto inferior (copyright, etc.)",
      type: "string",
      fieldset: "footer",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      fieldset: "footer",
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
              type: "string",
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
