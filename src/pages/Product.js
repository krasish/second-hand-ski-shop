import { Box, Grid, Typography } from "@mui/material";
import { display } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import DescriptionCard from "../components/DescriptionCard";
import ImageModal from "../components/ImageModal";
import NotFound from "../components/NotFound";
import QuiltedImageList from "../components/QuiltedImageList";

function Product({ ski, ...rest }) {
  const params = useParams();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState("");

  if (!ski || ski.length === 0) {
    return <NotFound />;
  }

  const handleModalOpen = (e) => {
    setModalImage(e.target.src);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const productIndex = params.skiId;
  const current = ski.find((s) => s.id === productIndex);

  return (
    <React.Fragment>
      <Box
        pt={4}
        display="flex"
        justifyContent="center"
        sx={{ bgcolor: "background.default", pb: "25%" }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            align: "center",
            bgcolor: "info.light",
            width: "95%",
            pb: "10%",
            boxShadow: 5,
          }}
        >
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h3"
              color="text.secondary"
              ml="12%"
              gutterBottom
            >
              {current.manufacturer} {current.model}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <QuiltedImageList
              images={current.photos}
              openModal={handleModalOpen}
            ></QuiltedImageList>
          </Grid>
          <Grid item xs={12} md={5}>
            <DescriptionCard product={current}></DescriptionCard>
          </Grid>
        </Grid>
        <ImageModal
          image={modalImage}
          alt={`${current.manufacturer} ${current.model}`}
          isOpen={modalOpen}
          handleClose={handleModalClose}
        />
      </Box>
    </React.Fragment>
  );
}

export default Product;
