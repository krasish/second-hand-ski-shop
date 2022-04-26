import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function DescriptionCard({ product }) {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography>Manufacturer: {product.manufacturer}</Typography>
          <Typography>Model: {product.model}</Typography>
          <Typography>Size: {product.size}</Typography>
          <Typography>Year: {product.year}</Typography>
          <Typography>Skill: {product.skill}</Typography>
          <Typography>Description:</Typography>
          <Typography>{product.description}</Typography>
          <Typography>Condition: {product.condition}</Typography>
          <Typography>Price: {product.price}</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default DescriptionCard;
