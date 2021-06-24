import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

import { domainName } from "../Constants";

const initialState = {
  index: "",
  hostname: "",
  hostnameBack: "",
  mac: "",
  macBack: "",
  ip: "",
};

export default class PopUpDHCP extends Component {
  state = initialState;

  handleHostnameUpdate = (hostname) => {
    this.setState({ hostname: hostname.target.value });
  };

  handleMacUpdate = (mac) => {
    this.setState({ mac: mac.target.value });
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
    if (this.state.index < this.props.baux_dhcp_staticList.length - 1) {
      this.setState({ index: this.state.index + 1 });
    }
  };

  addDhcp = async () => {
    const response = await fetch(`${domainName}/addfix`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        hostname: this.state.hostname,
        mac: this.state.mac,
        ip: this.state.ip,
      }),
    });
    if (response.status === 200) {
      this.props.onHide();
    }
  };

  modifyDhcp = async () => {
    const { hostname, hostnameBack, mac, macBack, ip } = this.state;
    const response = await fetch(`${domainName}/deletefix`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        hostname: hostnameBack,
        mac: macBack,
      }),
    });
    if (response.status === 200) {
      await fetch(`${domainName}/addfix`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          hostname: hostname,
          mac: mac,
          ip: ip,
        }),
      });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { baux_dhcp_staticList, indexBauxDHCPStatic } = this.props;
    const { index } = this.state;
    if (indexBauxDHCPStatic !== "" && indexBauxDHCPStatic !== prevProps.indexBauxDHCPStatic) {
      this.setState({
        index: indexBauxDHCPStatic,

        hostname: baux_dhcp_staticList[indexBauxDHCPStatic].hostname,
        hostnameBack: baux_dhcp_staticList[indexBauxDHCPStatic].hostname,

        mac: baux_dhcp_staticList[indexBauxDHCPStatic].mac,
        macBack: baux_dhcp_staticList[indexBauxDHCPStatic].mac,
        
        ip: baux_dhcp_staticList[indexBauxDHCPStatic].ip,
      });
    }
    if (index !== "" && index !== prevState.index) {
      const response = await fetch(`${domainName}/data`);
      let json = await response.json();
      if (response.status === 200) {
        this.setState({
          hostname: json.fixed[index].hostname,
          hostnameBack: json.fixed[index].hostname,
          mac: json.fixed[index].mac,
          macBack: json.fixed[index].mac,
          ip: json.fixed[index].ip,
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
          <h3 className="modal-title">DHCP statique</h3>
          <Table responsive>
            <tbody>
              <tr>
                <td className="option">IP</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.ip} onChange={this.handleIpUpdate} />
                </td>
              </tr>
              <tr>
                <td className="option">Hostname</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.hostname} onChange={this.handleHostnameUpdate} />
                </td>
              </tr>
              <tr>
                <td className="option">MAC</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.mac} onChange={this.handleMacUpdate} />
                </td>
              </tr>
            </tbody>
          </Table>
          {this.state.index !== "" && (
            <Pagination className="arrow">
              <Pagination.Prev onClick={this.prevPage} />
              <Button className="button-validate" onClick={this.modifyDhcp}>
                VALIDER
              </Button>
              <Pagination.Next className="next-arrow" onClick={this.nextPage} />
            </Pagination>
          )}
          {this.state.index === "" && (
            <div className="button-center">
              <Button className="button-add" onClick={this.addDhcp}>
                AJOUTER
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}
