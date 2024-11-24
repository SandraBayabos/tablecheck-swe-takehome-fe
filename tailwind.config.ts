import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

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
        brandBeige: "#e8d1af",
        brandDarkBrown: "#54330f",
        brandLightText: "#efe4d3",
        brandMediumBrown: "#a89678",
      },
    },
  },
  plugins: [forms],
};

export default config;
