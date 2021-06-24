import React, { Component } from "react";
import { Container, Row, Card, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { MdSearch } from "react-icons/md";

import { updateTitlePage } from "../redux/action";
import { domainName } from "../Constants";
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
      <Card className="appli" key={appli.Stack.ID} onClick={() => this.appsInstalledDetails(appli)}>
        <Card.Img className="img-market" variant="top" src={appli.Stack.Icon} />
        <div className="titre">
          <Card.Title>{appli.Stack.Name}</Card.Title>
          <Card.Subtitle>{appli.Developer.Name}</Card.Subtitle>
        </div>
        <Card.Body className="description">{appli.Stack.Description}</Card.Body>
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
    const response = await fetch(`https://marketplace.opengate.space/v1/stack_by_name/${appli}`);
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      this.setState({ appliList: [...this.state.appliList, json], appsFiltered: [...this.state.appsFiltered, json] });
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
