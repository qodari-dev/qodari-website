import { defineType } from "sanity";

import { LucideIconInput } from "@/sanity/components/lucide-icon-input";
import { isLucideIconName } from "@/sanity/lib/lucide-icons";

export const lucideIconType = defineType({
  name: "lucide-icon",
  title: "Lucide icon",
  type: "string",
  components: {
    input: LucideIconInput,
  },
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) {
        return true;
      }

      return isLucideIconName(value)
        ? true
        : "Select a valid Lucide icon name.";
    }),
});
