import { Grid, Pagination, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProductAlbum from "./ProductAlbum";

function ProductAlbumPaged({ products, elementsPerPage = 4, heading = "Ski" }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  let pagesCount = Math.floor(products?.length / elementsPerPage) + 1;

  return (
    <Grid
      item
      xs={12}
      sm={9}
      sx={{
        display: "flex",
        boxShadow: 5,
        justifyContent: "center",
        flexWrap: "wrap",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h2" align="center" color="text.primary" gutterBottom>
        {heading}
      </Typography>
      <ProductAlbum
        products={products?.slice(
          elementsPerPage * (page - 1),
          elementsPerPage * page
        )}
        smallestCardSize={3}
      ></ProductAlbum>
      <Box py={2}>
        <Stack spacing={2}>
          <Pagination count={pagesCount} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </Grid>
  );
}

export default ProductAlbumPaged;
