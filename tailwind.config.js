const defaultColors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cherry-shine":
          "linear-gradient(3.87deg, #FF2B40 -4.3%, #FFB0A5 106.05%);",
        "blue-yellow": "linear-gradient(94.22deg, #88F1FF 0%, #FFD37E 95.51%)",
        "blue-pink": "linear-gradient(262.66deg, #FF99CA 0%, #45E9FF 96.14%)",
        "red-cherry":
          "linear-gradient(86.19deg, #FF2B40 3.12%, #FFB0A5 96.88%)",
      },
      colors: {
        brand: {
          blue: "#5BADE9",
          "pale-blue": "#B5F2FF",
          pastel: "#6EBDCE",
          dark: "#15191B",
          "mid-blue": "#256E7E",
          "blue-gray": "#1C1F21",
        },
        ...defaultColors,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
