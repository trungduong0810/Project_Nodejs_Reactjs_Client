/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        discount: "#D73831",
        bgProductOutstanding: "#E5F8F4",
        bgFooter: "#3B3C41",
      },
    },
    screens: {
      mobile: "360px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [],
};
