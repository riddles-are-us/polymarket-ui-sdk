/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1E88E5",
        secondary: "#757575",
        success: "#4CAF50",
        danger: "#F44336",
        warning: "#FFC107",
        info: "#2196F3",
      },
    },
  },
  plugins: [],
};
