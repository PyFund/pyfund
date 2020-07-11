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
import User from "../layout/User";
import Upload from "../upload/Upload";

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
                <PrivateRoute exact path="/user" component={User} />
                <PrivateRoute exact path="/upload" component={Upload} />
              </Switch>
            </div>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
