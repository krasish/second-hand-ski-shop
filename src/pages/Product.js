import { Box, Card, Grid, Typography } from "@mui/material";
import { display } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DescriptionCard from "../components/DescriptionCard";
import ImageModal from "../components/ImageModal";
import NotFound from "../components/NotFound";
import QuiltedImageList from "../components/QuiltedImageList";
import UserCardContent from "../components/UserCardContent";
import ApiClient from "../service/api-client.js";

function Product({ setErrors }) {
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [ski, setSki] = useState({});
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);

  async function fetchEntities() {
    try {
      const ski = await ApiClient.fetchSkiById(params.skiId);
      setSki(ski);
      const user = await ApiClient.fetchUserById(ski.userId);
      setUser(user);
      const fetchedReviews = await ApiClient.fetchReviews();
      setReviews(fetchedReviews);
    } catch (error) {
      setErrors([error]);
    }
  }

  useEffect(() => {
    fetchEntities();
  }, []);

  if (!ski || ski.length === 0) {
    return <NotFound />;
  }

  const handleModalOpen = (e) => {
    setModalImage(e.target.src);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  return (
    <React.Fragment>
      <Box
        pt={4}
        display="flex"
        justifyContent="center"
        sx={{ bgcolor: "background.default", pt: 15, pb: 40 }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            align: "center",
            bgcolor: "background.paper",
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
              {ski.manufacturer} {ski.model}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <QuiltedImageList
              images={ski.photos}
              openModal={handleModalOpen}
            ></QuiltedImageList>
          </Grid>
          <Grid item xs={12} md={5}>
            <DescriptionCard product={ski}></DescriptionCard>
            <Card
              sx={{
                bgcolor: "#a2a3a8",
                px: 1,
                mt: 3,
              }}
            >
              <UserCardContent user={user} reviews={reviews} />
            </Card>
          </Grid>
        </Grid>
        <ImageModal
          image={modalImage}
          alt={`${ski.manufacturer} ${ski.model}`}
          isOpen={modalOpen}
          handleClose={handleModalClose}
        />
      </Box>
    </React.Fragment>
  );
}

export default Product;
