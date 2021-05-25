import React, { Component } from "react";
import { Container, Row, Form, Card } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "./redux/action.js";
import "./Home.css";

class Home extends Component {
  render() {
    this.props.updateTitlePage("Page d'accueil");
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <div className="heimdall">
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="truc">
            <Card.Body>
              <Card.Text>
              <Form.Check 
                type="switch"
                id="custom-switch"
                label="Check this switch"
              />
              </Card.Text>
            </Card.Body>
          </Card>

          
          </div>
        </Row>
        <Row className="justify-content-md-center">
          <div className="block1">
            <div className="usage"></div> 
            <div className="services"></div> 
          </div>
        </Row>
        <Row className="justify-content-md-center">
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