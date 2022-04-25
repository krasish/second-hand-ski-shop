import { Box, Button, IconButton, Modal } from "@mui/material";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.default",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function ImageModal({ image, alt, isOpen, handleClose }) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton sx={{ display: "block", ml: "92%" }} onClick={handleClose}>
          <ClearSharpIcon />
        </IconButton>
        <img src={image} alt={alt} width={500} height={750} />
      </Box>
    </Modal>
  );
}

export default ImageModal;
