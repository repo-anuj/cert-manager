/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#28A745",
        accent: "#6C757D",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [
    // Custom plugin to add sidebar-expanded variant
    function({ addVariant }) {
      // Add a custom variant for when the sidebar is expanded
      addVariant('sidebar-expanded', '.sidebar-expanded &');
    }
  ],
};