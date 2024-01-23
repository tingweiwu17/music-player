/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./**/*.js"],
  theme: {
    extend: {
      colors: {
        themeBlue: "#0089D1",
        themeGreen: "#02B6B3",
        grayBg: "rgba(255,255,255,0.2)",
        playingBg: "rgba(235,241,244,0.5)",
      },
      fontSize: {
        title: "20px",
      },
    },
  },
  plugins: [],
};
