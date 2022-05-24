import { Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const MISSING_REVIEW_VALUE = -1;

function ConditionalRating({ rating }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="h6" pr={2}>
        {" "}
        Rating:{" "}
      </Typography>
      {rating !== MISSING_REVIEW_VALUE ? (
        <Rating readOnly size="medium" precision={0.5} value={rating}></Rating>
      ) : (
        <Typography variant="overline"> N/A</Typography>
      )}
    </Box>
  );
}

export default ConditionalRating;
