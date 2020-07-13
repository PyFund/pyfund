import React, { Component, Fragment } from "react";
import axios from "axios";
import AllSeriesPerfTable from "../analyze/AllSeriesPerfTable";

export class Landing extends Component {
  render() {
    return <AllSeriesPerfTable />;
  }
}

export default Landing;
