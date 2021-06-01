import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

import "./PopUpFirewall.css";
import { protocolesList } from "../Datas.js";

const initialState = {
  index: "",
  protocoles: "TCP",
  port_entree: "",
  port_destination: "",
  ip: "",
};

export default class PopUpFirewall extends Component {
  state = initialState;

  handleProtocolesUpdate = (protocoles) => {
    this.setState({ protocoles: protocoles.target.value });
  };

  handlePortEntreeUpdate = (port_entree) => {
    this.setState({ port_entree: port_entree.target.value });
  };

  handlePortDestinationUpdate = (port_destination) => {
    this.setState({ port_destination: port_destination.target.value });
  };

  handleIpUpdate = (ip) => {
    this.setState({ ip: ip.target.value });
  };

  prevPage = () => {
    if (this.state.index > 0) {
      console.log(this.state);
      this.setState({ index: this.state.index - 1 });
    }
  };

  nextPage = () => {
    if (this.state.index < this.props.firewallList.length - 1) {
      console.log(this.state);
      this.setState({ index: this.state.index + 1 });
    }
  };

  addFirewall = () => {
    console.log(this.state);
    this.setState({ ...initialState });
    this.props.onHide();
  };

  componentDidUpdate(prevProps, prevState) {
    const { firewallList, indexFirewall } = this.props;
    const { index } = this.state;
    if (indexFirewall !== prevProps.indexFirewall) {
      this.setState({
        index: indexFirewall,
        protocoles: firewallList[indexFirewall].protocoles,
        port_entree: firewallList[indexFirewall].port_entree,
        port_destination: firewallList[indexFirewall].port_destination,
        ip: firewallList[indexFirewall].ip,
      });
    }
    if (index !== "" && index !== prevState.index) {
      this.setState({
        index: index,
        protocoles: firewallList[index].protocoles,
        port_entree: firewallList[index].port_entree,
        port_destination: firewallList[index].port_destination,
        ip: firewallList[index].ip,
      });
    }
  }

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
          <h3 style={{ textAlign: "center", fontWeight: "lighter", marginBottom: "25px" }}> NAT / PAT </h3>
          <Table responsive>
            <tbody>
              <tr>
                <td className="data">PROTOCOLES</td>
                <td> </td>
                <td className="user">
                  <Form.Control as="select" value={this.state.protocoles} onChange={this.handleProtocolesUpdate}>
                    {protocolesList.map((protocoles) => (
                      <option key={protocoles}>{protocoles}</option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
              <tr>
                <td className="data">PORT_ENTREE</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.port_entree} onChange={this.handlePortEntreeUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">PORT_DESTINATION</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.port_destination} onChange={this.handlePortDestinationUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">IP</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.ip} onChange={this.handleIpUpdate} />
                </td>
              </tr>
            </tbody>
          </Table>
          {this.state.index !== "" && (
            <Pagination className="arrow">
              <Pagination.Prev onClick={this.prevPage} />
              <Pagination.Next className="next-arrow" onClick={this.nextPage} />
            </Pagination>
          )}
          {this.state.index === "" && (
            <div className="button-center" >
            <Button className="button-add" onClick={this.addFirewall}>
              AJOUTER
            </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}