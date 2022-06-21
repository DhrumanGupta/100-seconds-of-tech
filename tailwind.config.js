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
        dark: "var(--color-red-dark)",
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

      typography: (theme) => {
        // some fontSizes return [size, props], others just size :/
        const fontSize = (size) => {
          const result = theme(`fontSize.${size}`);
          return Array.isArray(result) ? result[0] : result;
        };

        const breakout = {
          marginLeft: 0,
          marginRight: 0,
          gridColumn: "2 / span 10",
        };

        return {
          // DEFAULT only holds shared stuff and not the things that change
          // between light/dark
          DEFAULT: {
            css: [
              {
                "> *": {
                  gridColumn: "1 / -1",
                },
                p: {
                  marginTop: 0,
                  marginBottom: theme("spacing.8"),
                  fontSize: fontSize("lg"),
                },
                "> div": {
                  marginTop: 0,
                  marginBottom: theme("spacing.8"),
                  fontSize: fontSize("lg"),
                },
                a: {
                  textDecoration: "none",
                },
                "a:hover,a:focus": {
                  textDecoration: "underline",
                  outline: "none",
                },
                strong: {
                  fontWeight: theme("fontWeight.medium"),
                  fontSize: fontSize("lg"),
                },
                hr: {
                  marginTop: theme("spacing.8"),
                  marginBottom: theme("spacing.16"),
                },
                pre: {
                  color: "var(--base05)",
                  backgroundColor: "var(--base00)",
                  marginTop: 0,
                  marginBottom: theme("spacing.8"),
                  marginLeft: `-${theme("spacing.10vw")}`,
                  marginRight: `-${theme("spacing.10vw")}`,
                  padding: theme("spacing.8"),
                  borderRadius: 0,

                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    borderRadius: theme("borderRadius.lg"),
                    ...breakout,
                  },
                },
                ".embed": {
                  position: "relative",
                  marginLeft: "-10vw",
                  marginRight: "-10vw",
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    ...breakout,
                  },
                },
                ".embed > div": {
                  height: "0px",
                },
                ".embed > div > iframe": {
                  height: "100% !important",
                  width: "100% !important",
                  top: "0",
                  left: "0",
                  position: "absolute",
                  border: "none",
                  borderRadius: "0 !important",
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    borderRadius: "0.5rem !important",
                  },
                },
                ul: {
                  marginTop: 0,
                  marginBottom: theme("spacing.8"),
                },
                ol: {
                  marginTop: 0,
                  marginBottom: theme("spacing.8"),
                },
                "h1, h2, h3, h4, h5, h6": {
                  marginTop: 0,
                  marginBottom: 0,
                  fontWeight: theme("fontWeight.normal"),

                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontWeight: theme("fontWeight.medium"),
                  },
                },
                // tailwind doesn't stick to this property order, so we can't make 'h3' overrule 'h2, h3, h4'
                "h1, h2": {
                  fontSize: fontSize("2xl"),
                  marginTop: theme("spacing.20"),
                  marginBottom: theme("spacing.10"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontSize: fontSize("3xl"),
                  },
                },
                h3: {
                  fontSize: fontSize("xl"),
                  marginTop: theme("spacing.16"),
                  marginBottom: theme("spacing.10"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontSize: fontSize("2xl"),
                  },
                },
                "h4, h5, h6": {
                  fontSize: fontSize("lg"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontSize: fontSize("xl"),
                  },
                },
                img: {
                  // images are wrapped in <p>, which already has margin
                  marginTop: 0,
                  marginBottom: 0,
                  borderRadius: theme("borderRadius.lg"),
                },
                blockquote: {
                  fontWeight: theme("fontWeight.normal"),
                  border: "none",
                  borderRadius: theme("borderRadius.lg"),
                  padding: theme("spacing.8"),
                  marginTop: 0,
                  marginBottom: theme("spacing.10"),
                },
                "blockquote > :last-child": {
                  marginBottom: 0,
                },
              },
            ],
          },
          // use prose-light instead of default, so it's easier to see theme differences
          light: {
            css: [
              {
                color: theme("colors.gray.900"),
                strong: {
                  color: theme("colors.black"),
                },
                hr: {
                  borderColor: theme("colors.gray.200"),
                },
                code: {
                  color: theme("colors.gray.800"),
                },
                "h1, h2, h3, h4, h5, h6": {
                  color: theme("colors.black"),
                },
                blockquote: {
                  color: theme("colors.gray.500"),
                  backgroundColor: theme("colors.gray.100"),
                },
                "thead, tbody tr": {
                  borderBottomColor: theme("colors.gray.200"),
                },
                a: {
                  color: theme("colors.current"),
                },
              },
            ],
          },
          dark: {
            css: [
              {
                color: theme("colors.gray.300"),
                a: {
                  color: theme("colors.current"),
                },
                strong: {
                  color: theme("colors.white"),
                },
                hr: {
                  borderColor: theme("colors.gray.600"),
                },
                code: {
                  color: theme("colors.gray.100"),
                },
                "h1, h2, h3, h4, h5, h6": {
                  color: theme("colors.white"),
                },
                blockquote: {
                  color: theme("colors.gray.400"),
                  backgroundColor: theme("colors.gray.800"),
                },
                "thead, tbody tr": {
                  borderBottomColor: theme("colors.gray.600"),
                },
              },
            ],
          },
        };
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
