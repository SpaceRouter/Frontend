import React, { Component } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { MdAddCircle, MdFileDownload } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import "../global.css";
import "./MarketplaceDetails.css";

class MarketplaceDetails extends Component {
  state = {
    appli: { Services: [] },
  };

  handleImagesUpdate = (Image) => {
    this.setState({ Image: Image.target.value });
  };

  handleImageVersionUpdate = (ImageVersion) => {
    this.setState({ ImageVersion: ImageVersion.target.value });
  };

  handleVolumeMountPointUpdate = (Volume) => {
    this.setState({ Volume: Volume.target.value });
  };

  handleEnvValueUpdate = (EnvValue) => {
    this.setState({ EnvValue: EnvValue.target.value });
  };

  handleEnvNameUpdate = (EnvName) => {
    this.setState({ EnvName: EnvName.target.value });
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
      <div key={service.ID} className="services-details">
        <p>Image : <Form.Control className="modif" type="text" value={service.Image} onChange={this.handleImagesUpdate}/></p>
        <p>Version :  <Form.Control className="modif" type="text" value={service.ImageVersion} onChange={this.handleImageVersionUpdate}/></p>
        <p>Variable(s) d'environnement(s) : </p>
        {service.Envs.map((env) => (
          <p key={env.ID} style={{ marginLeft: "25px"}}>
            <TiDeleteOutline size="20px" className="suppr"/>
            <Form.Control className="modif" type="text" value={env.Name} onChange={this.handleEnvNameUpdate}/> :  
            <Form.Control className="modif" type="text" value={env.DefaultValue} onChange={this.handleEnvValueUpdate}/>
          </p>
        ))}
        <Button className="button" style={{ marginLeft:"40%", marginBottom:"10px", backgroundColor: "#0B3862" }}><MdAddCircle size="20px" className="add" />Ajouter</Button>
        <p>Volume(s) : </p>
        {service.Volumes.map((volume) => (
          <div key={volume.ID} style={{ marginLeft: "25px"}}>
            <p>Nom: {volume.Name}</p>
            <p>Point de montage : <Form.Control className="modif" type="text" value={volume.MountPoint} onChange={this.handleVolumeMountPointUpdate}/></p>
          </div>
        ))}
        <p>Réseau(x) : </p>
        {service.Networks.map((network) => (
          <p key={network.ID} style={{ marginLeft: "25px"}}>{network.Name}</p>
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
            <Row>
              <Card.Img className="img-details" src={appli.Icon} />
              <Col className="info-appli">
                <h2>{appli.Name}</h2>
                <p style={{ fontSize: "20px", fontWeight: "lighter" }}>{this.props.location.state.appli.Developer.Name}</p>
              </Col>
            </Row>
            <div className="text-appli">
              <p> Création : {this.getDate(appli.CreatedAt)}</p>
              <p>Dernière mise à jour : {this.getDate(appli.UpdatedAt)}</p>
            </div>
            <p className="description-appli">{appli.Description}</p>
            <h4 style={{ marginBottom:"50px", marginLeft:"25px" }}>Services :</h4>  
            <div className="services-appli">
                {this.getServicesInfos()}
            </div>
            <Button className="download">
              <MdFileDownload size="20px" />
              Télécharger
            </Button>
          </div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(MarketplaceDetails);
