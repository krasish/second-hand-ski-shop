import { Grid, Pagination, Stack } from "@mui/material";
import React from "react";
import SkiFilter from "../components/SkiFilter";
import ProductAlbum from "../components/ProductAlbum";
import { Box } from "@mui/system";

function Catalog({ ski }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: "background.default",
        pb: 20,
        pt: 12,
      }}
    >
      <Grid item xs={12} sm={2}>
        <SkiFilter />
      </Grid>
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
        <ProductAlbum products={ski} smallestCardSize={3}></ProductAlbum>
        <Box py={2}>
          <Stack spacing={2}>
            <Pagination count={10} page={page} onChange={handleChange} />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Catalog;
