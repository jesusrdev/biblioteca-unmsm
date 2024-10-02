/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  // important: "#__next",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EFF5FFbb",
        foreground: "var(--foreground)",
        "search-input": "#D5E1F9",
        "blue-light": "#C9F0FA",
        "custom-blue": "#3DA0EE",
        "custom-gray": "#9C9C9C"
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', "sans-serif"],
        inter: ['var(--font-inter)', "sans-serif"],
      },
    },
  },
  plugins: [],
};
