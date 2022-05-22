import React from "react";
import { Outlet } from "react-router-dom";
import SkiAppBar from "./SkiAppBar";

function Baseline({ onLogout }) {
  return (
    <React.Fragment>
      <SkiAppBar onLogout={onLogout} />
      <Outlet />
    </React.Fragment>
  );
}

export default Baseline;
