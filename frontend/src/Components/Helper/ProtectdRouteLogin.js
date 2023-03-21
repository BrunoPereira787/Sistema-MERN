import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const ProtectdRouteLogin = ({ children }) => {
  const { login } = React.useContext(UserContext);

  return login ? <Navigate to="/" /> : children;
};

export default ProtectdRouteLogin;
