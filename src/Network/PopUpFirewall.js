import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

import { getCookie } from "../Cookies";
import "../PopUp.css";
import { protocolsList } from "../Constants";

const initialState = {
  index: "",
  protocol: "TCP",
  protocolBack: "",
  destinationPort: "",
  destinationPortBack: "",
  destination: "",
  destinationBack: "",
  ip: "",
  ipBack: "",
};

export default class PopUpFirewall extends Component {
  state = initialState;

  handleProtocolUpdate = (protocol) => {
    this.setState({ protocol: protocol.target.value });
  };

  handleDestinationPortUpdate = (destinationPort) => {
    this.setState({ destinationPort: destinationPort.target.value });
  };

  handleDestinationUpdate = (destination) => {
    this.setState({ destination: destination.target.value });
  };

  handleIpUpdate = (ip) => {
    this.setState({ ip: ip.target.value });
  };

  prevPage = () => {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1 });
    }
  };

  nextPage = () => {
    if (this.state.index < this.props.NATRules.length - 1) {
      this.setState({ index: this.state.index + 1 });
    }
  };

  addRule = async () => {
    const { protocol, destination, ip, destinationPort } = this.state;
    const token = getCookie("jwt_token");
    const response = await fetch(
      `http://192.168.10.151:8081/nat/dnat/PREROUTING/${protocol}/+/0.0.0.0_0/0.0.0.0_0/${ip + ":" + destination}/?dport=${destinationPort}`,
      {
        method: "PUT",
        headers: { authorization: token },
      }
    );
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      this.props.onHide();
    }
  };

  modifyRule = async () => {
    const { protocol, protocolBack, destination, destinationBack, ip, ipBack, destinationPort, destinationPortBack } = this.state;
    const token = getCookie("jwt_token");
    const response = await fetch(
      `http://192.168.10.151:8081/nat/dnat/PREROUTING/${protocolBack}/+/0.0.0.0_0/0.0.0.0_0/${
        ipBack + ":" + destinationBack
      }/?dport=${destinationPortBack}`,
      {
        method: "DELETE",
        headers: { authorization: token },
      }
    );
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      await fetch(
        `http://192.168.10.151:8081/nat/dnat/PREROUTING/${protocol}/+/0.0.0.0_0/0.0.0.0_0/${ip + ":" + destination}/?dport=${destinationPort}`,
        {
          method: "PUT",
          headers: { authorization: token },
        }
      );
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { NATRules, indexNAT } = this.props;
    const { index } = this.state;
    if (indexNAT !== "" && indexNAT !== prevProps.indexNAT) {
      this.setState({
        index: indexNAT,

        protocol: NATRules[indexNAT].Protocol.toUpperCase(),
        protocolBack: NATRules[indexNAT].Protocol.toUpperCase(),

        destinationPort: NATRules[indexNAT].DestinationPort,
        destinationPortBack: NATRules[indexNAT].DestinationPort,

        destination: NATRules[indexNAT].Destination.split(":")[1],
        destinationBack: NATRules[indexNAT].Destination.split(":")[1],

        ip: NATRules[indexNAT].Destination.split(":")[0],
        ipBack: NATRules[indexNAT].Destination.split(":")[0],
      });
    }
    if (index !== "" && index !== prevState.index) {
      const token = getCookie("jwt_token");
      const response = await fetch("http://192.168.10.151:8081/chain/nat/PREROUTING/", {
        method: "GET",
        headers: { authorization: token },
      });
      let json = await response.json();
      if (response.status === 200 && json.Ok) {
        this.setState({
          protocol: json.Chains[index].Protocol.toUpperCase(),
          protocolBack: json.Chains[index].Protocol.toUpperCase(),

          destinationPort: json.Chains[index].DestinationPort,
          destinationPortBack: json.Chains[index].DestinationPort,

          destination: json.Chains[index].Destination.split(":")[1],
          destinationBack: json.Chains[index].Destination.split(":")[1],

          ip: json.Chains[index].Destination.split(":")[0],
          ipBack: json.Chains[index].Destination.split(":")[0],
        });
      }
    }
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.setState({ ...initialState });
          this.props.onHide();
        }}
        size="576px"
        centered
      >
        <Modal.Body>
          <h3 className="modal-title"> NAT / PAT </h3>
          <Table responsive>
            <tbody>
              <tr>
                <td className="option">PROTOCOLES</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control as="select" value={this.state.protocol} onChange={this.handleProtocolUpdate}>
                    {protocolsList.map((protocol) => (
                      <option key={protocol}>{protocol}</option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
              <tr>
                <td className="option">PORT ENTREE</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control
                    style={{ width: "auto" }}
                    type="text"
                    value={this.state.destinationPort}
                    onChange={this.handleDestinationPortUpdate}
                  />
                </td>
              </tr>
              <tr>
                <td className="option">PORT DESTINATION</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.destination} onChange={this.handleDestinationUpdate} />
                </td>
              </tr>
              <tr>
                <td className="option">IP</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.ip} onChange={this.handleIpUpdate} />
                </td>
              </tr>
            </tbody>
          </Table>
          {this.state.index !== "" && (
            <Pagination className="arrow">
              <Pagination.Prev onClick={this.prevPage} />
              <Button className="button-validate" onClick={this.modifyRule}>
                VALIDER
              </Button>
              <Pagination.Next className="next-arrow" onClick={this.nextPage} />
            </Pagination>
          )}
          {this.state.index === "" && (
            <div className="button-center">
              <Button className="button-add" onClick={this.addRule}>
                AJOUTER
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}
