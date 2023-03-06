const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "2rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["2rem", { lineHeight: "3rem" }],
      "4xl": ["2.5rem", { lineHeight: "3rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
    extend: {
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      gridTemplateColumns: {
        "auto-xs": "repeat(auto-fill, minmax(120px, 1fr))",
        "auto-sm": "repeat(auto-fill, minmax(180px, 1fr))",
        "auto-md": "repeat(auto-fill, minmax(240px, 1fr))",
        "auto-lg": "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-xl": "repeat(auto-fill, minmax(360px, 1fr))",
      },
      colors: ({ colors }) => ({
        gray: colors.neutral,
        primary: {
          25: "#eafafa",
          50: "#def5f4",
          100: "#94e8e4",
          200: "#13d9d2",
          300: "#00c7bd",
          400: "#00b9ad",
          500: "#00ab9c",
          600: "#009d8d",
          700: "#008c7c",
          800: "#007c6c",
          900: "#005f4d",
        },
        secondary: {
          25: "#f1f8fe",
          50: "#e3f2fd",
          100: "#bbdefb",
          200: "#90caf9",
          300: "#64b5f6",
          400: "#42a5f5",
          500: "#2196f3",
          600: "#1e88e5",
          700: "#1976d2",
          800: "#1565c0",
          900: "#0d47a1",
        },
      }),
      aspectRatio: {
        "4/3": "4 / 3",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        kalam: ["Kalam", "sans-serif"],
        kalamlight: ["Kalam Light", "sans-serif"],
        kalambold: ["Kalam Bold", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 20px 0 rgb(0 0 0 / 6%)",
      },
    },
  },
  plugins: [],
};
