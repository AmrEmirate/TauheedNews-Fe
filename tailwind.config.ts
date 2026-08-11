import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brass-gold": "#C5A059",
        "deep-navy": "#0D2137",
        "deep-green": "#132D20",
        "paper-white": "#FDFDFD",
        "news-gray": "#F4F5F7",
        "light-gold": "#F4EBD0",
        "primary": "#000917",
        "on-primary": "#ffffff",
        "secondary": "#775a19",
        "on-secondary": "#ffffff",
        "on-surface": "#1b1c1d",
        "on-surface-variant": "#44474d",
        "outline": "#74777d",
        "outline-variant": "#c4c6cd",
        "background": "#fbf9fb",
        "inverse-primary": "#b5c8e5",
        "surface-variant": "#e4e2e4",
        "surface-container": "#efedef",
        "surface-container-low": "#f5f3f5",
        "surface-container-high": "#e9e7ea",
        "surface-container-lowest": "#ffffff"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "margin-mobile": "1rem",
        "section-gap": "3rem",
        "gutter": "1.5rem",
        "stack-sm": "0.5rem",
        "container-max": "1280px",
        "stack-md": "1rem",
      },
      fontFamily: {
        headline: ["var(--font-source-serif)", "Source Serif 4", "serif"],
        body: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        arabic: ["var(--font-amiri)", "Amiri", "serif"],
        label: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.4s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideInRight: 'slideInRight 0.3s ease-out',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;
