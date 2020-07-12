import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPublic } from "../../actions/upload";

export class Public extends Component {
  static propTypes = {
    public: PropTypes.array.isRequired,
    getPublic: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getPublic();
  }

  render() {
    return (
      <Fragment>
        <h2>Available Series</h2>
        <table className="table table-striped">
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
            {this.props.public.map((series) => {
              const date = new Date(series.created_at);
              return (
                <tr key={series.id}>
                  <td>{series.id}</td>
                  <td>{series.seriesName}</td>
                  <td>{series.seriesType}</td>
                  <td>{date.toLocaleString()}</td>
                  <td>
                    <button className="btn btn-danger btn-sm"> Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  public: state.upload.public,
});

export default connect(mapStateToProps, { getPublic })(Public);
