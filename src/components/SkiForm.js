import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  NativeSelect,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import React from "react";

export const SKI_MANUFACTURERS = [
  "4FRNT",
  "Atomic",
  "Blizzard",
  "Dynastar",
  "Elan",
  "Fischer",
  "Head",
  "K2",
  "Kneissl",
  "Nordica",
  "Peltonen",
  "Rossignol",
  "Salomon",
  "Völkl",
];

export const SkiSchema = yup.object({
  manufacturer: yup
    .string()
    .required("Manufacturer is required")
    .max(32, "Manufacturer should be less that 32 characters"),
  model: yup
    .string()
    .required("Model is required")
    .max(32, "Model should be less that 32 characters"),
  description: yup
    .string()
    .max(2048, "Description cannot be longer than 2048 characters"),
  category: yup
    .string()
    .required("Category is required")
    .matches(
      /(men|women|kids)/,
      "Category can only be 'men', 'women' or 'kids'"
    ),
  year: yup
    .number()
    .integer()
    .positive()
    .lessThan(
      new Date().getFullYear(),
      "Year cannot be later than current year"
    ),
  skill: yup
    .string()
    .required("Skill is required")
    .matches(
      /(beginner|intermediate|advanced)/,
      "Skill can only be 'beginner', 'intermediate' or 'advanced'"
    ),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price cannot be negative"),
  condition: yup
    .number()
    .integer()
    .moreThan(0, "Condition can be on scale from 1 to 10")
    .lessThan(11, "Condition can be on scale from 1 to 10"),
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
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Manufacturer
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          autoFocus
          required
          id="model"
          name="model"
          label="Model"
          type="text"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
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
