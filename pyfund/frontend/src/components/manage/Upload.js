import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadPublic } from "../../actions/upload";

export class Upload extends Component {
  state = {
    fileUpload: null,
    filename: null,
    privacy: "public",
    note: "",
    seriesType: "",
    seriesName: "",
  };

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    uploadPublic: PropTypes.func.isRequired,
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onFileChange = (e) =>
    this.setState({
      fileUpload: e.target.files[0],
      filename: e.target.files[0].name,
    });

  onSubmit = (e) => {
    e.preventDefault(); // prevents form from reloading page

    const { privacy, fileUpload, seriesName, seriesType, note } = this.state;

    if (privacy === "public") {
      this.props.uploadPublic(fileUpload, seriesName, seriesType, note);
      this.setState({
        fileUpload: null,
        filename: null,
        privacy: "public",
        note: "",
        seriesType: "",
        seriesName: "",
      });
    }
  };

  render() {
    const { filename, note, seriesName } = this.state;

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Upload New Series</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-file form-file-lg mb-3">
              <input
                onChange={this.onFileChange}
                type="file"
                className="form-file-input"
              />
              <label className="form-file-label">
                <span className="form-file-text">
                  {filename ? filename : "Choose file..."}
                </span>
                <span className="form-file-button">Browse</span>
              </label>
            </div>
            <div className="mb-3">
              <span className="form-text mr-3">Privacy</span>
              <input
                className="mr-1"
                type="radio"
                id="public"
                name="privacy"
                value="public"
                defaultChecked="checked"
                onChange={this.onChange}
              />
              <label className="form-text mr-3" htmlFor="public">
                public
              </label>
              <input
                className="mr-1"
                type="radio"
                id="private"
                name="privacy"
                value="private"
                onChange={this.onChange}
              />
              <label className="form-text mr-3" htmlFor="private">
                private
              </label>
            </div>
            <div className="mb-3">
              <span className="form-text mr-3">Series Name</span>
              <input
                className="form-control"
                type="text"
                name="seriesName"
                value={seriesName}
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <span className="form-text mr-3">Series Type</span>
              <select
                className="form-select"
                defaultValue="default"
                name="seriesType"
                onChange={this.onChange}
              >
                <option value="default">Select Type...</option>
                <option value="return">Return</option>
                <option value="attribution">Attribution</option>
                <option value="exposure">Exposure</option>
                <option value="transaction">Transaction</option>
                <option value="holding">Holding</option>
              </select>
            </div>
            <div className="mb-3">
              <span className="form-text mr-3">Notes</span>
              <textarea
                className="form-control"
                type="text"
                name="note"
                value={note}
                onChange={this.onChange}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.upload.isLoading,
});

export default connect(mapStateToProps, { uploadPublic })(Upload);
