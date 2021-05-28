import React, { Component } from "react";
import { Container, Form, Row, Card, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { MdSearch } from "react-icons/md";

import { updateTitlePage } from "../redux/action.js";
import "./Marketplace.css";
import { appli } from "../Datas.js";

class Marketplace extends Component {
  state = {
    search: "",
    appliList: [],
    index: 0,
    appsFiltered: [],
  };

  getAppliInfo() {
    this.setState({ appliList: appli });
  }

  componentDidMount() {
    this.getAppliInfo();
  }

  SearchFilterFunction(search) {
    console.log(search)
    const newData = this.state.appliList.filter((item) => {
        const itemData = item.nom.toUpperCase()
        const textData = search.toUpperCase()
        return itemData.indexOf(textData) > -1
    })
    this.setState({ appliList: newData });
  };

  applisRender() {
    return(
      this.state.appliList.map((appli, index) => (
        <Card className="appli" key={appli.id}>
            <Card.Img className="img" variant="top" src={appli.logo} />
          <div className="titre">
            <Card.Title>{appli.nom}</Card.Title>
            <Card.Subtitle>{appli.auteur}</Card.Subtitle>
          </div>
          <Card.Body className="text">
            {appli.description}
          </Card.Body>
        </Card>
      ))
    )
  }

  render() {
    this.props.updateTitlePage("Magasin d'applications");
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Form className="formSearch">
            <Form.Label onChange={(search) => this.SearchFilterFunction(search)} htmlFor="inlineFormInputGroup" srOnly>
              Rechercher
            </Form.Label>
            <InputGroup >
              <InputGroup.Prepend>
                <InputGroup.Text><MdSearch size="25px"/></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="inlineFormInputGroupUsername2" placeholder="Rechercher" />
            </InputGroup>
          </Form>
        </Row>
        <Row className="justify-content-md-center"> 
          <div className="block">
            {this.applisRender()}
          </div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Marketplace);
