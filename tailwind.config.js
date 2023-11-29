/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#555b6e",
        secondary: "#adb5bd",
        light: "#e9ecef",
        dark: "#212529",
      },
    },
    screens: {
      "2xl": {max: "1536px"},
      xl: {max: "1280px"},
      lg: {max: "1024px"},
      md: {max: "768px"},
      sm: {max: "640px"},
      xs: {max: "480px"},
    }
  },
  plugins: [],
}