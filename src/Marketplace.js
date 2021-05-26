import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "./redux/action.js";
import "./Marketplace.css";

class Marketplace extends Component {
  render() {
    this.props.updateTitlePage("Magasin d'application");
    return (
      <Container fluid>
        Marketplace
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Marketplace);