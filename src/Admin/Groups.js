import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./Groups.css";

class Groups extends Component {
  componentDidMount() {
    this.props.updateTitlePage("Groupes");
  }

  render() {
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
