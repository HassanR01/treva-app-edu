/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bgColor: "#ECFCFF",
        mainColor: "#3E64FF",
        itemBgColor: "#5EDFFF",
        textColor: '#000000',
      },
      fontFamily: {
        blackText: 'Beiruti-Black',
        boldText: 'Beiruti-Bold',
        mediumText: 'Beiruti-Medium',
        regularText: 'Beiruti-Regular',
        lightText: 'Beiruti-Light',
      }
    },
  },
  plugins: [],
}