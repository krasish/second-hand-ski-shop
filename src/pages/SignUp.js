import { Avatar, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";

import UserForm from "../components/UserForm";

function SignUp() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        paddingBottom: "20%",
        paddingTop: 8,
      }}
    >
      <Container component="main" maxWidth="sm">
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.light" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" paddingBottom={5}>
            Sign up
          </Typography>
          <UserForm />
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;
