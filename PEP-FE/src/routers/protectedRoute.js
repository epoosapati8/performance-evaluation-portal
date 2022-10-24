import React from "react";
import { Route } from "react-router-dom";
import jwt from "jwt-decode";
import ForbiddenPage from "../components/403-page/403Page";

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  let role = "UnAuth";
  const isAuthenticated = localStorage.getItem("accessToken");
  if (isAuthenticated) {
    role = jwt(isAuthenticated).role;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && allowedRoles.includes(role) ? (
          <Component {...props} />
        ) : (
          <ForbiddenPage />
        )
      }
    />
  );
};

export default ProtectedRoute;
