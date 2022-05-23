import { useContext } from "react";
import { ROLE_ADMIN, ROLES } from "../model/user";
import UserContext from "./UserContext";

function RequireAuth({ children, userID, requireAdmin = false }) {
  const user = useContext(UserContext);

  if (!user) {
    return <></>;
  }
  const userIsAdmin = user.role === ROLES[ROLE_ADMIN];

  if (!userIsAdmin && userID && user.id !== userID) {
    return <></>;
  }

  if (requireAdmin && !userIsAdmin) {
    return <></>;
  }

  return children;
}

export default RequireAuth;
