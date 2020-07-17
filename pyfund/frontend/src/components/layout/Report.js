import React, { Component, Fragment } from "react";
import SeriesRollVolChart from "../analyze/SeriesRollVolChart";
import SeriesCumulativeReturnChart from "../analyze/SeriesCumulativeReturnChart";
import SeriesCalendarReturnTable from "../analyze/SeriesCalendarReturnTable";

export class Report extends Component {
  render() {
    return (
      <Fragment>
        <nav>
          <div className="nav nav-pills mb-5" role="tablist">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#nav-reports"
              role="tab"
            >
              Available Reports
            </a>
            <a
              className="nav-link"
              data-toggle="tab"
              href="#nav-new"
              role="tab"
            >
              Add New Report
            </a>
          </div>
        </nav>
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="nav-reports"
            role="tabpanel"
          >
            <SeriesRollVolChart />
            <SeriesCumulativeReturnChart />
            <SeriesCalendarReturnTable />
          </div>
          <div className="tab-pane fade" id="nav-new" role="tabpanel">
            new
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Report;
