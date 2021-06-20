import React, { Component } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "./redux/action.js";
import CPUChart from "./Charts/CPUChart.js";
import RAMChart from "./Charts/RAMChart.js";
import DiskChart from "./Charts/DiskChart.js";
import NetworkChart from "./Charts/NetworkChart.js";
import "./global.css";
import "./Home.css";
import { app } from "./Datas.js";

class Home extends Component {
  state = {
    appList: [],
    index: "0",
  };

  getUsersInfo() {
    this.setState({ appList: app });
  }

  componentDidMount() {
    this.getUsersInfo();
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
            {this.state.appList.map((app) => (
              <Card className="home-app" key={app.id}>
                <Card.Img className="img" variant="top" src={app.photo} />
                <Card.Body>
                  <Card.Title>{app.nom}</Card.Title>
                  <div className="on-off">
                    <Button style={{ marginRight: 8, backgroundColor: "#D98880 ", border:"none" }}>
                      Off
                    </Button>
                    <Button style={{ backgroundColor: "#82E0AA", border:"none" }}>On</Button>
                  </div>
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
