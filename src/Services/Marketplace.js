import React, { Component } from "react";
import { Container, Row, Card, InputGroup, FormControl } from "react-bootstrap";
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

  applisRender() {
    return this.state.appsFiltered.map((appli) => (
      <Card className="appli" key={appli.id} onClick={() => this.marketplaceDetails(appli)}>
        <Card.Img className="img" variant="top" src={appli.logo} />
        <div className="titre">
          <Card.Title>{appli.nom}</Card.Title>
          <Card.Subtitle>{appli.auteur}</Card.Subtitle>
        </div>
        <Card.Body className="text">{appli.description}</Card.Body>
      </Card>
    ));
  }

  searchFilterFunction = (search) => {
    const onWriting = search.target.value;
    const newData = this.state.appliList.filter((item) => {
      const itemData = item.nom.toUpperCase();
      const textData = onWriting.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ appsFiltered: newData });
  };

  marketplaceDetails(appli) {
    this.props.history.push({ pathname: "/marketplace-details", state: { appli: appli } });
  }

  getApplisInfo() {
    this.setState({ appliList: appli, appsFiltered: appli });
  }

  componentDidMount() {
    this.getApplisInfo();
    this.props.updateTitlePage("Magasin d'applications");
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <InputGroup className="search-bar">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <MdSearch size="23px" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.searchFilterFunction} placeholder="Rechercher" />
          </InputGroup>
        </Row>
        <Row className="justify-content-md-center">
          <div className="block">{this.applisRender()}</div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Marketplace);
