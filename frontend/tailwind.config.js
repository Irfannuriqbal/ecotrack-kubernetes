/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(34, 197, 94, 0.08), 0 20px 40px rgba(15, 23, 42, 0.2)",
      },
      backgroundImage: {
        "eco-grid":
          "radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.14) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
