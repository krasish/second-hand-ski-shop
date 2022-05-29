import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function EditBaseline({ productHeading, form }) {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        paddingBottom: "50%",
        paddingTop: 12,
      }}
    >
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            padding: 3,
            boxShadow: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography component="h1" variant="h4" paddingBottom={5}>
            Edit {productHeading}
          </Typography>
          {form}
        </Box>
      </Container>
    </Box>
  );
}

export default EditBaseline;
