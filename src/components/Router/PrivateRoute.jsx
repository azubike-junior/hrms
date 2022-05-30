import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("success") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/hrms" />
        )
      }
    />
);
};

export default PrivateRoute;
