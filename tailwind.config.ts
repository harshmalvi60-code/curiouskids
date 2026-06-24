import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0823",
        "void-2": "#15123F",
        aurora: "#8B6CFF",
        gold: "#FFC93C",
        coral: "#FF6B9D",
        teal: "#34E1B6",
        mist: "#C9C6F0",
      },
      fontFamily: {
        display: ["var(--display)"],
      },
    },
  },
  plugins: [],
};
export default config;
