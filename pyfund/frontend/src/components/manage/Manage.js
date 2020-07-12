import React, { Component, Fragment } from "react";
import Upload from "./Upload";
import Public from "./Public";

export class Manage extends Component {
  render() {
    return (
      <Fragment>
        <nav>
          <div class="nav nav-pills" role="tablist">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#nav-public"
              role="tab"
            >
              Public Series
            </a>
            <a class="nav-link" data-toggle="tab" href="#nav-new" role="tab">
              Add New Series
            </a>
          </div>
        </nav>
        <div class="tab-content">
          <div
            class="tab-pane fade show active"
            id="nav-public"
            role="tabpanel"
          >
            <Public />
          </div>
          <div class="tab-pane fade" id="nav-new" role="tabpanel">
            <Upload />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Manage;
