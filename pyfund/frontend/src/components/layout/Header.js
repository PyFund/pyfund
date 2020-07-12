import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    // show when logged in
    const authLinks = (
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? user.username : ""}</strong>
        </span>
        <li className="nav-item">
          <Link to="/manage" className="nav-link">
            Manage Series
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/user" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <span onClick={this.props.logout} className="nav-link">
            Logout
          </span>
        </li>
      </ul>
    );

    // show when not logged in
    const guestLinks = (
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            PyFund
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navToggle"
            aria-controls="navToggle"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navToggle">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
