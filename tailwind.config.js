/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f172a",
          soft: "#020617",
          muted: "#1e293b",
        },
        accent: "#fbbf24",
      },
    },
  },
  plugins: [],
};
