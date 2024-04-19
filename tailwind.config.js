/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainY: "#FCDC2A",
        mainG: "#2A6448",
        YbtnText: "#3C3C3C",
        GbtnText: "#FFFFFF",
      },
    },
  },
  plugins: [require("daisyui")],
};
