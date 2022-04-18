import React from "react";
import { Outlet } from "react-router-dom";
import SkiAppBar from "./SkiAppBar";

function Baseline({ settings, pages }) {
  return (
    <React.Fragment>
      <SkiAppBar settings={settings} pages={pages} />
      <Outlet />
    </React.Fragment>
  );
}

export default Baseline;
