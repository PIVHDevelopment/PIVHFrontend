import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  //   DataService.defaults.headers.common.auth = userData?.uid;

  return userData?.uid ? <>{children}</> : <Navigate to="/" replace={true} />;
};

export default PrivateRoutes;
