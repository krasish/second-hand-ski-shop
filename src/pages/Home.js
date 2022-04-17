import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApiClient from "../service/api-client";
import Box from "@mui/system/Box";
import SkiAppBar from "../components/SkiAppBar.js";
import Copyright from "../components/Copyright";

const pages = [
  { title: "Ski", subpages: ["Men Ski", "Women Ski", "Kids Ski"] },
  {
    title: "Ski Boots",
    subpages: ["Men Ski Boots", "Women Ski Boots", "Kids Ski Boots"],
  },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Home(props) {
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
      // ...
    }
    fetchSkis();
  }, []);

  return (
    <>
      <SkiAppBar settings={settings} pages={pages} />
      <Box>
        Skis:
        {ski.map((s) => (
          <p key={s.id}>{JSON.stringify(s)}</p>
        ))}
        <br />
        Errors: {errors.toString()}
      </Box>
      <Copyright />
    </>
  );
}

Home.propTypes = {};

export default Home;
