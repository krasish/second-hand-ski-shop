import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function DescriptionCard({ product }) {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">
            <b>Manufacturer:</b> {product.manufacturer}
          </Typography>
          <Typography variant="subtitle1">
            <b>Model:</b> {product.model}
          </Typography>
          <Typography variant="subtitle1">
            <b>Size:</b> {product.size}
          </Typography>
          <Typography variant="subtitle1">
            <b>Year:</b> {product.year}
          </Typography>
          <Typography variant="subtitle1">
            <b>Skill:</b> {product.skill}
          </Typography>
          <Typography variant="subtitle1">
            <b>Description:</b> {product.description}
          </Typography>
          <Typography variant="subtitle1">
            <b>Condition:</b> {product.condition}
          </Typography>
          <Typography variant="subtitle1">
            <b>Price:</b> {product.price}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default DescriptionCard;
