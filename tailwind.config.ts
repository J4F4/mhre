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
        // كحلي فاخر - Luxury Navy (Primary brand color)
        navy: {
          50: "#eef2f9",
          100: "#d4ddf0",
          200: "#a9bbe1",
          300: "#7e98d1",
          400: "#5376c2",
          500: "#2d4f95",
          600: "#1d3a72",
          700: "#13294b",
          800: "#0a1f44",
          900: "#06122b",
          950: "#030a1a",
        },
        // تركواز خفيف - Light Turquoise (Secondary / accent)
        turquoise: {
          50: "#effcfb",
          100: "#cdf5f3",
          200: "#9fe9e6",
          300: "#67d6d2",
          400: "#3bbcb8",
          500: "#2aa3a0",
          600: "#1f817f",
          700: "#1d6766",
          800: "#1c5253",
          900: "#1b4546",
        },
        // أسود فاخر - Luxury Black
        luxe: {
          black: "#0b0b0f",
          dark: "#121319",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        luxe: "0 20px 50px -20px rgba(10, 31, 68, 0.35)",
        "luxe-lg": "0 30px 80px -30px rgba(10, 31, 68, 0.45)",
        card: "0 8px 30px -12px rgba(10, 31, 68, 0.25)",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #0a1f44 0%, #06122b 100%)",
        "hero-overlay":
          "linear-gradient(to bottom, rgba(6,18,43,0.45) 0%, rgba(6,18,43,0.65) 60%, rgba(6,18,43,0.92) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
