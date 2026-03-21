/* ─── Brand-aligned color options ─── */

export const colorOptions = [
  {
    title: "White",
    value: "white",
    bg: "bg-white",
    text: "text-[var(--text-primary)]",
    preview: "#ffffff",
  },
  {
    title: "Light Gray",
    value: "light-gray",
    bg: "bg-gray-50",
    text: "text-[var(--text-primary)]",
    preview: "#f9fafb",
  },
  {
    title: "Ice Blue",
    value: "ice-blue",
    bg: "bg-[var(--brand-ice-blue)]",
    text: "text-[var(--text-primary)]",
    preview: "#eef8ff",
  },
  {
    title: "Sky Blue",
    value: "sky-blue",
    bg: "bg-[var(--brand-sky-blue)]",
    text: "text-[var(--text-primary)]",
    preview: "#bbd7e9",
  },
  {
    title: "Primary Blue",
    value: "primary",
    bg: "bg-[var(--brand-primary)]",
    text: "text-[var(--text-on-dark)]",
    preview: "#3f64b0",
  },
  {
    title: "Deep Navy",
    value: "deep-navy",
    bg: "bg-[var(--brand-deep-navy)]",
    text: "text-[var(--text-on-dark)]",
    preview: "#0b2739",
  },
] as const;

export const buttonColorOptions = [
  {
    title: "Brand Gradient",
    value: "brand-gradient",
    classes: "brand-button-primary",
    preview: "#3f64b0",
  },
  {
    title: "Brand Light",
    value: "brand-light",
    classes: "brand-button-secondary",
    preview: "#ffffff",
  },
  {
    title: "Deep Navy",
    value: "deep-navy",
    classes:
      "bg-[var(--brand-deep-navy)] hover:bg-[#0f3349] text-[var(--text-on-dark)] rounded-full",
    preview: "#0b2739",
  },
  {
    title: "Outline",
    value: "outline",
    classes:
      "bg-transparent border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-ice-blue)] rounded-full",
    preview: "#3f64b0",
  },
  {
    title: "Ghost",
    value: "ghost",
    classes:
      "bg-transparent text-[var(--brand-primary)] hover:bg-[var(--brand-ice-blue)] rounded-full",
    preview: "transparent",
  },
] as const;

export type BackgroundColorValue = (typeof colorOptions)[number]["value"];
export type ButtonColorValue = (typeof buttonColorOptions)[number]["value"];

export function getColorClasses(colorValue: BackgroundColorValue = "white") {
  const color = colorOptions.find((c) => c.value === colorValue);
  return color
    ? { bg: color.bg, text: color.text }
    : { bg: "bg-white", text: "text-[var(--text-primary)]" };
}

export function getButtonClasses(colorValue: ButtonColorValue = "brand-gradient") {
  const color = buttonColorOptions.find((c) => c.value === colorValue);
  return color?.classes || "brand-button-primary";
}
