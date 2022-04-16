import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ApiClient from "../service/api-client";

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
    <div>
      Skis:
      {ski.map((s) => (
        <p>{JSON.stringify(s)}</p>
      ))}
      <br />
      Errors: {errors.toString()}
    </div>
  );
}

Home.propTypes = {};

export default Home;
