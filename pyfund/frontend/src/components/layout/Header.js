import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

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
      <Nav>
        <NavDropdown
          title={
            <>
              <span>
                <img
                  className="thumbnail-image mr-2"
                  src="https://www.pinclipart.com/picdir/big/157-1578186_isolation-gown-clipart.png"
                  alt="user pic"
                  height="25"
                />
              </span>
              <span>
                <strong>{user ? `${user.username}` : ""}</strong>
              </span>
            </>
          }
          id="nav-dropdown"
        >
          <NavDropdown.Item onClick={this.props.logout} eventKey="1.1">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );

    // show when not logged in
    const guestLinks = (
      <Nav>
        <Nav.Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </Nav.Link>
      </Nav>
    );

    return (
      <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Container>
          <Navbar.Brand href="#">PyFund</Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Reports</Nav.Link>
            </Nav>
            {isAuthenticated ? authLinks : guestLinks}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
