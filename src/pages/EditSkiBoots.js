import React from "react";
import EditBaseline from "../components/EditBaseline";
import SkiBootForm from "../components/SkiBootForm";

function EditSkiBoots({ onEdit }) {
  return (
    <EditBaseline
      productHeading={"Ski Boots"}
      form={<SkiBootForm></SkiBootForm>}
    />
  );
}

export default EditSkiBoots;
