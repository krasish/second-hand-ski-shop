import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function ProductAlbum({ products }) {
  return (
    <Container
      sx={{ mt: 4, py: 8, backgroundColor: "background.paper", boxShadow: 3 }}
      maxWidth="xl"
    >
      {/* End hero unit */}
      <Grid container spacing={4}>
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
                image={
                  p.photos.length
                    ? p.photos[0]
                    : require("../resources/images/no_images.jpg")
                }
                alt={`Picture of ${p.manufacturer} ${p.model}`}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {p.manufacturer} {p.model}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductAlbum;
