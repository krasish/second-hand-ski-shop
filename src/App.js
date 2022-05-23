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
import SignIn from "./pages/SignIn.js";
import UserContext from "./components/UserContext";
import AddProduct from "./pages/AddProduct.js";

function App() {
  const [ski, setSki] = useState([]);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);

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

  const setUserContext = (user) => {
    setUser(user);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <UserContext.Provider value={user}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Baseline onLogout={() => setUserContext(null)} />}>
              <Route index element={<Home ski={ski} />}></Route>
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/sign-in"
                element={<SignIn onSignIn={setUserContext} />}
              />
              <Route path="/catalog-ski" element={<Catalog ski={ski} />} />
              <Route
                path="/catalog-ski/:skiId"
                element={<Product ski={ski} />}
              />
              <Route path="add-product" element={<AddProduct />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
