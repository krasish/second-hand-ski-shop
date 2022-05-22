import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "./Auth";

function RequireAuthRedirect({ children }) {
  const user = useContext(UserContext);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuthRedirect;
