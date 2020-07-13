import React, { Component, Fragment } from "react";
import axios from "axios";
import { IconLoading } from "../common/Icon";

export class AllSeriesPerfTable extends Component {
  state = {
    tableData: null,
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/analyze/series_summary")
      .then((res) => this.setState({ tableData: res.data }));
  }

  render() {
    const { tableData } = this.state;
    var tableBody = (
      <tbody>
        <tr>
          <td />
          <td />
          <td />
          <td>
            <IconLoading />
          </td>
          <td />
          <td />
        </tr>
      </tbody>
    );
    if (tableData) {
      tableBody = (
        <tbody>
          {tableData.map((series) => {
            const start = new Date(series.start);
            const end = new Date(series.end);
            return (
              <tr key={series.name}>
                <td>{series.name}</td>
                <td>{start.toLocaleDateString()}</td>
                <td>{end.toLocaleDateString()}</td>
                <td>{series.ann_ret}</td>
                <td>{series.ann_vol}</td>
                <td>{series.sharpe}</td>
              </tr>
            );
          })}
        </tbody>
      );
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Ann. Return</th>
            <th>Ann. Vol</th>
            <th>Sharpe</th>
            <th />
          </tr>
        </thead>
        {tableBody}
      </table>
    );
  }
}

export default AllSeriesPerfTable;
