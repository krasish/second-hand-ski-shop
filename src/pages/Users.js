import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import UserAlbum from "../components/UsersAlbum";
import ApiClient from "../service/api-client";

function Users({ setErrors, updateProducts }) {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  const updateUsersAndReviews = async () => {
    try {
      const newUsers = await ApiClient.fetchUsers();
      setUsers(newUsers);
      const newReviews = await ApiClient.fetchReviews();
      setReviews(newReviews);
    } catch (error) {
      setErrors([error]);
    }
  };

  const onUpdateUsersAlbum = async () => {
    updateUsersAndReviews();
    updateProducts();
  };

  useEffect(() => {
    updateUsersAndReviews();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pb: 20,
        pt: 12,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "background.paper",
          boxShadow: 5,
          pb: 5,
        }}
      >
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Users
        </Typography>
        <UserAlbum
          users={users}
          reviews={reviews}
          onUpdate={onUpdateUsersAlbum}
          setErrors={setErrors}
        ></UserAlbum>
      </Container>
    </Box>
  );
}

export default Users;
