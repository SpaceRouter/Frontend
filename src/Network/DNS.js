import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./DNS.css";

class DNS extends Component {
  render() {
    this.props.updateTitlePage("DNS");
    return (
      <Container fluid>
        <h3>DNS</h3>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(DNS);
