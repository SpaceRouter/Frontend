import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./AppsInstalled.css";

class AppsInstalled extends Component {
  componentDidMount() {
    this.props.updateTitlePage("Applications installées");
  }

  render() {
    return (
      <Container fluid>
        <h3>Applications installées</h3>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(AppsInstalled);
