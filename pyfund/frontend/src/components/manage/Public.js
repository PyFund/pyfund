import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPublic, deletePublic } from "../../actions/upload";
import { IconInfo } from "../common/Icon";
import moment from "moment";

export class Public extends Component {
  static propTypes = {
    publicSeries: PropTypes.array.isRequired,
    getPublic: PropTypes.func.isRequired,
    deletePublic: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPublic();
  }

  render() {
    return (
      <div className="container">
        <h2>Public Series</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Series Name</th>
              <th>Series Type</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.publicSeries.map((series) => {
              return (
                <tr key={series.id}>
                  <td>{series.id}</td>
                  <td>
                    {series.seriesName}
                    <span
                      data-toggle="tooltip"
                      data-placement="top"
                      title={series.note}
                      className="ml-2"
                    >
                      <IconInfo />
                    </span>
                  </td>
                  <td>{series.seriesType}</td>
                  <td>{moment(series.created_at).fromNow()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={this.props.deletePublic.bind(this, series.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  publicSeries: state.upload.publicSeries,
});

export default connect(mapStateToProps, { getPublic, deletePublic })(Public);
