import { Box, Grid, Typography } from "@mui/material";
import { display } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
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
    console.log(e);
    setModalImage(e.target.src);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const productIndex = parseInt(params.skiId);
  const current = ski.find((s) => s.id === productIndex);

  return (
    <React.Fragment>
      <Box pt={4} display="flex" justifyContent="center">
        <Grid
          container
          spacing={2}
          sx={{
            align: "center",
            bgcolor: "secondary.light",
            width: "95%",
          }}
        >
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h3"
              color="text.secondary"
              gutterBottom
            >
              {current.manufacturer} {current.model}
            </Typography>
          </Grid>
          <Grid item>
            <QuiltedImageList
              images={current.photos}
              openModal={handleModalOpen}
            ></QuiltedImageList>
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
