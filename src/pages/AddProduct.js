import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import SkiBootForm from "../components/SkiBootForm";
import SkiForm, { SkiSchema } from "../components/SkiForm";
import { CATEGORIES, CATEGORY_MEN } from "../model/category";

const [PRODUCT_SKI, PRODUCT_SKI_BOOT] = ["Ski", "Ski boots"];

function handleSkiSubmit(values) {}

function handleSkiBootSubmit(values) {}

function AddProduct() {
  const [product, setProduct] = useState(PRODUCT_SKI);

  const formik = useFormik({
    initialValues: {
      category: CATEGORIES[CATEGORY_MEN],
      imageUrls: "",
    },
    validationSchema: product === PRODUCT_SKI ? SkiSchema : null,
    onSubmit: async (values) => {
      product === PRODUCT_SKI
        ? handleSkiSubmit(values)
        : handleSkiBootSubmit(values);
    },
  });

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        paddingBottom: "35%",
        paddingTop: 8,
      }}
    >
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            boxShadow: 5,
            bgcolor: "background.paper",
          }}
        >
          <Typography component="h1" variant="h4" paddingBottom={5}>
            Add product
          </Typography>

          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={product}
            onChange={(event) => setProduct(event.target.value)}
            variant="outlined"
            sx={{
              fontSize: "110%",
              fontWeight: "bold",
              mb: 4,
              color: "white",
              backgroundColor: "info.dark",
            }}
            fullWidth
          >
            <MenuItem
              sx={{
                fontSize: "110%",
              }}
              value={PRODUCT_SKI}
            >
              {PRODUCT_SKI}
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: "110%",
              }}
              value={PRODUCT_SKI_BOOT}
            >
              {PRODUCT_SKI_BOOT}
            </MenuItem>
          </Select>

          {product === PRODUCT_SKI ? (
            <SkiForm formik={formik} />
          ) : (
            <SkiBootForm />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default AddProduct;
