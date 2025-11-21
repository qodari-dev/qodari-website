import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent page",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "Leave empty for top-level pages. Select a parent to create nested URLs.",
      options: {
        filter: ({ document }) => {
          return {
            filter: "_id != $id",
            params: { id: document._id },
          };
        },
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [
        { type: "simpleContentSection" },
        { type: "partnersSection" },
        { type: "cardsSection" },
        { type: "contactUsSection" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug}`,
      };
    },
  },
});
