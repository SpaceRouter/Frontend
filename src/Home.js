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
          <div className="heimdall">
            {this.state.appList.map((app) => (
              <Card style={{ width: "9rem", backgroundColor: "#F2F3F5", height: "250px", margin: "auto", borderRadius: "10px" }} key={app.id}>
                <Card.Img className="img" variant="top" src={app.photo} />
                <Card.Body>
                  <Card.Title>{app.nom}</Card.Title>
                  <div className="on-off">
                    <Button variant="danger" style={{ marginRight: 8 }}>
                      Off
                    </Button>
                    <Button variant="success">On</Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="block1">
            <div className="usage">
              <CPUChart />
            </div>
            <div className="services">
              <RAMChart />
            </div>
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="block2">
            <div className="routeur">
              <DiskChart />
            </div>
            <div className="cpu">
              <NetworkChart />
            </div>
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
