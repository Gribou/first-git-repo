import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";

const Theming = ({ children, theme }) => {
  const custom_theme = createTheme({
    palette: {
      mode: theme || "dark",
      primary: blue,
      background: {
        paper: "#424242",
        default: "#303030",
      },
    },
  });

  return <ThemeProvider theme={custom_theme}>{children}</ThemeProvider>;
};

export default Theming;
