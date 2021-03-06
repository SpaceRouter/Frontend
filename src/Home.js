import React, { Component } from "react";
import { Container, Row, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "./redux/action";
import CPUChart from "./Charts/CPUChart";
import RAMChart from "./Charts/RAMChart";
import DiskChart from "./Charts/DiskChart";
import NetworkChart from "./Charts/NetworkChart";
import { domainName } from "./Constants";
import "./global.css";
import "./Home.css";

class Home extends Component {
  state = {
    appliList: [],
  };

  handleSwitchUpdate = (index) => {
    let appliList = this.state.appliList;
    if (appliList[index].checked) this.stopAppli(index);
    else this.startAppli(index);
    appliList[index].checked = !appliList[index].checked;
    this.setState({ appliList });
  };

  startAppli = async (index) => {
    await fetch(`${domainName}/docker/v1/stack/${this.state.appliList[index].Name}/start`);
  };

  stopAppli = async (index) => {
    await fetch(`${domainName}/docker/v1/stack/${this.state.appliList[index].Name}/stop`);
  };

  getAppliInfo = async (appli) => {
    const response0 = await fetch(`https://marketplace.opengate.space/v1/stack_by_name/${appli}`);
    let json0 = await response0.json();
    if (response0.status === 200 && json0.Ok) {
      const response1 = await fetch(`${domainName}/docker/v1/active_stacks`);
      let json1 = await response1.json();
      if (response1.status === 200 && json1.Ok) {
        let appliInfo = json0.Stack;
        if (json1.Stacks.includes(appli.toLowerCase())) {
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
        this.setState({ appliList: [...this.state.appliList, appliInfo] });
      }
    }
  };

  getApplisInfo = async () => {
    const response = await fetch(`${domainName}/docker/v1/stacks`);
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      json.Stacks.forEach((appli) => this.getAppliInfo(appli));
    }
  };

  componentDidMount() {
    this.getApplisInfo();
    this.props.updateTitlePage("Page d'accueil");
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <div className="block1">
            <div className="cpu">
              <CPUChart />
            </div>
            <div className="ram">
              <RAMChart />
            </div>
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="block2">
            <div className="disk">
              <DiskChart />
            </div>
            <div className="network">
              <NetworkChart />
            </div>
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="heimdall">
            {this.state.appliList.map((app, index) => (
              <Card className="home-app" key={app.ID}>
                <Card.Img className="img" variant="top" src={app.Icon} />
                <Card.Body>
                  <Card.Title className="center">{app.Name}</Card.Title>
                  <Form.Switch
                    id={app.ID}
                    checked={this.state.appliList[index].checked}
                    label={this.state.appliList[index].checked ? "ON" : "OFF"}
                    onChange={() => this.handleSwitchUpdate(index)}
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
        </Row>
        <div className="bas-de-page" />
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Home);
