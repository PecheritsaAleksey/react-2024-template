/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f9f7ff",
      },
      scale: {
        '101': '1.01',
      }
    },
  },
  plugins: [],
};
