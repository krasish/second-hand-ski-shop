import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../service/api-client";
import { GENDERS, GENDER_MALE, User } from "../model/user";
import * as yup from "yup";
import MuiPhoneNumber from "material-ui-phone-number-2";

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
    .max(32, "Username should be less that 16 characters"),
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

const defaultInitialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  gender: GENDERS[GENDER_MALE],
  imageUrl: "",
  phone: "",
};

function defaultOnEdit(user) {
  console.log(`Attempted to edit ${user}`);
}

function UserForm({
  initialValues = defaultInitialValues,
  forEdit = false,
  onEdit = defaultOnEdit,
}) {
  const navigate = useNavigate();

  const handleCreateSubmit = async (values) => {
    const id = crypto.randomUUID();
    const imageUrl =
      values.imageUrl?.length > 0
        ? values.imageUrl
        : values.gender === GENDERS[GENDER_MALE]
        ? MALE_DEFAULT_IMAGE
        : FEMALE_DEFAULT_IMAGE;
    const user = new User({ id: id, ...values, imageUrl: imageUrl });
    try {
      await ApiClient.createUser(user);
      navigate("/sign-in");
    } catch (error) {
      alert(error);
    }
  };

  const handleEditSubmit = async (values) => {
    const user = new User({ ...values });
    try {
      await ApiClient.editUser(user);
      onEdit(user);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      if (forEdit) {
        await handleEditSubmit(values);
      } else {
        await handleCreateSubmit(values);
      }
    },
  });

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
          defaultValue={formik.initialValues.email}
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
          defaultValue={formik.initialValues.firstName}
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
          defaultValue={formik.initialValues.lastName}
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
          defaultValue={formik.initialValues.username}
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
          defaultValue={formik.initialValues.password}
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
          defaultValue={formik.initialValues.gender}
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
        <MuiPhoneNumber
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          autoComplete="tel"
          defaultCountry={"bg"}
          regions="europe"
          value={formik.values.phone}
          defaultValue={formik.initialValues.phone}
          onChange={(v) => formik.setFieldValue("phone", v)}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="imageUrl"
          fullWidth
          id="imageUrl"
          label="Image URL"
          value={formik.values.imageUrl}
          defaultValue={formik.initialValues.imageUrl}
          onChange={formik.handleChange}
          error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          helperText={formik.touched.imageUrl && formik.errors.imageUrl}
        />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" fullWidth type="submit">
          {forEdit ? "Update" : "Sign Up"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default UserForm;
