import React, { Component } from "react";
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { AiFillTool } from "react-icons/ai";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action";
import { domainName } from "../Constants";
import "../global.css";
import "./MarketplaceDetails.css";

class AppsInstalledDetails extends Component {
  state = {
    appli: { Services: [], checked: false },
    appliInfosMarket: { Stack: [], Developer: [] },
    modifyAppli: {},
    modify: "",
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

  handleDomainUpdate = (index0) => (domain) => {
    let appli = this.state.appli;
    appli.Services[index0].Domain = domain.target.value;
    this.setState({ appli });
  };

  handleHttpPortUpdate = (index0) => (httpPort) => {
    let appli = this.state.appli;
    appli.Services[index0].HttpPort = httpPort.target.value;
    this.setState({ appli });
  };

  handleSwitchUpdate = () => {
    let appli = this.state.appli;
    if (appli.checked) this.stopAppli();
    else this.startAppli();
    appli.checked = !appli.checked;
    this.setState({ appli });
  };
  
  startAppli = async () => {
    const appli = this.state.appli;
    await fetch(`${domainName}/docker/v1/stack/${appli.Name}/start`);
  };

  stopAppli = async () => {
    const appli = this.state.appli;
    await fetch(`${domainName}/docker/v1/stack/${appli.Name}/stop`);
  };

  addEnvs(index) {
    let appli = this.state.appli;
    const timeElapsed = Date.now();
    const date = new Date(timeElapsed);
    appli.Services[index].Envs
      ? (appli.Services[index].Envs = [
          ...appli.Services[index].Envs,
          {
            ID: date.toISOString(),
            Name: "",
            DefaultValue: "",
          },
        ])
      : (appli.Services[index].Envs = [
          {
            ID: date.toISOString(),
            Name: "",
            DefaultValue: "",
          },
        ]);
    this.setState({ appli });
  }

  removeEnvs(index0, index1) {
    let appli = this.state.appli;
    appli.Services[index0].Envs.splice(index1, 1);
    this.setState({ appli });
  }

  goBack = () => {
    this.props.history.push("/appsinstalled");
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
    appli.Services[index].Envs.map((env) => envs.push({ Name: env.Name, Value: env.Value }));
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
    if (appli.Services[index].Ports) {
      appli.Services[index].Ports.map((port) => ports.push({ InputPort: port.InputPort, OutputPort: port.OutputPort }));
    }
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
        Domain: service.Domain,
        HttpPort: service.HttpPort,
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
      modifyAppli: {
        Description: appli.Description,
        Icon: appli.Icon,
        Name: appli.Name,
        Networks: this.formNetworks(),
        Services: this.formServices(),
        Volumes: this.formVolumes(),
      },
    });
  };

  modifyAppli = async () => {
    await this.formToDownload();
    const response = await fetch(`${domainName}/docker/v1/stack`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state.modifyAppli),
    });
    if (response.status === 200) {
      this.setState({ modify: "ok" });
    } else {
      this.setState({ modify: "error" });
    }
  };

  displayEnvs(service, index0) {
    return (
      <>
        {service.Envs &&
          service.Envs.map((env, index1) => (
            <p key={index1} style={{ marginLeft: "25px" }}>
              <TiDeleteOutline size="20px" className="suppr" onClick={() => this.removeEnvs(index0, index1)} />
              <Form.Control className="modif" type="text" value={env.Name} onChange={this.handleEnvNameUpdate(index0, index1)} /> :
              <Form.Control className="modif" type="text" value={env.Value} onChange={this.handleEnvValueUpdate(index0, index1)} />
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
    return (
      <>
        {service.Volumes &&
          service.Volumes.map((volume, index2) => (
            <div key={index2} style={{ marginLeft: "25px" }}>
              <p>Nom: {volume.Name}</p>
              <p>
                Point de montage :
                <Form.Control className="modif" type="text" value={volume.MountPoint} onChange={this.handleVolumeMountPointUpdate(index0, index2)} />
              </p>
            </div>
          ))}
      </>
    );
  }

  displayNetworks(service) {
    return (
      <>
        {service.Networks &&
          service.Networks.map((network, index3) => (
            <p key={index3} style={{ marginLeft: "25px" }}>
              {network.Name}
            </p>
          ))}
      </>
    );
  }

  displayLabels(service, index0) {
    return (
      <>
        {service.Envs &&
          service.Envs.map((env, index1) => (
            <p key={index1} style={{ marginLeft: "25px" }}>
              <TiDeleteOutline size="20px" className="suppr" onClick={() => this.removeEnvs(index0, index1)} />
              <Form.Control className="modif" type="text" value={env.Name} onChange={this.handleEnvNameUpdate(index0, index1)} /> :
              <Form.Control className="modif" type="text" value={env.Value} onChange={this.handleEnvValueUpdate(index0, index1)} />
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
      <div key={index0} className="services-details">
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
          <Tab eventKey="networks" title="R??seaux">
            <div className="navig">
              <p>R??seau(x) : </p>
              {this.displayNetworks(service)}
            </div>
          </Tab>
          <Tab eventKey="traefik" title="Traefik">
            <div className="navig">
              <p>Traefik : </p>
              <p>
                Domaine :
                <Form.Control className="modif" type="text" value={service.Domain} onChange={this.handleDomainUpdate(index0)} />
              </p>
              <p>
                httpPort :
                <Form.Control className="modif" type="text" value={service.HttpPort} onChange={this.handleHttpPortUpdate(index0)} />
              </p>
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

  removeAppli = async () => {
    const appli = this.state.appliInfosMarket.Stack.Name;
    const response = await fetch(`${domainName}/docker/v1/stack/${appli}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    if (response.status === 200) {
      this.props.history.push("/appsinstalled");
    }
  };

  getAppliInfo = async () => {
    const { appli } = this.props.location.state;
    this.setState({ appliInfosMarket: appli });
    const response0 = await fetch(`${domainName}/docker/v1/stack/${appli.Stack.Name}`);
    let json0 = await response0.json();
    if (response0.status === 200 && json0.Ok) {
      const response1 = await fetch(`${domainName}/docker/v1/active_stacks`);
      let json1 = await response1.json();
      if (response1.status === 200 && json1.Ok) {
        let appliInfo = json0.Stack;
        if (json1.Stacks.includes(appli.Stack.Name.toLowerCase())) {
          appliInfo = {
            ...appliInfo,
            checked: true,
          };
        } else {
          appliInfo = {
            ...appliInfo,
            checked: false,
          };
        }
        this.setState({ appli: appliInfo });
      }
    }
  };

  componentDidMount() {
    this.props.updateTitlePage(this.props.location.state.appli.Stack.Name);
    this.getAppliInfo();
  }

  render() {
    const { appli, appliInfosMarket } = this.state;
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <div className="appli-details">
            <FaArrowLeft className="back-icon" size="30px" color="black" onClick={this.goBack} />
            <Row>
              <Card.Img className="img-details" src={appliInfosMarket.Stack.Icon} />
              <Col className="info-appli">
                <h2>{appliInfosMarket.Stack.Name}</h2>
                <p style={{ fontSize: "20px", fontWeight: "lighter" }}>{appliInfosMarket.Developer.Name}</p>
                <Form.Switch
                  id={appliInfosMarket.Stack.ID}
                  checked={appli.checked}
                  label={appli.checked ? "ON" : "OFF"}
                  onChange={this.handleSwitchUpdate}
                />
                <Button className="button button1" style={{ margin: 0, marginTop: 15 }} onClick={() => this.removeAppli()}>
                  <MdDelete size="20px" className="delete" />
                  SUPPRIMER
                </Button>
              </Col>
            </Row>
            <div className="text-appli">
              <p> Cr??ation : {this.getDate(appliInfosMarket.Stack.CreatedAt)}</p>
              <p>Derni??re mise ?? jour : {this.getDate(appliInfosMarket.Stack.UpdatedAt)}</p>
            </div>
            <p className="description-appli">{appliInfosMarket.Stack.Description}</p>
            <h4 style={{ marginBottom: "50px", marginLeft: "25px" }}>Services :</h4>
            <div className="services-appli">{this.getServicesInfos()}</div>
            <Button className="new-services" onClick={this.addService}>
              Nouveau service
            </Button>
            <Button className="download" onClick={this.modifyAppli}>
              <AiFillTool size="20px" />
              Modifier
            </Button>
            {this.state.modify === "ok" && (
              <Alert className="install" variant="success">
                Application en cours de modification.
              </Alert>
            )}
            {this.state.modify === "error" && (
              <Alert className="install" variant="danger">
                Erreur lors de la modification, r??essayer plus tard.
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
})(AppsInstalledDetails);
