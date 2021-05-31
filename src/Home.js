import React, { Component } from "react";
import { Container, Row, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "./redux/action.js";
import "./global.css";
import "./Home.css";
import { app } from "./Datas.js";

class Home extends Component {
  state = {
    appList: [],
    index: "0",
  }

  getUsersInfo() {
    this.setState({ appList: app });
  }

  componentDidMount() {
    this.getUsersInfo();
    this.props.updateTitlePage("Page d'accueil");
  }

  render() {
    return (
      <Container fluid className="accueil">
        <Row className="justify-content-center">
          <div className="heimdall">
            {this.state.appList.map((app, index) => (
              <Card style={{ width: '9rem', backgroundColor: "#F2F3F5", height: "250px", margin: "auto", borderRadius: "10px" }} key={app.id}>
              <Card.Img className="img" variant="top" src={app.photo} />
              <Card.Body>
                <Card.Title>{app.nom}</Card.Title>
                <Form.Check type="switch" id={app.id} label="On / Off"/>
              </Card.Body>
              </Card>
              ))}
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="block1">
            <div className="usage"></div> 
            <div className="services"></div> 
          </div>
        </Row>
        <Row className="justify-content-center">
          <div className="block2">
            <div className="routeur"></div> 
            <div className="cpu"></div> 
          </div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Home);