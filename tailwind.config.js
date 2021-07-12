module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
        100: "100",
        "-20": "-20",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
