import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"]
      },
      colors: {
        atlas: {
          blue: "#0E2A47",
          teal: "#1E857F",
          sand: "#F4EDE2",
          coral: "#FF6F61",
          dusk: "#1B1A3F"
        }
      },
      boxShadow: {
        atlas: "0 20px 40px -24px rgba(14, 42, 71, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
