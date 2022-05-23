import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box
        bgcolor="background.default"
        height="100vh"
        sx={{
          pt: "20%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" pt={6}>
          There's nothing here :/
        </Typography>
        <Button
          color="warning"
          variant="contained"
          // size="large"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: "2.5%", ml: 6, px: 3, height: 50 }}
          onClick={() => navigate(-1)}
        >
          BACK
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default NotFound;
