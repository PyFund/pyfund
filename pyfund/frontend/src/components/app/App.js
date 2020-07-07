import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import Container from "react-bootstrap/Container";

import "./App.scss";

import PrivateRoute from "../common/PrivateRoute";
import Header from "../layout/Header";

import { loadUser } from "../../actions/auth";
import Register from "../accounts/Register";
import Login from "../accounts/Login";

import Landing from "../layout/Landing";

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
            <Container>
              <Switch>
                <PrivateRoute exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Container>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
