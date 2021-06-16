import React, { Component } from "react";
import { Container, Row, Card, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { MdSearch } from "react-icons/md";

import { updateTitlePage } from "../redux/action.js";
import "../global.css";
import "./AppsInstalled.css";

class AppsInstalled extends Component {
  state = {
    search: "",
    appliList: [],
    appsFiltered: [], 
  };

  searchFilterFunction = (search) => {
    const onWriting = search.target.value;
    const newData = this.state.appliList.filter((item) => {
      const itemData = item.Name.toUpperCase();
      const textData = onWriting.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ appsFiltered: newData });
  };

  applisRender() {
    return this.state.appsFiltered.map((appli) => (
      <Card className="appli" key={appli.ID} onClick={() => this.marketplaceDetails(appli)}>
        <Card.Img className="img-market" variant="top" src={appli.Icon} />
        <div className="titre">
          <Card.Title>{appli.Name}</Card.Title>
          <Card.Subtitle>{appli.Developer.Name}</Card.Subtitle>
        </div>
        <Card.Body className="description">{appli.Description}</Card.Body>
      </Card>
    ));
  }

  componentDidMount() {
    this.props.updateTitlePage("Applications installées");
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <InputGroup className="search-bar">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <MdSearch size="23px" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl onChange={this.searchFilterFunction} placeholder="Rechercher" />
          </InputGroup>
        </Row>
        <Row className="justify-content-center">
          <div className="blockMarketplace">{this.applisRender()}</div>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(AppsInstalled);
