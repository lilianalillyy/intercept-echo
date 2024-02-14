/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = {
  darkMode: ["class", ":global(.dark)"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pagebuilder/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    }, // this must be reflected in next.config.js
    fontFamily: {
      primary: ["var(--font-primary)", ...fontFamily.sans],
      secondary: ["var(--font-secondary)", ...fontFamily.sans],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light:
            "hsl(var(--color-primary-hsl-0) var(--color-primary-hsl-1) calc(var(--color-primary-hsl-2)*2.5))",
          lighter:
            "hsl(var(--color-primary-hsl-0) var(--color-primary-hsl-1) calc(var(--color-primary-hsl-2)*4))",
          dark: "hsl(var(--color-primary-hsl-0) var(--color-primary-hsl-1) calc(var(--color-primary-hsl-2)*0.8))",
          darker:
            "hsl(var(--color-primary-hsl-0) var(--color-primary-hsl-1) calc(var(--color-primary-hsl-2)*0.6))",
        },
        theme: {
          DEFAULT: "var(--color-theme)",
          light:
            "hsl(var(--color-theme-hsl-0) var(--color-theme-hsl-1) calc(var(--color-theme-hsl-2)*1.25))",
          lighter:
            "hsl(var(--color-theme-hsl-0) var(--color-theme-hsl-1) calc(var(--color-theme-hsl-2)*1.5))",
          dark: "hsl(var(--color-theme-hsl-0) var(--color-theme-hsl-1) calc(var(--color-theme-hsl-2)*0.8))",
          darker:
            "hsl(var(--color-theme-hsl-0) var(--color-theme-hsl-1) calc(var(--color-theme-hsl-2)*0.6))",
          alert: "#E63946",
          info: "#457B9D",
          success: "#52B788",
          warning: "#EE802F",
        },
        background: "var(--color-background)",
        social: {
          twitter: "#1da1f2",
          facebook: "#4267B2",
          rss: "#ee802f",
          instagram: "#d6249f",
          tiktok: "#000000",
          wiki: "black", // wikipedia uses only black and shades of gray
          youtube: "#ff0000",
          linkedin: "#0077b5",
        },
      },
      transitionDuration: {
        default: "300ms",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s 1",
        fadeOut: "fadeOut .3s 1",
      },
      dropShadow: {
        tiktok: [
          "2px 0px 0px rgba(253, 62, 62, 1)",
          "-2px -2px 0px rgba(77, 232, 244, 1)",
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        "body:before": {
          display: "none",
          content: `"xs"`,
        },
      });

      const screens = theme("screens");

      Object.keys(screens).forEach((screen) => {
        addBase({
          [`@media (min-width: ${screens[screen]})`]: {
            ["body::before"]: {
              display: "none",
              content: `"${screen}"`,
            },
          },
        });
      });
    }),
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".transition-default": {
          transitionProperty: theme("transitionProperty").all,
          transitionDuration: theme("transitionDuration").default,
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
