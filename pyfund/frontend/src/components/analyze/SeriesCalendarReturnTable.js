import React, { Component, Fragment } from "react";
import axios from "axios";
import { IconLoading } from "../common/Icon";
import { getPublic } from "../../actions/upload";
import { connect } from "react-redux";
import { IconEdit, IconBack } from "../common/Icon";
import DataTable from "react-data-table-component";

export class SeriesCalendarReturnTable extends Component {
  state = {
    tableData: null,
    seriesId: "",
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
      .get(`/api/analyze/series_calendar_return?id=${seriesId}`)
      .then((res) =>
        this.setState({
          tableData: res.data,
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

  toggleConfig = () =>
    this.setState({
      isConfig: !this.state.isConfig,
    });

  render() {
    const {
      seriesId,
      tableData,
      isConfig,
      isLoading,
      initialized,
    } = this.state;

    var chart = (
      <Fragment>
        <IconLoading />
      </Fragment>
    );

    const configPage = (
      <Fragment>
        <div className="d-flex justify-content-between mb-2">
          <div>Calendar Return</div>
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
            <button type="submit" className="btn btn-primary">
              {isLoading ? <IconLoading /> : "Update Chart"}
            </button>
          </div>
        </form>
      </Fragment>
    );

    if (tableData) {
      const data = JSON.parse(tableData[0].data);
      const percent = (value) => (value ? (value * 100).toFixed(1) : null);
      const columns = [
        {
          name: "Year",
          selector: "Year",
          sortable: true,
          cell: (row) => <strong>{row.Year}</strong>,
        },
        {
          name: "Jan",
          selector: "Jan",
          sortable: true,
          format: (row) => percent(row.Jan),
          right: true,
        },
        {
          name: "Feb",
          selector: "Feb",
          sortable: true,
          format: (row) => percent(row.Feb),
          right: true,
        },
        {
          name: "Mar",
          selector: "Mar",
          sortable: true,
          format: (row) => percent(row.Mar),
          right: true,
        },
        {
          name: "Apr",
          selector: "Apr",
          sortable: true,
          format: (row) => percent(row.Apr),
          right: true,
        },
        {
          name: "May",
          selector: "May",
          sortable: true,
          format: (row) => percent(row.May),
          right: true,
        },
        {
          name: "Jun",
          selector: "Jun",
          sortable: true,
          format: (row) => percent(row.Jun),
          right: true,
        },
        {
          name: "Jul",
          selector: "Jul",
          sortable: true,
          format: (row) => percent(row.Jul),
          right: true,
        },
        {
          name: "Aug",
          selector: "Aug",
          sortable: true,
          format: (row) => percent(row.Aug),
          right: true,
        },
        {
          name: "Sep",
          selector: "Sep",
          sortable: true,
          format: (row) => percent(row.Sep),
          right: true,
        },
        {
          name: "Oct",
          selector: "Oct",
          sortable: true,
          format: (row) => percent(row.Oct),
          right: true,
        },
        {
          name: "Nov",
          selector: "Nov",
          sortable: true,
          format: (row) => percent(row.Nov),
          right: true,
        },
        {
          name: "Dec",
          selector: "Dec",
          sortable: true,
          format: (row) => percent(row.Dec),
          right: true,
        },
        {
          name: "Total",
          selector: "Total",
          sortable: true,
          cell: (row) => <strong>{percent(row.Total)}</strong>,
          right: true,
        },
      ];

      const customStyles = {
        cells: {
          style: {
            minWidth: "40px !important",
            paddingLeft: "4px",
            paddingRight: "4px",
          },
        },
        headCells: {
          style: {
            minWidth: "40px !important",
            paddingLeft: "4px",
            paddingRight: "4px",
            fontWeight: "bold",
          },
        },
      };

      chart = (
        <div>
          <div className="d-flex justify-content-between mb-2">
            <div>Calendar Return</div>
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
            <DataTable
              data={data}
              columns={columns}
              customStyles={customStyles}
              highlightOnHover
              dense
            />
          </div>
        </div>
      );
    }

    return (
      <div className="col-md-8 col-sm-12">
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
  SeriesCalendarReturnTable
);
