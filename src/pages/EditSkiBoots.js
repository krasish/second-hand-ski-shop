import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditBaseline from "../components/EditBaseline";
import SkiBootForm from "../components/SkiBootForm";
import ApiClient from "../service/api-client";

function EditSkiBoots({ setErrors, onEdit }) {
  const [boots, setBoots] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchSki = async () => {
      try {
        const boots = await ApiClient.fetchBootsById(params.skiBootId);
        setBoots(boots);
      } catch (error) {
        setErrors([error]);
      }
    };
    fetchSki();
  }, []);

  return (
    <EditBaseline
      productHeading={"Ski Boot"}
      form={
        <SkiBootForm
          initialValues={boots}
          forEdit={true}
          setErrors={setErrors}
          updateProducts={onEdit}
        />
      }
    />
  );
}

export default EditSkiBoots;
