import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("user_token");
  const userData = JSON.parse(sessionStorage.getItem("pi_user_data"));
  const location = useLocation();
  console.log(location, "location");

  // if (token) {
  //   return <Navigate to="/home" replace />;
  // }

  if (
    userData?.uid &&
    userData?.userTxn?.isPin &&
    userData?.userTxn?.isQuestion
  ) {
    return <Navigate to="/home" replace />;
  }

  // if (
  //   userData?.uid &&
  //   !userData?.userTxn?.isPin &&
  //   !userData?.userTxn?.isQuestion
  // ) {
  //   return <Navigate to="/set-txn-pin" replace />;
  // }

  // if (
  //   userData?.uid &&
  //   userData?.userTxn?.isPin &&
  //   !userData?.userTxn?.isQuestion
  // ) {
  //   return <Navigate to="/set-recovery-pin-question" replace />;
  // }

  return children;
};

export default PublicRoute;
