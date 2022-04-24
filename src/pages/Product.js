import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

function Product() {
  let params = useParams();
  return <Typography>This is product #{params.skiId}</Typography>;
}

export default Product;
