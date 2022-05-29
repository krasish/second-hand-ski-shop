import React, { useContext } from "react";
import EditBaseline from "../components/EditBaseline";
import UserContext from "../components/UserContext";
import UserForm from "../components/UserForm";

function EditUser({ onEdit }) {
  const user = useContext(UserContext);

  return (
    <EditBaseline
      productHeading={"User"}
      form={<UserForm initialValues={user} forEdit={true} onEdit={onEdit} />}
    />
  );
}

export default EditUser;
