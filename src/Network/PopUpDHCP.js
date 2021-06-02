import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

const initialState = {
  index: "",
  hostname: "",
  mac: "",
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
      console.log(this.state);
      this.setState({ index: this.state.index - 1 });
    }
  };

  nextPage = () => {
    if (this.state.index < this.props.baux_dhcp_staticList.length - 1) {
      console.log(this.state);
      this.setState({ index: this.state.index + 1 });
    }
  };

  addBauxDCHPStatic = () => {
    console.log(this.state);
    this.setState({ ...initialState });
    this.props.onHide();
  };

  componentDidUpdate(prevProps, prevState) {
    const { baux_dhcp_staticList, indexBauxDHCPStatic } = this.props;
    const { index } = this.state;
    if (indexBauxDHCPStatic !== prevProps.indexBauxDHCPStatic) {
      this.setState({
        index: indexBauxDHCPStatic,
        hostname: baux_dhcp_staticList[indexBauxDHCPStatic].hostname,
        mac: baux_dhcp_staticList[indexBauxDHCPStatic].mac,
        port_destination: baux_dhcp_staticList[indexBauxDHCPStatic].port_destination,
        ip: baux_dhcp_staticList[indexBauxDHCPStatic].ip,
      });
    }
    if (index !== "" && index !== prevState.index) {
      this.setState({
        index: index,
        hostname: baux_dhcp_staticList[index].hostname,
        mac: baux_dhcp_staticList[index].mac,
        port_destination: baux_dhcp_staticList[index].port_destination,
        ip: baux_dhcp_staticList[index].ip,
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
                <td className="data">hostname</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.hostname} onChange={this.handleHostnameUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">mac</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.mac} onChange={this.handleMacUpdate} />
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
            <Button className="button-add" onClick={this.addBauxDCHPStatic}>
              AJOUTER
            </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}