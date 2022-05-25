import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function ReviewList({ reviews }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" alignSelf="center">
        {" "}
        Reviews{" "}
      </Typography>
      {reviews?.length ? (
        <List sx={{ width: "100%", py: 3 }}>
          {reviews?.map((r) => (
            <>
              <ListItem alignItems="x">
                <Rating
                  readOnly
                  size="medium"
                  precision={0.5}
                  value={r.rating}
                  sx={{ pr: 4 }}
                ></Rating>
                <ListItemText primary={r.review} />
              </ListItem>
              <Divider variant="fullWidth" component="li" sx={{ my: 3 }} />
            </>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            py: 10,
          }}
        >
          <Typography variant="h5"> No reviews for this user yet!</Typography>
        </Box>
      )}
    </Box>
  );
}

export default ReviewList;
