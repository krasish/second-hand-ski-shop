import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ImageModal from "../components/ImageModal";
import NotFound from "../components/NotFound";
import QuiltedImageList from "../components/QuiltedImageList";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

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
      <Box>
        <QuiltedImageList
          images={current.photos}
          openModal={handleModalOpen}
        ></QuiltedImageList>
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
