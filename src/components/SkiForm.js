import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { React, useContext } from "react";
import { SKILLS, SKILL_BEGINNER } from "../model/skill";
import { CATEGORIES, CATEGORY_MEN } from "../model/category";
import { Ski } from "../model/ski";
import { useFormik } from "formik";
import ApiClient from "../service/api-client";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

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
  "OTHER",
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
  size: yup
    .number()
    .integer("Size must be a whole number")
    .positive("Size must be a positive number")
    .lessThan(280, "Size cannot be bigger than 280"),
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

function SkiForm({ setErrors, updateProducts }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      manufacturer: SKI_MANUFACTURERS[0],
      model: "",
      description: "",
      size: 150,
      year: 2000,
      skill: SKILLS[SKILL_BEGINNER],
      price: 0.0,
      condition: 5,
      category: CATEGORIES[CATEGORY_MEN],
      photos: [],
    },
    validationSchema: SkiSchema,
    onSubmit: async (values) => {
      const id = crypto.randomUUID();
      const ski = new Ski({ id: id, userId: user.id, ...values });
      try {
        await ApiClient.createSki(ski);
        updateProducts();
        navigate("/catalog-ski");
      } catch (error) {
        setErrors([error]);
      }
    },
  });

  const years = Array(30)
    .fill(new Date().getFullYear())
    .map((x, y) => x - y);

  const handleChangeForMultipleInputs = (e, value) => {
    formik.setFieldValue("photos", value);
  };

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel variant="standard">Manufacturer</InputLabel>
          <NativeSelect
            id="manufacturer"
            name="manufacturer"
            value={formik.values.manufacturer}
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.manufacturer}
            error={
              formik.touched.manufacturer && Boolean(formik.errors.manufacturer)
            }
            helperText={
              formik.touched.manufacturer && formik.errors.manufacturer
            }
          >
            {SKI_MANUFACTURERS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
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
          defaultValue={formik.initialValues.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel variant="standard">Category</InputLabel>
          <NativeSelect
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.category}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel variant="standard">Year</InputLabel>
          <NativeSelect
            id="year"
            name="year"
            value={formik.values.year}
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.year}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Skill
          </InputLabel>
          <NativeSelect
            id="skill"
            name="skill"
            value={formik.values.skill}
            onChange={formik.handleChange}
            defaultValue={SKILLS[SKILL_BEGINNER]}
            error={formik.touched.skill && Boolean(formik.errors.skill)}
            helperText={formik.touched.skill && formik.errors.skill}
          >
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          fullWidth
          autoFocus
          required
          id="size"
          name="size"
          label="Size"
          type="number"
          value={formik.values.size}
          onChange={formik.handleChange}
          error={formik.touched.size && Boolean(formik.errors.size)}
          helperText={formik.touched.size && formik.errors.size}
        />
      </Grid>
      <Grid item xs={12} sm={2}></Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          fullWidth
          autoFocus
          required
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography id="input-slider" color="text.secondary" gutterBottom>
          Condition
        </Typography>
        <Slider
          name="condition"
          id="condition"
          label="condition"
          defaultValue={formik.initialValues.condition}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          value={formik.values.condition}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="description"
          label="Description"
          type="description"
          id="description"
          multiline={true}
          minRows={8}
          defaultValue={formik.initialValues.description}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          id="photos"
          name="photos"
          label="Photos"
          multiple
          freeSolo
          fullWidth
          sx={{ bgcolor: "white" }}
          defaultValue={formik.initialValues.photos}
          options={formik.values.photos}
          onChange={handleChangeForMultipleInputs}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                color="secondary"
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              placeholder="Photos"
              color="primary"
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Button color="success" variant="contained" fullWidth type="submit">
          Publish
        </Button>
      </Grid>
    </Grid>
  );
}

export default SkiForm;
