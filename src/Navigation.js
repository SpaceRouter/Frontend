import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { FaPowerOff } from "react-icons/fa";

import { updateSideBarState, updateAuth } from "./redux/action.js";
import "./Navigation.css";

class Navigation extends Component {
  handleClick = () => {
    this.props.updateSideBarState(!this.props.isOpenSideBar);
  };

  logout = () => {
    const cookies = new Cookies();
    cookies.remove("jwt_token");
    this.props.updateAuth(0);
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
          <Navbar.Brand className="title">{this.props.titlePage}</Navbar.Brand>
        </Row>
        <Row>
          <FaPowerOff className="topbar-icon" size="30px" color="white" onClick={this.logout} />
        </Row>
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">Page d'accueil</Nav.Link>

            <NavDropdown title="Administration">
              <NavDropdown.Item href="/users">Utilisateurs</NavDropdown.Item>
              <NavDropdown.Item href="/groups">Groupes</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Réseau">
              <NavDropdown.Item href="/dhcp">DHCP</NavDropdown.Item>
              <NavDropdown.Item href="/dns">DNS</NavDropdown.Item>
              <NavDropdown.Item href="/firewall">Firewall</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Services">
              <NavDropdown.Item href="/marketplace">Magasin d'applications</NavDropdown.Item>
              <NavDropdown.Item href="/appsinstalled">Applications installées</NavDropdown.Item>
            </NavDropdown>
          </Nav>
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
  updateSideBarState,
  updateAuth,
})(Navigation);
