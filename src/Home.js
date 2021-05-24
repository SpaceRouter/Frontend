import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "./redux/action.js";
import "./Home.css";

class Home extends Component {
  render() {
    this.props.updateTitlePage("Home");
    return (
      <Container fluid>
        <h2>Home</h2>
      </Container>
    );
  }
}

export default connect("", {
  updateTitlePage: updateTitlePage,
})(Home);
