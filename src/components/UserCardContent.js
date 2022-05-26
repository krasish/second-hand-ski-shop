import { Box, CardContent, Typography } from "@mui/material";
import React from "react";
import ConditionalRating, { MISSING_REVIEW_VALUE } from "./ConditionalRating";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";

function calculateAverage(reviews, forUserId) {
  var total = 0;
  var count = 0;

  reviews?.forEach(function (item, index) {
    if (item.forUserId === forUserId) {
      total += Number.parseFloat(item.rating);
      count++;
    }
  });
  return total === 0 ? MISSING_REVIEW_VALUE : total / count;
}

function UserCardContent({ user, reviews }) {
  return (
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h2">
        {user.firstName} {user.lastName}
      </Typography>
      <ConditionalRating rating={calculateAverage(reviews, user.id)} />
      <Box mt={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        <AccountCircleIcon />
        <Typography color="greenyellow" sx={{ ml: 2 }}>
          {user.username}
        </Typography>
      </Box>
      {user.phone && (
        <Box mt={2} sx={{ display: "flex", flexWrap: "wrap" }}>
          <PhoneIcon />
          <Typography color="greenyellow" sx={{ ml: 2 }}>
            {user.phone}
          </Typography>
        </Box>
      )}

      <Box mt={2} sx={{ display: "flex", flexWrap: "wrap" }}>
        <AlternateEmailIcon />
        <Typography color="greenyellow" sx={{ ml: 2 }}>
          {user.email}
        </Typography>
      </Box>
    </CardContent>
  );
}

export default UserCardContent;
