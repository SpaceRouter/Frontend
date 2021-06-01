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
    this.props.updateTitlePage(this.props.location.state.appli.Name);
  }

  getDate = (givenDate) => {
    const date = new Date(givenDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return day + "-" + month + "-" + year;
  };

  render() {
    const { appli } = this.props.location.state;
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <div className="appli-details">
            <FaArrowLeft className="back-icon" size="30px" color="black" onClick={this.goBack} />
            <Row style={{ margin: "0 auto" }}>
              <Card.Img className="img-details" src={appli.Icon} />
              <Col style={{ margin: "auto" }}>
                <h2 style={{ marginBottom: 20 }}>{appli.Name}</h2>
                <p className="text-appli">{appli.Developer.Name}</p>
              </Col>
            </Row>
            <Row style={{ margin: "0 auto" }}>
              <p className="text-appli" style={{ marginRight: 50 }}>
                Création : {this.getDate(appli.Developer.CreatedAt)}
              </p>
              <p className="text-appli">Dernière mise à jour : {this.getDate(appli.Developer.UpdatedAt)}</p>
            </Row>
            <p className="description-appli">{appli.Description}</p>
          </div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(MarketplaceDetails);
