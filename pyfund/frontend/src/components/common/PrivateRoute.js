import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setPathname } from "../../actions/pathname";
import { IconLoading } from "./Icon";

const PrivateRoute = ({ component: Component, auth, setPathname, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return (
          <Fragment>
            <IconLoading />
            Loading
          </Fragment>
        );
      } else if (!auth.isAuthenticated) {
        setPathname(props.location.pathname);
        return <Redirect to={{ pathname: "/login" }} />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setPathname })(PrivateRoute);
