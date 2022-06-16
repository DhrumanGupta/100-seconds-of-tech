/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      red: {
        light: "var(--color-red-light)",
        light: "var(--color-red-dark)",
      },
      white: "#fff",
      black: "#000",
      gray: {
        100: "var(--color-gray-100)",
        200: "var(--color-gray-200)",
        300: "var(--color-gray-300)",
        400: "var(--color-gray-400)",
        500: "var(--color-gray-500)",
        600: "var(--color-gray-600)",
        700: "var(--color-gray-700)",
        800: "var(--color-gray-800)",
        900: "var(--color-gray-900)",
      },
    },
    extend: {
      gridTemplateRows: {
        "max-content": "max-content",
      },
      spacing: {
        "5vw": "5vw",
        "8vw": "8vw", // positions hero img inside the margin
        "10vw": "10vw", // page margin
      },
      maxWidth: {
        "8xl": "96rem",
      },
    },
  },
  plugins: [],
};
