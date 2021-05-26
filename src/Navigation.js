import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { FaPowerOff } from "react-icons/fa";

import { updateSideBarState } from "./redux/action.js";
import "./Navigation.css";

class Navigation extends Component {
  handleClick = () => {
    this.props.updateSideBarState(!this.props.isOpenSideBar);
  };

  render() {
    return (
      <Navbar className="topbar" fixed="top" expand="true" variant="dark">
        <Row>
          <Navbar.Toggle className="topbar-icon" onClick={this.handleClick} />
          {this.props.isOpenSideBar && (
            <Navbar.Brand className="d-none d-sm-block brand" href="/">
              SpaceRouter
            </Navbar.Brand>
          )}
        </Row>
        <Row>
          <Navbar.Brand className={this.props.isOpenSideBar ? "title" : ""}>{this.props.titlePage}</Navbar.Brand>
        </Row>
        <Row>
          <FaPowerOff className="topbar-icon" size="30px" color="white" />
        </Row>
        <Navbar.Collapse>
          <Nav.Link className="nav-link" href="/">
            Page d'accueil
          </Nav.Link>
          <NavDropdown title="Administration">
            <NavDropdown.Item href="/users">
              Utilisateurs
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Services">
            <NavDropdown.Item href="/marketplace">
              Magasin d'application
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpenSideBar: state.isOpenSideBar,
  titlePage: state.titlePage,
});

export default connect(mapStateToProps, {
  updateSideBarState: updateSideBarState,
})(Navigation);
