import { CssBaseline } from "@mui/material";
import React from "react";
import SkiAppBar from "./components/SkiAppBar.js";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme.js";
import Home from "./pages/Home.js";

const pages = [
  { title: "Ski", subpages: ["Men Ski", "Women Ski", "Kids Ski"] },
  {
    title: "Ski Boots",
    subpages: ["Men Ski Boots", "Women Ski Boots", "Kids Ski Boots"],
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
