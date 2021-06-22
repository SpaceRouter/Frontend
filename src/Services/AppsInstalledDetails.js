import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action";

class AppsInstalledDetails extends Component {
  componentDidMount() {
    this.props.updateTitlePage("Détails de l'application installée");
  }

  render() {
    return (
      <Container fluid>
        <h3>Détails de l'application installée</h3>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(AppsInstalledDetails);
