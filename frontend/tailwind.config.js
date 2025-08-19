/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigoGray: {
          black: "#12121D",
          900: "#2F304B",
          800: "#343658",
          700: "#3B3D69",
          600: "#484C81",
          500: "#5C629B",
          400: "#7C81B4",
          300: "#AAADCF",
          200: "#D2D4E5",
          100: "#EBEBF3",
          50: "#F5F5FA",
          white: "#FCFDFD",
          "black-opacity-70": "#0D121CB2",
        },
        gray: {
          950: "#2A2A33",
          900: "#373843",
          800: "#3E3E4E",
          700: "#48495C",
          600: "#595A70",
          500: "#6E7189",
          400: "#8C8EA4",
          300: "#B5B6C4",
          200: "#D7D8E0",
          100: "#EDEDF1",
          50: "#F7F7F8",
        },
        purple: {
          900: "#27115F",
          800: "#4A1FB8",
          700: "#5925DC",
          600: "#6938EF",
          500: "#7A5AF8",
          400: "#9B8AFB",
          300: "#BDB4FE",
          200: "#D9D6FE",
          100: "#EBE9FE",
          50: "#F4F3FF",
        },
        unsafe: "#E43DB7",
        safe: "#6A4CC6",
        "unsafe-opacity-25": "#E43D8740",
        "safe-font": "#BA99F0",
        "safe-opacity-25": "#6A4CC640",
      },
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        pretendard: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        xxs: "0.6875rem", // 11px
        xs: "0.75rem", // 12px
        s: "0.875rem", // 14px
        m: "1rem", // 16px
        l: "1.125rem", // 18px
        xl: "1.5rem", // 24px
      },
      borderRadius: {
        full: "9999px", // circular
      },
      spacing: {
        1: "0.25rem", // 4px
        1.5: "0.375rem", // 6px
        2: "0.5rem", // 8px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        8: "2rem", // 32px
      },
    },
  },
  plugins: [],
};
