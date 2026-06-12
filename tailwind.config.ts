import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bloom: {
          black: "#100716",
          plum: "#180B24",
          surface: "#241032",
          purple: "#8B5CF6",
          violet: "#A855F7",
          pink: "#EC4899",
          rose: "#F472B6",
          lavender: "#C4B5FD",
          blush: "#FBCFE8",
          text: "#FDF4FF",
          muted: "#A78BFA",
          success: "#34D399",
          danger: "#FB7185",
          warning: "#FBBF24",
          info: "#60A5FA"
        }
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
