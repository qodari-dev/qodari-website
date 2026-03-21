export const brandSystem = {
  name: "Qodari",
  fonts: {
    sans:
      'var(--font-lato), "Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif',
  },
  colors: {
    brandPrimary: "#3F64B0",
    brandSecondary: "#3EC6EE",
    brandDeepNavy: "#0B2739",
    brandSkyBlue: "#BBD7E9",
    brandMediumBlue: "#477FA3",
    brandIceBlue: "#EEF8FF",
    surface: "#FFFFFF",
    surfaceAlt: "#EEF8FF",
    surfaceDark: "#0B2739",
    textPrimary: "#0B2739",
    textSecondary: "#477FA3",
    textOnDark: "#EEF8FF",
    borderSubtle: "#BBD7E9",
  },
  radii: {
    pill: "9999px",
    card: "20px",
  },
  shadows: {
    soft: "0 18px 45px rgba(16, 24, 40, 0.08)",
    brand: "0 16px 40px rgba(62, 198, 238, 0.24)",
  },
} as const;
