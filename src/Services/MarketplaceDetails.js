import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./MarketplaceDetails.css";

class MarketplaceDetails extends Component {
  goBack = () => {
    this.props.history.push("/marketplace");
  }

  componentDidMount() {
    this.props.updateTitlePage(this.props.location.state.appli.nom);
  }

  render() {
    return (
      <Container fluid>
        <FaArrowLeft className="back-icon" size="30px" color=" #0b3862" onClick={this.goBack} />
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(MarketplaceDetails);
