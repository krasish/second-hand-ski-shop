import { Alert, AlertTitle, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SkiAppBar from "./SkiAppBar";

function Baseline({ setErrors, errors, onLogout }) {
  return (
    <React.Fragment>
      <SkiAppBar onLogout={onLogout} />
      {errors?.length ? (
        <Alert variant="filled" severity="error" onClose={() => setErrors([])}>
          {errors?.map((e) => (
            <>
              <Typography key={e} variant="subtitle2">
                {e.toString()}
              </Typography>
            </>
          ))}
        </Alert>
      ) : (
        <></>
      )}

      <Outlet />
    </React.Fragment>
  );
}

export default Baseline;
