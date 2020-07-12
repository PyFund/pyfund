import React, { Component, Fragment } from "react";
import Upload from "./Upload";
import Public from "./Public";

export class Manage extends Component {
  render() {
    return (
      <Fragment>
        <nav>
          <div className="nav nav-pills" role="tablist">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#nav-public"
              role="tab"
            >
              Public Series
            </a>
            <a
              className="nav-link"
              data-toggle="tab"
              href="#nav-new"
              role="tab"
            >
              Add New Series
            </a>
          </div>
        </nav>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="nav-public"
            role="tabpanel"
          >
            <Public />
          </div>
          <div className="tab-pane fade" id="nav-new" role="tabpanel">
            <Upload />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Manage;
