import { CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme.js";
import Home from "./pages/Home.js";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/NotFound.js";
import Catalog from "./pages/Catalog.js";
import Baseline from "./components/Baseline.js";
import Product from "./pages/Product.js";
import ApiClient from "./service/api-client.js";
import SignUp from "./pages/SignUp.js";

const pages = [
  { title: "Ski", subpages: ["Men Ski", "Women Ski", "Kids Ski"] },
  {
    title: "Ski Boots",
    subpages: ["Men Ski Boots", "Women Ski Boots", "Kids Ski Boots"],
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function App() {
  const [ski, setSki] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function fetchSkis() {
      try {
        const response = await ApiClient.fetchSkis();
        setSki(response);
      } catch (error) {
        setErrors(error);
      }
    }
    fetchSkis();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Baseline settings={settings} pages={pages} />}>
            <Route index element={<Home ski={ski} />}></Route>
            <Route path="/catalog-ski" element={<Catalog ski={ski} />} />
            <Route path="/catalog-ski/:skiId" element={<Product ski={ski} />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
