import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";

function NotFound() {
  return (
    <React.Fragment>
      <Box>
        <Typography variant="h3" align="center" pt={4}>
          There's nothing here :/
        </Typography>
      </Box>
    </React.Fragment>
  );
}

export default NotFound;
