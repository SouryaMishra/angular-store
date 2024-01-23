/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        card: "300px minmax(0, 1fr)",
      },
    },
  },
  plugins: [],
};
