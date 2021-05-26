import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./Groups.css";

class Groups extends Component {
  render() {
    this.props.updateTitlePage("Groupes");
    return (
      <Container fluid>
        <h3>Groupes</h3>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Groups);
