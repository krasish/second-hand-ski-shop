import { React, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ButtonGroup, Rating } from "@mui/material";
import RequireAuth from "./RequireAuth";
import ApiClient from "../service/api-client";
import UserContext from "./UserContext";
import ConditionalRating, { MISSING_REVIEW_VALUE } from "./ConditionalRating";

function calculateAverage(reviews, forUserId) {
  var total = 0;
  var count = 0;

  reviews?.forEach(function (item, index) {
    if (item.forUserId === forUserId) {
      total += item.rating;
      count++;
    }
  });

  return total === 0 ? MISSING_REVIEW_VALUE : total / count;
}

export default function UserAlbum({ users, reviews, onUpdate, setErrors }) {
  const loggedUser = useContext(UserContext);

  const handleDelete = async (user) => {
    try {
      const ski = await ApiClient.fetchSkis();
      const boots = await ApiClient.fetchBoots();
      const latestReviews = await ApiClient.fetchReviews();

      ski?.forEach((el) => {
        el.userId === user.id && ApiClient.deleteSki(el.id);
      });
      boots?.forEach((el) => {
        el.userId === user.id && ApiClient.deleteBoot(el.id);
      });
      latestReviews?.forEach((el) => {
        (el.forUserId === user.id || el.fromUserId === user.id) &&
          ApiClient.deleteReview(el.id);
      });
      await ApiClient.deleteUser(user.id);
      onUpdate();
      //TODO: Update ski and ski boots
    } catch (err) {
      setErrors([err]);
    }
  };

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      ></Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    pt: "5%",
                  }}
                  height="380"
                  image={user.imageUrl}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user.firstName} {user.lastName}
                  </Typography>

                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="h3"
                    color="primary.dark"
                  >
                    Username: {user.username}
                  </Typography>
                  <ConditionalRating
                    rating={calculateAverage(reviews, user.id)}
                  />
                </CardContent>
                <CardActions>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    <RequireAuth requireAdmin={true}>
                      {loggedUser && loggedUser.id !== user.id && (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </Button>
                      )}
                    </RequireAuth>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
