import React, { Component, Fragment } from "react";
import axios from "axios";
import { IconLoading } from "../common/Icon";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { hcPercentSeriesConfig } from "./hcUtil";
import { getPublic } from "../../actions/upload";
import { connect } from "react-redux";
import { IconEdit, IconBack } from "../common/Icon";

export class SeriesCumulativeReturnChart extends Component {
  state = {
    plotData: null,
    seriesId: "",
    bm: "",
    isConfig: true,
    isLoading: false,
    initialized: false,
  };

  componentDidMount() {
    this.props.getPublic();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { seriesId, bm } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(
        `/api/analyze/series_index_series?id=${seriesId}${
          bm == "" ? "" : "&bm=" + bm.join(",")
        }`
      )
      .then((res) =>
        this.setState({
          plotData: res.data,
          isConfig: false,
          isLoading: false,
          initialized: true,
        })
      );
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onChangeBm = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    this.setState({ bm: value });
  };

  toggleConfig = () =>
    this.setState({
      isConfig: !this.state.isConfig,
    });

  render() {
    const { seriesId, plotData, isConfig, isLoading, initialized } = this.state;

    var chart = (
      <Fragment>
        <IconLoading />
      </Fragment>
    );

    const configPage = (
      <Fragment>
        <div className="d-flex justify-content-between mb-2">
          <div>Cumulative Return</div>
          <div>
            <button
              onClick={this.toggleConfig}
              className="btn btn-primary float-right"
              disabled={!initialized}
            >
              <IconBack />
            </button>
          </div>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label>Series</label>
            <select
              className="form-select"
              value={seriesId}
              name="seriesId"
              onChange={this.onChange}
              required
            >
              <option>Select Series...</option>
              {this.props.publicSeries.map((series) => (
                <option value={series.id}>{series.seriesName}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Benchmark</label>
            <select
              className="form-select"
              name="bm"
              onChange={this.onChangeBm}
              multiple
            >
              {this.props.publicSeries.map((series) => (
                <option value={series.id} disabled={series.id == seriesId}>
                  {series.seriesName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              {isLoading ? <IconLoading /> : "Update Chart"}
            </button>
          </div>
        </form>
      </Fragment>
    );

    if (plotData) {
      const options = hcPercentSeriesConfig();
      // options.plotOptions.series.compare = "percent";
      plotData.map((item) =>
        options.series.push({
          name: item.name,
          data: JSON.parse(item.data),
        })
      );

      chart = (
        <div>
          <div className="d-flex justify-content-between mb-2">
            <div>Cumulative Return</div>
            <div>
              <button
                onClick={this.toggleConfig}
                className="btn btn-primary float-right"
              >
                <IconEdit />
              </button>
            </div>
          </div>
          <div className="container">
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={"stockChart"}
              options={options}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="col-md-6 col-sm-12">
        <div className="card card-body mt-4">
          {isConfig ? configPage : chart}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  publicSeries: state.upload.publicSeries,
});

export default connect(mapStateToProps, { getPublic })(
  SeriesCumulativeReturnChart
);
