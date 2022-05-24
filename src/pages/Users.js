import React, { useEffect, useState } from "react";
import UserAlbum from "../components/UsersAlbum";
import ApiClient from "../service/api-client";

function Users({ setErrors }) {
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

  useEffect(() => {
    updateUsersAndReviews();
  }, []);

  return (
    <UserAlbum
      users={users}
      reviews={reviews}
      onUpdate={updateUsersAndReviews}
      setErrors={setErrors}
    ></UserAlbum>
  );
}

export default Users;
