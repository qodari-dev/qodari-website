export const colorOptions = [
  {
    title: "White",
    value: "white",
    bg: "bg-white",
    text: "text-gray-900",
    preview: "#ffffff",
  },
  {
    title: "Light Gray",
    value: "light",
    bg: "bg-gray-50",
    text: "text-gray-900",
    preview: "#f9fafb",
  },
  {
    title: "Dark Gray",
    value: "dark",
    bg: "bg-gray-900",
    text: "text-white",
    preview: "#111827",
  },
  {
    title: "Primary Blue",
    value: "primary",
    bg: "bg-blue-600",
    text: "text-white",
    preview: "#2563eb",
  },
  {
    title: "Secondary Purple",
    value: "secondary",
    bg: "bg-purple-600",
    text: "text-white",
    preview: "#9333ea",
  },
  {
    title: "Success Green",
    value: "success",
    bg: "bg-green-600",
    text: "text-white",
    preview: "#16a34a",
  },
  {
    title: "Warning Orange",
    value: "warning",
    bg: "bg-orange-600",
    text: "text-white",
    preview: "#ea580c",
  },
  {
    title: "Accent Teal",
    value: "accent",
    bg: "bg-teal-600",
    text: "text-white",
    preview: "#0d9488",
  },
] as const;

export const buttonColorOptions = [
  {
    title: "Primary Blue",
    value: "primary",
    classes: "bg-blue-600 hover:bg-blue-700 text-white",
    preview: "#2563eb",
  },
  {
    title: "Secondary Purple",
    value: "secondary",
    classes: "bg-purple-600 hover:bg-purple-700 text-white",
    preview: "#9333ea",
  },
  {
    title: "Success Green",
    value: "success",
    classes: "bg-green-600 hover:bg-green-700 text-white",
    preview: "#16a34a",
  },
  {
    title: "Dark",
    value: "dark",
    classes: "bg-gray-900 hover:bg-gray-800 text-white",
    preview: "#111827",
  },
  {
    title: "Outline",
    value: "outline",
    classes:
      "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    preview: "#2563eb",
  },
  {
    title: "Ghost",
    value: "ghost",
    classes: "bg-transparent text-blue-600 hover:bg-blue-50",
    preview: "transparent",
  },
] as const;

export type BackgroundColorValue = (typeof colorOptions)[number]["value"];
export type ButtonColorValue = (typeof buttonColorOptions)[number]["value"];

export function getColorClasses(colorValue?: BackgroundColorValue) {
  const color = colorOptions.find((c) => c.value === colorValue);
  return color
    ? { bg: color.bg, text: color.text }
    : { bg: "bg-white", text: "text-gray-900" };
}

export function getButtonClasses(colorValue?: ButtonColorValue) {
  const color = buttonColorOptions.find((c) => c.value === colorValue);
  return color?.classes || "bg-blue-600 hover:bg-blue-700 text-white";
}
