import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./Marketplace.css";

class Marketplace extends Component {
  render() {
    this.props.updateTitlePage("Magasin d'applications");
    return (
      <Container fluid>
        <h3>Marketplace</h3>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Marketplace);
