import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./Firewall.css";

class Firewall extends Component {
  render() {
    this.props.updateTitlePage("Firewall");
    return (
      <Container fluid>
        <h3>Firewall</h3>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Firewall);
