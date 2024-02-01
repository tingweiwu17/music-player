/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./**/*.js"],
  theme: {
    extend: {
      colors: {
        themeBlue: "rgba(0, 137, 209, 0.5)",
        themeGreen: "rgba(2, 182, 179, 0.5)",
        grayBg: "rgba(0,0,0,0.5)",
        playingBg: "rgba(235,241,244,0.5)",
        lightGray: "rgb(225,225,225)",
      },
      fontSize: {
        title: "20px",
      },
      minHeight: {
        playing: "calc(100% - 56px)",
        playlist: "calc(100vh - 136px)",
      },
    },
  },
  plugins: [],
};
