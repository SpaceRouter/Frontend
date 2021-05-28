import React, { Component } from "react";
import { Container, Form, Row, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { MdSearch } from "react-icons/md";

import { updateTitlePage } from "../redux/action.js";
import "./Marketplace.css";

class Marketplace extends Component {
  state = {
    search: "",
  };

  handleSearchUpdate = (search) => {
    this.setState({ search: search.target.value });
  };

  render() {
    this.props.updateTitlePage("Magasin d'applications");
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <div>
          <Form className="form">
            <Form.Group style={{ width: 700 }}>
              <MdSearch size="25px"/> 
              <Form.Control className="search" type="text" placeholder="Rechercher" value={this.state.search} onChange={this.handleSearchUpdate}/>
            </Form.Group>
          </Form>
          </div>
        </Row>
        <Row className="justify-content-md-center"> 
          <Card className="appli">
          <Card.Img className="img" variant="top" src="https://wiki.zaclys.com/images/thumb/8/87/Nextcloud_logo_blanc.png/100px-Nextcloud_logo_blanc.png" />
          <Card.Title>NextCloud</Card.Title>
          <Card.Subtitle>Cocheta</Card.Subtitle>
          <Card.Text>
                Cogeto ergum iefheifh sudum expediormus efieoif legardium leviosa sectum sempra avada kedavra imperium ejfe platon descartes.
          </Card.Text>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Marketplace);
