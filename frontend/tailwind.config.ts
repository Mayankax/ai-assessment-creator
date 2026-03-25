import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-bricolage)'],
      },
      colors: {
        primary: "#000000", 
        secondary: "#F5F5F5",
        muted: "#9CA3AF",
        border: "#E5E7EB",
        error: "#DC2626", // clean red (not too harsh)
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;