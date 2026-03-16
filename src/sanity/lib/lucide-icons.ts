import { iconNames, type IconName } from "lucide-react/dynamic";

export const lucideIconNames = [...iconNames].sort();
const lucideIconNameSet = new Set<string>(lucideIconNames);

export function isLucideIconName(value: string): value is IconName {
  return lucideIconNameSet.has(value);
}

export function formatLucideIconName(iconName: string) {
  return iconName
    .split("-")
    .map((part) => {
      if (part.length <= 3) {
        return part.toUpperCase();
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}
