/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      small: { max: "767px" },
      medium: { min: "768px", max: "1279px" },
      large: { min: "1280px" },
    },
    container: {
      center: true,
      // We'll use the same max-width for medium & large => 1128px
      screens: {
        medium: "1128px",
        large: "1128px",
      },
      padding: {
        // For small screens (<768px), we can still have a little padding
        DEFAULT: "1rem",  // e.g. 16px left/right
        // But once we hit medium/large, remove the extra side padding
        medium: "0px",
        large: "0px",
      },
    },
    extend: {},
  },
  plugins: [],
};
