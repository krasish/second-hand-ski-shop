import { Box, Grid, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  PRICE_FROM_SEARCH_PARAM,
  PRICE_TO_SEARCH_PARAM,
} from "../model/search-params";

function SkiFilter({ minPrice = 0, maxPrice = 2000, setSearchParams }) {
  const [value, setValue] = useState([minPrice, maxPrice]);

  function handlePriceSliderChange(event, value) {
    setValue(value);
    const param = {};
    param[PRICE_FROM_SEARCH_PARAM] = value[0];
    param[PRICE_TO_SEARCH_PARAM] = value[1];
    setSearchParams(param);
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        py: 4,
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ px: 3, display: "flex", justifyContent: "center" }}
      >
        <Typography variant="h5" id="price-slider" gutterBottom>
          Filters
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ px: 3 }}>
        <Typography variant="h6" id="price-slider" gutterBottom>
          Price
        </Typography>
        <Slider
          min={minPrice}
          max={maxPrice}
          value={value}
          getAriaLabel={() => "Price range"}
          onChange={handlePriceSliderChange}
          valueLabelDisplay="auto"
        />
      </Grid>
    </Grid>
  );
}

export default SkiFilter;
