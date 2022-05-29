import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditBaseline from "../components/EditBaseline";
import SkiForm from "../components/SkiForm";
import ApiClient from "../service/api-client";

function EditSki({ setErrors, onEdit }) {
  const [ski, setSki] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchSki = async () => {
      try {
        const ski = await ApiClient.fetchSkiById(params.skiId);
        setSki(ski);
      } catch (error) {
        setErrors([error]);
      }
    };
    fetchSki();
  }, []);

  return (
    <EditBaseline
      productHeading={"Ski"}
      form={
        <SkiForm
          initialValues={ski}
          forEdit={true}
          setErrors={setErrors}
          updateProducts={onEdit}
        />
      }
    />
  );
}

export default EditSki;
