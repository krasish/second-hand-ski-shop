import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import UserContext from "./UserContext";
import ApiClient from "../service/api-client";
import { Button, Grid, Rating, TextField, Typography } from "@mui/material";
import { Review } from "../model/review";

export const ReviewSchema = yup.object({
  review: yup
    .string()
    .max(2048, "Review cannot be longer than 2048 characters"),
  rating: yup
    .number()
    .positive("Rating can be on scale from 0 to 5")
    .lessThan(6, "Rating can be on scale from 0 to 5"),
});

function ReviewForm({ setErrors, forUser, onUpdate }) {
  const user = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      review: "",
      rating: 2.5,
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values) => {
      const id = crypto.randomUUID();
      const review = new Review({
        id: id,
        fromUserId: user.id,
        forUserId: forUser,
        ...values,
      });
      try {
        await ApiClient.createReview(review);
        await onUpdate();
      } catch (error) {
        setErrors([error]);
      }
    },
  });

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12} sx={{ ml: "32%", display: "flex" }} direction="row">
        <Typography variant="h6" pb={2} pr={3} component="legend">
          Rating
        </Typography>
        <Rating
          name="rating"
          label="Rating"
          type="text"
          id="rating"
          size="large"
          precision={0.5}
          value={formik.values.rating}
          onChange={formik.handleChange}
          defaultValue={formik.initialValues.rating}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="review"
          label="Review"
          type="text"
          id="review"
          multiline={true}
          minRows={8}
          defaultValue={formik.initialValues.review}
          value={formik.values.review}
          onChange={formik.handleChange}
          error={formik.touched.review && Boolean(formik.errors.review)}
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

export default ReviewForm;
