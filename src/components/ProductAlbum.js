import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import PaidIcon from "@mui/icons-material/Paid";
import React from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import ApiClient from "../service/api-client";

const trimDescription = (description) => {
  if (description.length > 150) {
    return description.substr(0, 150) + " ...";
  }
  return description;
};

function ProductAlbum({
  products,
  smallestCardSize = 2,
  setErrors,
  updateProducts,
}) {
  const navigate = useNavigate();

  function handleViewButton(product) {
    const toPrefix = product.skill ? "/catalog-ski/" : "/catalog-ski-boots/";
    navigate(`${toPrefix}${product.id}`);
  }

  function handleEditButton(product) {
    const toPrefix = product.skill ? "/edit-ski/" : "/edit-ski-boots/";
    navigate(`${toPrefix}${product.id}`);
  }

  async function handleDeleteButton(product) {
    try {
      if (product.skill) {
        await ApiClient.deleteSki(product.id);
      } else {
        await ApiClient.deleteBoot(product.id);
      }
      await updateProducts();
    } catch (err) {
      setErrors([err]);
    }
  }

  return (
    <Container
      sx={{ mt: 4, py: 8, backgroundColor: "background.paper" }}
      maxWidth="xl"
    >
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={smallestCardSize}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#a2a3a8",
              }}
            >
              <CardMedia
                component="img"
                width="100%"
                height={smallestCardSize * 140}
                image={
                  p.photos.length
                    ? p.photos[0]
                    : require("../resources/images/no_images.jpg")
                }
                alt={`Picture of ${p.manufacturer} ${p.model}`}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  {p.manufacturer} {p.model}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body"
                  component="p"
                  sx={{ width: "100%", flexGrow: 1 }}
                >
                  {trimDescription(p.description)}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    columnGap: 1,
                  }}
                >
                  <PaidIcon fontSize="large" color="success" />
                  <Typography gutterBottom variant="h6" color="success">
                    {p.price}
                  </Typography>
                </Box>

                <CardActions
                  sx={{
                    display: "flex",
                  }}
                >
                  <ButtonGroup
                    color="primary"
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button size="small" onClick={() => handleViewButton(p)}>
                      View
                    </Button>
                    <RequireAuth userID={p.userId}>
                      <Button
                        size="small"
                        color="success"
                        onClick={() => handleEditButton(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteButton(p)}
                      >
                        Delete
                      </Button>
                    </RequireAuth>
                  </ButtonGroup>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductAlbum;
