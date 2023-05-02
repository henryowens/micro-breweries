import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        margin: 0,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        padding: "25px 15px",
      },
    }),
  },
  colors: {
    primary: { 500: "#4062BB" },
    secondary: { 500: "#52489C" },
    green: { 500: "#59C3C3", 200: "#cff8f8" },
    red: { 500: "#F45B69", 200: "#fae0e2" },
    whitesmoke: { 500: "#EBEBEB", 600: "#d6cbcb" },
    gray: { 500: "#787878" },
  },
  fonts: {
    body: "-apple-system, BlinkMacSystemFont",
    heading: "Helvetica Neue",
    mono: "sans-serif",
  },
  space: {
    px: "1px",
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
});

export default theme;
