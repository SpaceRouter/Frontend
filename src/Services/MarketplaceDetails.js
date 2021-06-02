import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "../global.css";
import "./MarketplaceDetails.css";

class MarketplaceDetails extends Component {
  state = {
    appli: { Services: [] },
  };

  goBack = () => {
    this.props.history.push("/marketplace");
  };

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

  getServicesInfos() {
    const { appli } = this.state;
    return appli.Services.map((service) => (
      <div key={service.ID}>
        <p>Image : {service.Image}</p>
        <p>Version : {service.ImageVersion}</p>
        <p>Variable(s) d'environnement(s) : </p>
        {service.Envs.map((env) => (
          <p key={env.ID}>
            {env.Name} : {env.DefaultValue}
          </p>
        ))}
        <p>Volume(s) : </p>
        {service.Volumes.map((volume) => (
          <div key={volume.ID}>
            <p>Nom: {volume.Name}</p>
            <p>Point de montage : {volume.MountPoint}</p>
          </div>
        ))}
        <p>Réseau(x) : </p>
        {service.Networks.map((network) => (
          <p key={network.ID}>{network.Name}</p>
        ))}
      </div>
    ));
  }

  getAppliInfo = async () => {
    const { appli } = this.props.location.state;
    const response = await fetch(`https://sr-marketplace.esieespace.fr/v1/stack/${appli.ID}`);
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      this.setState({ appli: json.Stack });
    }
  };

  componentDidMount() {
    this.props.updateTitlePage(this.props.location.state.appli.Name);
    this.getAppliInfo();
  }

  render() {
    const { appli } = this.state;
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <div className="appli-details">
            <FaArrowLeft className="back-icon" size="30px" color="black" onClick={this.goBack} />
            <Row style={{ margin: "0 auto" }}>
              <Card.Img className="img-details" src={appli.Icon} />
              <Col style={{ margin: "auto" }}>
                <h2 style={{ marginBottom: 20 }}>{appli.Name}</h2>
                <p className="text-appli">{this.props.location.state.appli.Developer.Name}</p>
              </Col>
            </Row>
            <Row style={{ margin: "0 auto" }}>
              <p className="text-appli" style={{ marginRight: 50 }}>
                Création : {this.getDate(appli.CreatedAt)}
              </p>
              <p className="text-appli">Dernière mise à jour : {this.getDate(appli.UpdatedAt)}</p>
            </Row>
            <p className="description-appli">{appli.Description}</p>
            <h3>Services :</h3>
            {this.getServicesInfos()}
          </div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(MarketplaceDetails);
