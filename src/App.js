import { CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import theme from "./theme.js";
import Home from "./pages/Home.js";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/NotFound.js";
import CatalogSki from "./pages/CatalogSki";
import Baseline from "./components/Baseline.js";
import Product from "./pages/Product.js";
import ApiClient from "./service/api-client.js";
import SignUp from "./pages/SignUp.js";
import SignIn from "./pages/SignIn.js";
import UserContext from "./components/UserContext";
import AddProduct from "./pages/AddProduct.js";
import Users from "./pages/Users.js";
import RequireAuthRedirect from "./components/RequireAuthRedirect";
import CatalogSkiBoots from "./pages/CatalogSkiBoots.js";
import { sortByDateAsc } from "./model/sort.js";
import EditUser from "./pages/EditUser.js";

function App() {
  const [ski, setSki] = useState([]);
  const [boots, setBoots] = useState([]);

  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(null);

  async function fetchSkis() {
    try {
      const response = await ApiClient.fetchSkis();
      setSki(response);
    } catch (error) {
      setErrors([error, ...errors]);
    }
  }

  async function fetchBoots() {
    try {
      const response = await ApiClient.fetchBoots();
      setBoots(response);
    } catch (error) {
      setErrors([error, ...errors]);
    }
  }

  async function updateProducts() {
    fetchSkis();
    fetchBoots();
  }

  useEffect(() => {
    updateProducts();
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
            <Route
              element={
                <Baseline
                  setErrors={setErrors}
                  errors={errors}
                  onLogout={() => setUserContext(null)}
                />
              }
            >
              <Route
                index
                element={
                  <Home
                    products={[...ski, ...boots]
                      .sort(sortByDateAsc)
                      .slice(0, 6)}
                  />
                }
              ></Route>
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/sign-in"
                element={<SignIn onSignIn={setUserContext} />}
              />
              <Route path="/catalog-ski" element={<CatalogSki ski={ski} />} />
              <Route
                path="/catalog-ski/:skiId"
                element={
                  <Product
                    setErrors={setErrors}
                    fetchProduct={ApiClient.fetchSkiById}
                  />
                }
              />
              <Route
                path="/catalog-ski-boots"
                element={<CatalogSkiBoots skiBoots={boots} />}
              />
              <Route
                path="/catalog-ski-boots/:skiBootId"
                element={
                  <Product
                    setErrors={setErrors}
                    paramName="skiBootId"
                    fetchProduct={ApiClient.fetchBootsById}
                  />
                }
              />
              <Route
                path="/users"
                element={
                  <Users
                    setErrors={setErrors}
                    updateProducts={updateProducts}
                  />
                }
              />

              <Route
                path="/add-product"
                element={
                  <RequireAuthRedirect to="/sign-in">
                    <AddProduct
                      setErrors={setErrors}
                      updateProducts={updateProducts}
                    />
                  </RequireAuthRedirect>
                }
              />
              <Route
                path="/edit-user"
                element={
                  <RequireAuthRedirect to="/sign-in">
                    <EditUser onEdit={setUserContext} />
                  </RequireAuthRedirect>
                }
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
