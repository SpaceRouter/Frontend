import React, { Component } from "react";
import { Container, Row, Card, InputGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { MdSearch } from "react-icons/md";

import { updateTitlePage } from "../redux/action";
import "../global.css";
import "./AppsInstalled.css";

class AppsInstalled extends Component {
  state = {
    search: "",
    appliList: [],
    appsFiltered: [],
  };

  applisRender() {
    return this.state.appsFiltered.map((appli) => (
      <Card className="appli" key={appli.ID} onClick={() => this.appsInstalledDetails(appli)}>
        <Card.Img className="img-market" variant="top" src={appli.Icon} />
        <div className="titre">
          <Card.Title>{appli.Name}</Card.Title>
          <Card.Subtitle>{appli.Developer.Name}</Card.Subtitle>
        </div>
        <Card.Body className="description">{appli.Description}</Card.Body>
        <div className="on-off">
          <Button variant="danger" style={{ marginRight: 8 }}>
            Off
          </Button>
          <Button variant="success">On</Button>
        </div>
      </Card>
    ));
  }

  searchFilterFunction = (search) => {
    const onWriting = search.target.value;
    const newData = this.state.appliList.filter((item) => {
      const itemData = item.Name.toUpperCase();
      const textData = onWriting.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ appsFiltered: newData });
  };

  appsInstalledDetails(appli) {
    this.props.history.push({ pathname: "/appsinstalled-details", state: { appli: appli } });
  }

  getAppliInfo = async (appli) => {
    const response = await fetch(`https://sr-marketplace.esieespace.fr/v1/search/stack/${appli}`);
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      console.log(json)
    }
  };

  getApplisInfo = async () => {
    const response0 = await fetch("http://192.168.10.151:8082/v1/stacks");
    let json0 = await response0.json();
    if (response0.status === 200 && json0.Ok) {
      json0.Stacks.forEach(appli => this.getAppliInfo(appli))
    }
  };

  componentDidMount() {
    this.props.updateTitlePage("Applications installées");
    this.getApplisInfo();
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
