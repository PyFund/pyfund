import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setPathname } from "../../actions/pathname";

const PrivateRoute = ({ component: Component, auth, setPathname, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return (
          <div class="spinner-border" role="status">
            Loading
          </div>
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
