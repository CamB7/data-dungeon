import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
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
         * Index Spire secondary — malachite index ink (cool jade, not cyan/copper).
         */
        meridian: {
          DEFAULT: "#3AA898",
          soft: "#2A8878",
          dim: "#1A5850",
          glow: "#58D8C0",
        },
        /**
         * Null Cathedral secondary — deep amethyst void.
         */
        void: {
          DEFAULT: "#5E4880",
          soft: "#453566",
          dim: "#2D2340",
          glow: "#8B6FC4",
        },
        /**
         * Query Throne secondary — royal crimson.
         */
        velvet: {
          DEFAULT: "#9B2848",
          soft: "#6B1830",
          dim: "#4A1020",
          glow: "#D44060",
        },
        /**
         * Salt Crypts — brine cyan + salt ice (two-tone, like moss + torch).
         */
        brine: {
          DEFAULT: "#5ED4F0",
          soft: "#38BDF8",
          deep: "#0B3A4A",
          glow: "#A8F0FC",
          muted: "#8EC4D8",
        },
        salt: {
          DEFAULT: "#D4F1F5",
          dim: "#7EC8D8",
          deep: "#102832",
          muted: "#A8D0DC",
        },
        abyss: {
          DEFAULT: "#050C12",
          soft: "#0A1820",
        },
        /**
         * Index Spire — cool moonstone quartz tower + jade meridian lines.
         */
        spire: {
          DEFAULT: "#A8B8CC",
          soft: "#7088A4",
          deep: "#080C14",
          glow: "#D8E8F4",
        },
        /**
         * Null Cathedral borders — red-grey trim.
         */
        redgrey: {
          DEFAULT: "#8A6565",
          soft: "#6E5050",
          dim: "#503838",
          glow: "#A87878",
        },
        /**
         * Null Cathedral — crypt iron stone (warm, not pastel).
         */
        hollow: {
          DEFAULT: "#7A7268",
          soft: "#524D46",
          deep: "#0C0B0A",
          glow: "#A89478",
        },
        /**
         * Fractured Loom borders — crimson thread trim.
         */
        crimsontrim: {
          DEFAULT: "#B84848",
          soft: "#943838",
          dim: "#6A2828",
          glow: "#D86868",
        },
        /**
         * Fractured Loom — scarlet weave stone.
         */
        scarlet: {
          DEFAULT: "#C45050",
          soft: "#984040",
          deep: "#321E1E",
          glow: "#E86868",
        },
        /**
         * Fractured Loom secondary — warm copper thread (contrast with scarlet stone).
         */
        copper: {
          DEFAULT: "#D48858",
          soft: "#B86840",
          dim: "#8A4C28",
          glow: "#F0A870",
        },
        /**
         * @deprecated Loom UI uses copper — kept for reference.
         */
        garnet: {
          DEFAULT: "#8A3048",
          soft: "#6A2438",
          dim: "#4A1828",
          glow: "#B84860",
        },
        /**
         * Query Throne borders — yellow trim.
         */
        goldline: {
          DEFAULT: "#E8C830",
          soft: "#C9A820",
          dim: "#9A7B18",
          glow: "#F5D850",
        },
        /**
         * Query Throne — burnished regal gold.
         */
        throne: {
          DEFAULT: "#C9921A",
          soft: "#8A6410",
          deep: "#140F08",
          glow: "#E8B030",
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
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94, 212, 240, 0.18), transparent 55%), radial-gradient(ellipse 45% 40% at 92% 75%, rgba(126, 200, 216, 0.1), transparent 50%), radial-gradient(ellipse 35% 30% at 8% 80%, rgba(56, 189, 248, 0.08), transparent 45%), linear-gradient(180deg, rgba(5,12,18,0.15), rgba(5,12,18,0.82))",
        "salt-boss-dungeon":
          "linear-gradient(180deg, rgba(94, 212, 240, 0.22), transparent 42%), linear-gradient(150deg, rgba(8, 50, 70, 0.28), transparent 55%), linear-gradient(180deg, rgba(2,8,14,0.25), rgba(1,4,8,0.94))",
        "spire-dungeon":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(58, 168, 152, 0.14), transparent 55%), radial-gradient(ellipse 45% 40% at 88% 72%, rgba(168, 184, 204, 0.12), transparent 50%), radial-gradient(ellipse 35% 30% at 10% 78%, rgba(42, 136, 120, 0.1), transparent 45%), linear-gradient(180deg, rgba(8,12,20,0.2), rgba(4,6,10,0.92))",
        "spire-boss-dungeon":
          "linear-gradient(180deg, rgba(88, 216, 192, 0.18), transparent 40%), linear-gradient(140deg, rgba(26, 88, 80, 0.35), transparent 55%), linear-gradient(180deg, rgba(6,8,12,0.3), rgba(3,4,6,0.94))",
        "hollow-dungeon":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94, 72, 128, 0.2), transparent 55%), radial-gradient(ellipse 45% 40% at 85% 75%, rgba(122, 114, 104, 0.14), transparent 50%), radial-gradient(ellipse 35% 30% at 12% 72%, rgba(69, 53, 102, 0.12), transparent 45%), linear-gradient(180deg, rgba(12,11,10,0.2), rgba(6,5,4,0.92))",
        "hollow-boss-dungeon":
          "linear-gradient(180deg, rgba(139, 111, 196, 0.2), transparent 38%), linear-gradient(160deg, rgba(45, 35, 64, 0.45), transparent 50%), linear-gradient(180deg, rgba(8,7,6,0.25), rgba(3,2,2,0.96))",
        "loom-dungeon":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(220, 100, 100, 0.26), transparent 55%), radial-gradient(ellipse 45% 40% at 88% 72%, rgba(200, 120, 80, 0.18), transparent 50%), radial-gradient(ellipse 35% 30% at 10% 78%, rgba(196, 88, 88, 0.14), transparent 45%), linear-gradient(180deg, rgba(28, 16, 16, 0.18), rgba(20, 12, 12, 0.78))",
        "loom-boss-dungeon":
          "linear-gradient(180deg, rgba(232, 120, 100, 0.22), transparent 38%), linear-gradient(150deg, rgba(180, 100, 64, 0.22), transparent 50%), linear-gradient(180deg, rgba(20, 10, 10, 0.22), rgba(14, 8, 8, 0.86))",
        "throne-dungeon":
          "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(155, 40, 72, 0.18), transparent 55%), radial-gradient(ellipse 45% 40% at 88% 72%, rgba(201, 146, 26, 0.16), transparent 50%), radial-gradient(ellipse 35% 30% at 10% 78%, rgba(138, 100, 16, 0.12), transparent 45%), linear-gradient(180deg, rgba(20,15,8,0.2), rgba(10,8,4,0.92))",
        "throne-boss-dungeon":
          "linear-gradient(180deg, rgba(232, 176, 48, 0.22), transparent 40%), linear-gradient(135deg, rgba(107, 24, 48, 0.35), transparent 50%), linear-gradient(180deg, rgba(16,10,4,0.3), rgba(6,4,2,0.96))",
        grid: "linear-gradient(rgba(155, 176, 166, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 176, 166, 0.04) 1px, transparent 1px)",
        "salt-grid":
          "linear-gradient(rgba(94, 212, 240, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 212, 240, 0.06) 1px, transparent 1px)",
        "spire-grid":
          "linear-gradient(rgba(58, 168, 152, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(58, 168, 152, 0.06) 1px, transparent 1px)",
        "hollow-grid":
          "linear-gradient(rgba(122, 114, 104, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(122, 114, 104, 0.06) 1px, transparent 1px)",
        "loom-grid":
          "linear-gradient(rgba(212, 136, 88, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 136, 88, 0.08) 1px, transparent 1px)",
        "throne-grid":
          "linear-gradient(rgba(201, 146, 26, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 146, 26, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
        "salt-grid": "40px 40px",
        "spire-grid": "44px 44px",
        "hollow-grid": "52px 52px",
        "loom-grid": "48px 48px",
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
