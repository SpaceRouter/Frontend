import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "./MarketplaceDetails.css";

class MarketplaceDetails extends Component {
  goBack = () => {
    this.props.history.push("/marketplace");
  };

  componentDidMount() {
    this.props.updateTitlePage(this.props.location.state.appli.nom);
  }

  render() {
    const { appli } = this.props.location.state;
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <div className="appli-details">
            <FaArrowLeft className="back-icon" size="30px" color="black" onClick={this.goBack} />
            <Row style={{ margin: "0 auto" }}>
              <Card.Img className="img-details" src={appli.logo} />
              <Col style={{ margin: "auto" }}>
                <h2 style={{ marginBottom: 20 }}>{appli.nom}</h2>
                <p className="text-appli">{appli.auteur}</p>
              </Col>
            </Row>
            <Row style={{ margin: "0 auto" }}> 
              <p className="text-appli" style={{marginRight: 50}}>Création : {appli.dateCreation}</p>
              <p className="text-appli">Dernière mise à jour : {appli.dateUpdate}</p>
            </Row>
            <p className="description-appli">{appli.description}</p>
          </div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(MarketplaceDetails);
