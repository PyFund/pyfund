import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import { Provider } from "react-redux";
import store from "../../store";

import "./App.scss";

import { loadUser } from "../../actions/auth";
import Register from "../accounts/Register";
import Login from "../accounts/Login";

import Header from "../layout/Header";
import Landing from "../layout/Landing";
import Profile from "../layout/Profile";
import Manage from "../layout/Manage";
import Report from "../layout/Report";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Router>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/manage" component={Manage} />
                <PrivateRoute exact path="/reports" component={Report} />
              </Switch>
            </div>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
