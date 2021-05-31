import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./DHCP.css";

class DHCP extends Component {
  componentDidMount() {
    this.props.updateTitlePage("DHCP");
  }

  render() {
    return (
      <Container fluid>
        <h3>DHCP</h3>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(DHCP);
