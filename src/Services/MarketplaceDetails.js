import React, { Component } from "react";
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { MdAddCircle, MdFileDownload } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action";
import "../global.css";
import "./MarketplaceDetails.css";

class MarketplaceDetails extends Component {
  state = {
    appli: { Services: [] },
    downloadAppli: {},
    install: "",
  };

  handleNameUpdate = (index0) => (name) => {
    let appli = this.state.appli;
    appli.Services[index0].Name = name.target.value;
    this.setState({ appli });
  };

  handleImageUpdate = (index0) => (image) => {
    let appli = this.state.appli;
    appli.Services[index0].Image = image.target.value;
    this.setState({ appli });
  };

  handleImageVersionUpdate = (index0) => (imageVersion) => {
    let appli = this.state.appli;
    appli.Services[index0].ImageVersion = imageVersion.target.value;
    this.setState({ appli });
  };

  handleEnvNameUpdate = (index0, index1) => (envName) => {
    let appli = this.state.appli;
    appli.Services[index0].Envs[index1].Name = envName.target.value;
    this.setState({ appli });
  };

  handleEnvValueUpdate = (index0, index1) => (envValue) => {
    let appli = this.state.appli;
    appli.Services[index0].Envs[index1].DefaultValue = envValue.target.value;
    this.setState({ appli });
  };

  handleVolumeMountPointUpdate = (index0, index2) => (volume) => {
    let appli = this.state.appli;
    appli.Services[index0].Volumes[index2].MountPoint = volume.target.value;
    this.setState({ appli });
  };

  addEnvs(index) {
    let appli = this.state.appli;
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    appli.Services[index].Envs = [
      ...appli.Services[index].Envs,
      {
        ID: date.toISOString(),
        Name: "",
        DefaultValue: "",
      },
    ];
    this.setState({ appli });
  }

  removeEnvs(index0, index1) {
    let appli = this.state.appli;
    appli.Services[index0].Envs.splice(index1, 1);
    this.setState({ appli });
  }

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

  formNetworks() {
    const { appli } = this.state;
    let networks = [];
    appli.Networks.map((network) => networks.push({ Name: network.Name }));
    return networks;
  }

  formServicesEnvs(index) {
    const { appli } = this.state;
    let envs = [];
    appli.Services[index].Envs.map((env) => envs.push({ Name: env.Name, Value: env.DefaultValue }));
    return envs;
  }

  formServicesNetworks(index) {
    const { appli } = this.state;
    let networks = [];
    appli.Services[index].Networks.map((network) => networks.push({ Name: network.Name }));
    return networks;
  }

  formServicesPorts(index) {
    const { appli } = this.state;
    let ports = [];
    appli.Services[index].Ports.map((port) => ports.push({ InputPort: port.InputPort, OutputPort: port.OutputPort }));
    return ports;
  }

  formServicesVolumes(index) {
    const { appli } = this.state;
    let volumes = [];
    appli.Services[index].Volumes.map((volume) => volumes.push({ MountPoint: volume.MountPoint, Name: volume.Name }));
    return volumes;
  }

  formServices() {
    const { appli } = this.state;
    let services = [];
    appli.Services.map((service, index) =>
      services.push({
        Envs: this.formServicesEnvs(index),
        Image: service.Image,
        ImageVersion: service.ImageVersion,
        Name: service.Name,
        Networks: this.formServicesNetworks(index),
        Ports: this.formServicesPorts(index),
        Volumes: this.formServicesVolumes(index),
      })
    );
    return services;
  }

  formVolumes() {
    const { appli } = this.state;
    let volumes = [];
    appli.Volumes.map((volume) => volumes.push({ Name: volume.Name }));
    return volumes;
  }

  formToDownload = () => {
    const { appli } = this.state;
    this.setState({
      downloadAppli: {
        Description: appli.Description,
        Icon: appli.Icon,
        Name: appli.Name,
        Networks: this.formNetworks(),
        Services: this.formServices(),
        Volumes: this.formVolumes(),
      },
    });
  };

