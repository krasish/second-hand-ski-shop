import { Grid, Pagination, Stack, Typography } from "@mui/material";
import React from "react";
import SkiFilter from "../components/SkiFilter";
import ProductAlbum from "../components/ProductAlbum";
import { Box } from "@mui/system";
import ProductAlbumPaged from "../components/ProductAlbumPaged";

function Catalog({ ski }) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: "background.default",
        pb: 50,
        pt: 12,
      }}
    >
      <Grid
        item
        xs={12}
        sm={2}
        sx={{
          display: "flex",
          boxShadow: 5,
          mx: 3,
          py: 3,
          height: "fit-content",
          justifyContent: "center",
          flexWrap: "wrap",
          bgcolor: "background.paper",
        }}
      >
        <SkiFilter />
      </Grid>
      <ProductAlbumPaged products={ski} />
    </Grid>
  );
}

export default Catalog;
