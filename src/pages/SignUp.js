import {
  Avatar,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import * as yup from "yup";
import { GENDERS, GENDER_MALE, User } from "../model/user";
import ApiClient from "../service/api-client";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email(),
  firstName: yup
    .string()
    .required("First name is required")
    .max(32, "First name should be less that 32 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(32, "Last name should be less that 32 characters"),
  username: yup
    .string()
    .required("Username is required")
    .max(16, "Username should be less that 16 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should contain one letter, one digit, one special character"
    ),
  gender: yup
    .string()
    .required("Gender is required")
    .matches(/(male|female)/, "Gender can only be 'male' or 'female'"),
  imageUrl: yup.string().url(),
});

const [MALE_DEFAULT_IMAGE, FEMALE_DEFAULT_IMAGE] = [
  "https://as1.ftcdn.net/v2/jpg/01/40/46/18/1000_F_140461899_dvRngd7xvZtqCUHLiIyRjgflq2EmwnVP.jpg",
  "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/03/depositphotos_121233300-stock-illustration-female-default-avatar-gray-profile.jpg",
];

function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      gender: GENDERS[GENDER_MALE],
      imageUrl: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const id = crypto.randomUUID();
      const imageUrl =
        values.imageUrl ||
        (values.gender === GENDERS[GENDER_MALE]
          ? MALE_DEFAULT_IMAGE
          : FEMALE_DEFAULT_IMAGE);
      const user = new User({ id: id, imageUrl: imageUrl, ...values });
      try {
        await ApiClient.createUser(user);
        navigate("/sign-in");
      } catch (error) {
        alert(error);
      }
    },
  });

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
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                autoFocus
                required
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                autoComplete="given-name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                autoComplete="family-name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
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
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
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
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel required id="gender" type="gender">
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                defaultValue="male"
                name="gender"
                type="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
              >
                <FormControlLabel
                  value="male"
                  label="Male"
                  control={<Radio />}
                />
                <FormControlLabel
                  value="female"
                  label="Female"
                  control={<Radio />}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="imageUrl"
                fullWidth
                id="imageUrl"
                label="Image URL"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                error={
                  formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                }
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;
