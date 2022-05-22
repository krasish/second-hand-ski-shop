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

const trimDescription = (description) => {
  if (description.length > 150) {
    return description.substr(0, 150) + " ...";
  }
  return description;
};

function ProductAlbum({ products }) {
  return (
    <Container
      sx={{ mt: 4, py: 8, backgroundColor: "background.paper", boxShadow: 3 }}
      maxWidth="xl"
    >
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                width="100%"
                height="280"
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
                    <Button size="small">View</Button>
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
