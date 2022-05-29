import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function DescriptionCard({ product }) {
  return (
    <React.Fragment>
      <Card sx={{ bgcolor: "info.light" }}>
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
          {product.flexIndex && (
            <Typography variant="subtitle1">
              <b>Flex index:</b> {product.flexIndex}
            </Typography>
          )}
          {product.skill && (
            <Typography variant="subtitle1">
              <b>Skill:</b>{" "}
              {product.skill.charAt(0).toUpperCase() + product.skill.slice(1)}
            </Typography>
          )}
          {product.category && (
            <Typography variant="subtitle1">
              <b>Category:</b>{" "}
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Typography>
          )}
          <Typography variant="subtitle1">
            <b>Condition:</b> {product.condition}
          </Typography>
          <Typography variant="subtitle1">
            <b>Price:</b> {product.price}
          </Typography>
          <Typography variant="subtitle1">
            <b>Description:</b> {product.description}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default DescriptionCard;
