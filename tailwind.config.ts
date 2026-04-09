import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1a1a1a",
        accent: "#16a34a",
        "accent-hover": "#15803d",
        border: "#e5e7eb",
        "gray-light": "#f9fafb",
        "gray-mid": "#6b7280",
      },
    },
  },
  plugins: [],
};
export default config;
