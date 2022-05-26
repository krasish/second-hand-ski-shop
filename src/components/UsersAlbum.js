import { React, useContext, useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { ButtonGroup, IconButton, Modal } from "@mui/material";
import RequireAuth from "./RequireAuth";
import ApiClient from "../service/api-client";
import UserContext from "./UserContext";
import ReviewForm from "./ReviewForm";
import ConditionalRating, { MISSING_REVIEW_VALUE } from "./ConditionalRating";
import { styled } from "@mui/system";
import clsx from "clsx";
import ReviewList from "./ReviewList";
import UserCardContent from "./UserCardContent";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vh",
  height: "fit-content",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  py: 1,
};

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

export default function UserAlbum({ users, reviews, onUpdate, setErrors }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const loggedUser = useContext(UserContext);

  const BackdropUnstyled = forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ "MuiBackdrop-open": open }, className)}
        ref={ref}
        {...other}
      />
    );
  });

  const Backdrop = styled(BackdropUnstyled)`
    z-index: -1;
    position: fixed;
    background-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  `;

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
      await onUpdate();
    } catch (err) {
      setErrors([err]);
    }
  };

  const openAddReviewModal = (user) => {
    window.scrollTo(0, 0);
    setModalOpen(true);
    setModalContent(
      <ReviewForm setErrors={setErrors} forUser={user.id} onUpdate={onUpdate} />
    );
  };

  const openViewReviewsModal = (user) => {
    setModalOpen(true);
    setModalContent(
      <ReviewList reviews={reviews?.filter((r) => r.forUserId === user.id)} />
    );
  };

  return (
    <Box>
      <Modal
        open={modalOpen}
        sx={modalStyle}
        onClose={() => setModalOpen(false)}
        aria-labelledby="recipe-action-modal"
        BackdropComponent={Backdrop}
      >
        <>
          <IconButton
            sx={{ display: "block", ml: "92%" }}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <ClearSharpIcon />
          </IconButton>
          {modalContent}
        </>
      </Modal>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid
          container
          spacing={3}
          sx={{ padding: 5, bgcolor: "background.paper" }}
        >
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "#a2a3a8",
                  px: 1,
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
                <UserCardContent user={user} reviews={reviews} />
                <CardActions>
                  <ButtonGroup
                    variant="contained"
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
                    <RequireAuth>
                      {loggedUser && loggedUser.id !== user.id && (
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => openAddReviewModal(user)}
                        >
                          Add review
                        </Button>
                      )}
                    </RequireAuth>
                    <Button
                      size="small"
                      onClick={() => openViewReviewsModal(user)}
                      sx={{ color: "white", bgcolor: "#5d4287" }}
                    >
                      View reviews
                    </Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
