import { defineType, defineField } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description:
        "Texto a mostrar. Si se deja vacío, se usará el título de la página interna.",
    }),
    defineField({
      name: "page",
      title: "Página interna",
      type: "reference",
      to: [{ type: "page" }],
      description: "Selecciona una página interna (opcional).",
    }),
    defineField({
      name: "url",
      title: "URL externa",
      type: "string",
      description:
        "Para enlaces externos. Si hay página interna, esta URL se ignora.",
    }),
  ],
  preview: {
    select: {
      label: "label",
      pageTitle: "page.title",
      url: "url",
    },
    prepare({ label, pageTitle, url }) {
      return {
        title: label || pageTitle || url || "Link",
        subtitle: url || (pageTitle ? "Internal page" : ""),
      };
    },
  },
});
