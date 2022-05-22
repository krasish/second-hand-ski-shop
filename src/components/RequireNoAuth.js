import { useContext } from "react";
import UserContext from "./UserContext";

function RequireNoAuth({ children, userID, requireAdmin = false }) {
  const user = useContext(UserContext);

  if (user) {
    return <></>;
  }

  return children;
}

export default RequireNoAuth;
