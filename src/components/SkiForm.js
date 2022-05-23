import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import React from "react";

export const SkiSchema = yup.object({
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

function SkiForm({ formik }) {
  return (
    <Grid container spacing={2} component="form" onSubmit={formik.handleSubmit}>
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
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
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
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
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
          <FormControlLabel value="male" label="Male" control={<Radio />} />
          <FormControlLabel value="female" label="Female" control={<Radio />} />
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
          error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          helperText={formik.touched.imageUrl && formik.errors.imageUrl}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" fullWidth type="submit">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}

export default SkiForm;
