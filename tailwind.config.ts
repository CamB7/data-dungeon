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
          DEFAULT: "#E2B56B",
          dim: "#A67B3C",
        },
        /**
         * Lockward — damp verdigris on iron stone (not neon).
         * Pair with torch brass for locks/keys; blood for bosses.
         */
        moss: {
          DEFAULT: "#A8C9A0",
          soft: "#6B9470",
          deep: "#1E3224",
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
        /**
         * Salt Crypts — high-contrast ice cyan (distinct from Lockward).
         * Tuned for dark backgrounds: bright accents, readable secondary text.
         */
        brine: {
          DEFAULT: "#7DF0FF",
          soft: "#38BDF8",
          deep: "#0B3A4A",
          glow: "#CFFAFE",
        },
        salt: {
          DEFAULT: "#E8FAFC",
          dim: "#9ED8E3",
          deep: "#102832",
        },
        abyss: {
          DEFAULT: "#050C12",
          soft: "#0A1820",
        },
        /**
         * Index Spire — cool tower silver / slate (not purple).
         */
        spire: {
          DEFAULT: "#B8C5D6",
          soft: "#7A8FA8",
          deep: "#0E141C",
          glow: "#E8EEF5",
        },
        /**
         * Null Cathedral — bone on hollow void.
         */
        hollow: {
          DEFAULT: "#D4D0C8",
          soft: "#9A958C",
          deep: "#0C0B0A",
          glow: "#F2EFE8",
        },
        /**
         * Query Throne — regal amber / ember gold.
         */
        throne: {
          DEFAULT: "#F0C14A",
          soft: "#C4922E",
          deep: "#140F08",
          glow: "#FFE9A8",
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
          "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(226, 181, 107, 0.2), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 75%, rgba(107, 148, 112, 0.14), transparent 50%), radial-gradient(ellipse 40% 30% at 12% 70%, rgba(168, 201, 160, 0.08), transparent 45%), linear-gradient(180deg, rgba(12,18,16,0.15), rgba(8,12,10,0.75))",
        "boss-dungeon":
          "linear-gradient(180deg, rgba(40, 12, 14, 0.45), transparent 42%), linear-gradient(135deg, rgba(80, 20, 20, 0.22), transparent 50%), linear-gradient(180deg, rgba(8,6,10,0.15), rgba(4,2,6,0.88))",
        "salt-dungeon":
          "radial-gradient(ellipse 85% 55% at 50% 0%, rgba(56, 189, 248, 0.22), transparent 55%), radial-gradient(ellipse 50% 45% at 90% 70%, rgba(14, 90, 110, 0.4), transparent 50%), radial-gradient(ellipse 40% 35% at 8% 85%, rgba(125, 240, 255, 0.1), transparent 45%), linear-gradient(180deg, rgba(5,12,18,0.1), rgba(5,12,18,0.7))",
        "salt-boss-dungeon":
          "linear-gradient(180deg, rgba(20, 70, 90, 0.38), transparent 42%), linear-gradient(150deg, rgba(8, 50, 70, 0.28), transparent 55%), linear-gradient(180deg, rgba(2,8,14,0.2), rgba(1,4,8,0.94))",
        "spire-dungeon":
          "linear-gradient(180deg, rgba(122, 143, 168, 0.22), transparent 45%), linear-gradient(160deg, rgba(30, 45, 65, 0.4), transparent 55%), linear-gradient(180deg, rgba(14,20,28,0.2), rgba(8,12,18,0.85))",
        "spire-boss-dungeon":
          "linear-gradient(180deg, rgba(184, 197, 214, 0.2), transparent 40%), linear-gradient(140deg, rgba(40, 55, 80, 0.45), transparent 55%), linear-gradient(180deg, rgba(8,12,20,0.3), rgba(4,6,10,0.92))",
        "hollow-dungeon":
          "linear-gradient(180deg, rgba(212, 208, 200, 0.12), transparent 42%), linear-gradient(200deg, rgba(40, 38, 34, 0.5), transparent 55%), linear-gradient(180deg, rgba(12,11,10,0.2), rgba(6,5,4,0.9))",
        "hollow-boss-dungeon":
          "linear-gradient(180deg, rgba(212, 208, 200, 0.18), transparent 38%), linear-gradient(160deg, rgba(50, 20, 20, 0.25), transparent 50%), linear-gradient(180deg, rgba(8,7,6,0.25), rgba(3,2,2,0.95))",
        "throne-dungeon":
          "linear-gradient(180deg, rgba(240, 193, 74, 0.18), transparent 42%), linear-gradient(150deg, rgba(100, 60, 20, 0.35), transparent 55%), linear-gradient(180deg, rgba(20,15,8,0.2), rgba(10,8,4,0.9))",
        "throne-boss-dungeon":
          "linear-gradient(180deg, rgba(240, 193, 74, 0.28), transparent 40%), linear-gradient(135deg, rgba(120, 40, 30, 0.35), transparent 50%), linear-gradient(180deg, rgba(16,10,4,0.3), rgba(6,4,2,0.95))",
        grid: "linear-gradient(rgba(155, 176, 166, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 176, 166, 0.04) 1px, transparent 1px)",
        "salt-grid":
          "linear-gradient(rgba(125, 240, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(125, 240, 255, 0.07) 1px, transparent 1px)",
        "spire-grid":
          "linear-gradient(rgba(184, 197, 214, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 197, 214, 0.06) 1px, transparent 1px)",
        "hollow-grid":
          "linear-gradient(rgba(212, 208, 200, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 208, 200, 0.05) 1px, transparent 1px)",
        "throne-grid":
          "linear-gradient(rgba(240, 193, 74, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 193, 74, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
        "salt-grid": "40px 40px",
        "spire-grid": "44px 44px",
        "hollow-grid": "52px 52px",
        "throne-grid": "46px 46px",
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
        "tide-swell": {
          "0%, 100%": { opacity: "0.45", transform: "translateY(0) scale(1)" },
          "50%": { opacity: "0.8", transform: "translateY(-10px) scale(1.08)" },
        },
        /** Salt boss — icy pulse akin to ember-flicker */
        "brine-flicker": {
          "0%, 100%": { opacity: "0.4", filter: "brightness(0.95) saturate(1)" },
          "30%": { opacity: "0.85", filter: "brightness(1.25) saturate(1.15)" },
          "55%": { opacity: "0.5", filter: "brightness(1) saturate(1)" },
          "75%": { opacity: "0.95", filter: "brightness(1.35) saturate(1.2)" },
        },
        "query-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out both",
        "fade-up-delay": "fade-up 0.8s ease-out 0.15s both",
        "fade-up-delay-2": "fade-up 0.8s ease-out 0.3s both",
        "torch-pulse": "torch-pulse 4s ease-in-out infinite",
        "ember-flicker": "ember-flicker 3.2s ease-in-out infinite",
        "tide-swell": "tide-swell 5.5s ease-in-out infinite",
        "brine-flicker": "brine-flicker 2.8s ease-in-out infinite",
        "query-scroll": "query-scroll 28s linear infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
