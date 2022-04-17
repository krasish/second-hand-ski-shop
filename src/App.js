import { CssBaseline } from "@mui/material";
import React from "react";
import SkiAppBar from "./components/SkiAppBar.js";
import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home.js";

const pages = [
  { title: "Ski", subpages: ["Men Ski", "Women Ski", "Kids Ski"] },
  {
    title: "Ski Boots",
    subpages: ["Men Ski Boots", "Women Ski Boots", "Kids Ski Boots"],
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SkiAppBar settings={settings} pages={pages} />
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