  downloadAppli = async () => {
    await this.formToDownload();
    const response = await fetch("http://192.168.10.151:8082/docker/v1/stack", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state.downloadAppli),
    });
    if (response.status === 200) {
      this.setState({ install: "ok" });
    } else {
      this.setState({ install: "error" });
    }
  };

  displayEnvs(service, index0) {
    return (
      <>
        {service.Envs.map((env, index1) => (
          <p key={env.ID} style={{ marginLeft: "25px" }}>
            <TiDeleteOutline size="20px" className="suppr" onClick={() => this.removeEnvs(index0, index1)} />
            <Form.Control className="modif" type="text" value={env.Name} onChange={this.handleEnvNameUpdate(index0, index1)} /> :
            <Form.Control className="modif" type="text" value={env.DefaultValue} onChange={this.handleEnvValueUpdate(index0, index1)} />
          </p>
        ))}
        <Button
          className="button"
          style={{ marginLeft: "40%", marginBottom: "10px", backgroundColor: "#0B3862" }}
          onClick={() => this.addEnvs(index0)}
        >
          <MdAddCircle size="20px" className="add" />
          Ajouter
        </Button>
      </>
    );
  }

  displayVolumes(service, index0) {
    return service.Volumes.map((volume, index2) => (
      <div key={volume.ID} style={{ marginLeft: "25px" }}>
        <p>Nom: {volume.Name}</p>
        <p>
          Point de montage :
          <Form.Control className="modif" type="text" value={volume.MountPoint} onChange={this.handleVolumeMountPointUpdate(index0, index2)} />
        </p>
      </div>
    ));
  }

  displayNetworks(service) {
    return service.Networks.map((network) => (
      <p key={network.ID} style={{ marginLeft: "25px" }}>
        {network.Name}
      </p>
    ));
  }

  displayLabels(service, index0) {
    return (
      <>
        {service.Envs.map((env, index1) => (
          <p key={env.ID} style={{ marginLeft: "25px" }}>
            <TiDeleteOutline size="20px" className="suppr" onClick={() => this.removeEnvs(index0, index1)} />
            <Form.Control className="modif" type="text" value={env.Name} onChange={this.handleEnvNameUpdate(index0, index1)} /> :
            <Form.Control className="modif" type="text" value={env.DefaultValue} onChange={this.handleEnvValueUpdate(index0, index1)} />
          </p>
        ))}
        <Button
          className="button"
          style={{ marginLeft: "40%", marginBottom: "10px", backgroundColor: "#0B3862" }}
          onClick={() => this.addEnvs(index0)}
        >
          <MdAddCircle size="20px" className="add" />
          Ajouter
        </Button>
      </>
    );
  }

  getServicesInfos() {
    const { appli } = this.state;
    return appli.Services.map((service, index0) => (
      <div key={service.ID} className="services-details">
        <Form.Control className="service-name" type="text" value={service.Name} onChange={this.handleNameUpdate(index0)} />
        <Tabs defaultActiveKey="image" transition={false} className="tabs">
          <Tab eventKey="image" title="Image">
            <div className="navig">
              <p>
                Image : <Form.Control className="modif" type="text" value={service.Image} onChange={this.handleImageUpdate(index0)} />
              </p>
              <p>
                Version : <Form.Control className="modif" type="text" value={service.ImageVersion} onChange={this.handleImageVersionUpdate(index0)} />
              </p>
            </div>
          </Tab>
          <Tab eventKey="envs" title="Environnements">
            <div className="navig">
              <p>Variable(s) d'environnement(s) : </p>
              {this.displayEnvs(service, index0)}
            </div>
          </Tab>
          <Tab eventKey="volumes" title="Volumes">
            <div className="navig">
              <p>Volume(s) : </p>
              {this.displayVolumes(service, index0)}
            </div>
          </Tab>
          <Tab eventKey="networks" title="Réseaux">
            <div className="navig">
              <p>Réseau(x) : </p>
              {this.displayNetworks(service)}
            </div>
          </Tab>
          <Tab eventKey="labels" title="Labels">
            <div className="navig">
              <p>Labels : </p>
              {this.displayLabels(service, index0)}
            </div>
          </Tab>
        </Tabs>
      </div>
    ));
  }

  addService = () => {
    let appli = this.state.appli;
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    appli.Services = [
      ...appli.Services,
      {
        ID: date.toISOString(),
        Name: "Nouveau service",
        Image: "",
        ImageVersion: "",
        Envs: [{ ID: date.toISOString(), Name: "", DefaultValue: "" }],
        Volumes: [{ ID: date.toISOString(), Name: "", MountPoint: "" }],
        Networks: [{ ID: date.toISOString(), Name: "" }],
        Ports: [],
      },
    ];
    this.setState({ appli });
  };

  getAppliInfo = async () => {
    const { appli } = this.props.location.state;
    const response = await fetch(`https://marketplace.opengate.space/v1/stack/${appli.ID}`);
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
            <h4 style={{ marginBottom: "50px", marginLeft: "25px" }}>Services :</h4>
            <div className="services-appli">{this.getServicesInfos()}</div>
            <Button className="new-services" onClick={this.addService}>
              Nouveau service
            </Button>
            <Button className="download" onClick={this.downloadAppli}>
              <MdFileDownload size="20px" />
              Télécharger
            </Button>
            {this.state.install === "ok" && (
              <Alert className="install" variant="success">
                Application en cours d'installation.
              </Alert>
            )}
            {this.state.install === "error" && (
              <Alert className="install" variant="danger">
                Erreur lors de l'installation, réessayer plus tard.
              </Alert>
            )}
          </div>
        </Row>
        <div className="bas-de-page-marketplaceDetails" />
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(MarketplaceDetails);
