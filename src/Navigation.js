import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { FaPowerOff, FaUserAlt, FaCog, FaNetworkWired, FaTools, FaHome } from "react-icons/fa";

import { updateSideBarState, updateAuth } from "./redux/action";
import { removeCookie, getCookie } from "./Cookies";
import { domainName } from "./Constants";
import "./Navigation.css";

class Navigation extends Component {
  state = {
    username: "ESIEESPACE",
  };

  titleNav(title, Icon) {
    return (
      <>
        <Icon style={{ marginRight: 10 }} size="30px" color="white" />
        {title}
      </>
    );
  }

  handleClick = () => {
    this.props.updateSideBarState(!this.props.isOpenSideBar);
  };

  logout = () => {
    removeCookie("jwt_token");
    this.props.updateAuth(0);
  };

  getUsername = async () => {
    const token = getCookie("jwt_token");
    const response = await fetch(`${domainName}/auth/v1/info`, {
      method: "GET",
      headers: { "content-type": "application/json", authorization: token },
    });
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      this.setState({ username: json.UserInfo.login });
    }
  };

  componentDidMount() {
    this.getUsername();
  }

  render() {
    return (
      <Navbar className="topbar" fixed="top" expand="true" variant="dark">
        <Row>
          <Navbar.Toggle className="topbar-icon" onClick={this.handleClick} />
          {this.props.isOpenSideBar && (
            <Navbar.Brand className="d-none d-sm-block brand" href="/">
              OpenGate
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
            <FaUserAlt className="user-icon" size="80px" color="white" />
            <p className="username">{this.state.username}</p>

            <Nav.Link href="/">{this.titleNav("Page d'accueil", FaHome)}</Nav.Link>

            <NavDropdown title={this.titleNav("Administration", FaCog)}>
              <NavDropdown.Item href="/users">Utilisateurs</NavDropdown.Item>
              <NavDropdown.Item href="/groups">Groupes</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={this.titleNav("Réseau", FaNetworkWired)}>
              <NavDropdown.Item href="/dhcp">DHCP</NavDropdown.Item>
              <NavDropdown.Item href="/dns">DNS</NavDropdown.Item>
              <NavDropdown.Item href="/firewall">Firewall</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={this.titleNav("Services", FaTools)}>
              <NavDropdown.Item href="/marketplace">Magasin d'applications</NavDropdown.Item>
              <NavDropdown.Item href="/appsinstalled">Applications installées</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="footer">
            &#169; OpenGate &#183; v.1.1 &#183; ESIEESPACE
          </div>
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
