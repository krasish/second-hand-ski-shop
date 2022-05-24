import { Box, Container, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import SkiBootForm from "../components/SkiBootForm";
import SkiForm from "../components/SkiForm";

const [PRODUCT_SKI, PRODUCT_SKI_BOOT] = ["Ski", "Ski boots"];

function AddProduct({ setErrors, updateProducts }) {
  const [product, setProduct] = useState(PRODUCT_SKI);

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
            <SkiForm setErrors={setErrors} updateProducts={updateProducts} />
          ) : (
            <SkiBootForm
              setErrors={setErrors}
              updateProducts={updateProducts}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default AddProduct;
