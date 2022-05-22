import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import ApiClient from "../service/api-client";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function SignIn() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const user = await ApiClient.login(values.username, values.password);
      console.log(user);
    },
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" paddingBottom={5}>
          Sign In
        </Typography>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="username"
              name="username"
              label="Username"
              type="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth type="submit">
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignIn;
