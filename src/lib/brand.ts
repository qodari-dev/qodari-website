export const brandSystem = {
  name: "Qodari",
  fonts: {
    sans:
      '"Lato", "Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif',
  },
  colors: {
    brandPrimary: "#3F73C9",
    brandSecondary: "#43B3E9",
    surface: "#FFFFFF",
    surfaceAlt: "#F7F9FC",
    surfaceDark: "#070B12",
    textPrimary: "#101828",
    textSecondary: "#475467",
    textOnDark: "#F8FAFC",
    borderSubtle: "#E4E7EC",
  },
  radii: {
    pill: "9999px",
    card: "20px",
  },
  shadows: {
    soft: "0 18px 45px rgba(16, 24, 40, 0.08)",
    brand: "0 16px 40px rgba(67, 179, 233, 0.24)",
  },
} as const;
