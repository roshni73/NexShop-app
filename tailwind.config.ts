import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00CCCC",
        bg: "#ffffff",
      },
    },
  },
  plugins: [],
};

export default config;
