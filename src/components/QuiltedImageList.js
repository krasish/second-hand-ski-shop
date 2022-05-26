import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const NOT_FOUND_IMAGE =
  "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function QuiltedImageList({ images, openModal, size = 500, cols = 2 }) {
  return (
    <ImageList
      sx={{
        width: size,
        height: size,
        boxShadow: 3,
        bgcolor: "info.light",
        p: 1,
      }}
      variant="quilted"
      cols={cols}
    >
      {images.length ? (
        images.map((img) => (
          <ImageListItem key={img} cols={cols / 2} onClick={openModal}>
            <img
              {...srcset(img, size, img.rows, img.cols)}
              alt={img.title}
              loading="lazy"
            />
          </ImageListItem>
        ))
      ) : (
        <ImageListItem cols={cols}>
          <img
            {...srcset(NOT_FOUND_IMAGE, size, 1, cols)}
            alt="not found"
            loading="lazy"
          />
        </ImageListItem>
      )}
    </ImageList>
  );
}

export default QuiltedImageList;
