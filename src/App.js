import { CssBaseline } from "@mui/material";
import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme.js";
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound.js";

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
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={<Home settings={settings} pages={pages} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
