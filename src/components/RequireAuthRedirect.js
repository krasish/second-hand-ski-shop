import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

function RequireAuthRedirect({ to, children }) {
  const user = useContext(UserContext);
  let location = useLocation();

  if (!user) {
    return <Navigate to={to} state={{ from: location }} />;
  }

  return children;
}

export default RequireAuthRedirect;
