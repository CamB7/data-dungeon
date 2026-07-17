import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        torch: {
          DEFAULT: "#e8b86d",
          dim: "#a6753a",
        },
        moss: {
          DEFAULT: "#5dffb1",
          soft: "#2a8f64",
          deep: "#0f3d2c",
        },
        blood: {
          DEFAULT: "#c43c3c",
          deep: "#6b1515",
          dim: "#8a2a2a",
        },
        ash: {
          DEFAULT: "#9a8f88",
          deep: "#3a3230",
        },
        stone: {
          950: "#070a09",
          900: "#0c1210",
          800: "#151c19",
          700: "#1e2824",
          500: "#4a5c54",
          300: "#9bb0a6",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        dungeon:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(42, 143, 100, 0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(232, 184, 109, 0.08), transparent 50%), radial-gradient(ellipse 40% 30% at 15% 70%, rgba(93, 255, 177, 0.06), transparent 45%)",
        "boss-dungeon":
          "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(180, 40, 40, 0.28), transparent 55%), radial-gradient(ellipse 45% 40% at 85% 75%, rgba(80, 20, 20, 0.35), transparent 50%), radial-gradient(ellipse 40% 35% at 10% 80%, rgba(40, 30, 35, 0.5), transparent 45%), linear-gradient(180deg, rgba(8,6,10,0.2), rgba(4,2,6,0.85))",
        grid: "linear-gradient(rgba(155, 176, 166, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 176, 166, 0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "torch-pulse": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.05)" },
        },
        "ember-flicker": {
          "0%, 100%": { opacity: "0.35", filter: "brightness(0.9)" },
          "40%": { opacity: "0.7", filter: "brightness(1.15)" },
          "60%": { opacity: "0.45", filter: "brightness(0.95)" },
          "80%": { opacity: "0.85", filter: "brightness(1.2)" },
        },
        "query-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
        "fade-up-delay": "fade-up 0.8s ease-out 0.15s both",
        "fade-up-delay-2": "fade-up 0.8s ease-out 0.3s both",
        "torch-pulse": "torch-pulse 4s ease-in-out infinite",
        "ember-flicker": "ember-flicker 3.2s ease-in-out infinite",
        "query-scroll": "query-scroll 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
