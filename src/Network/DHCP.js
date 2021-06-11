import React, { Component } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";
import { FaPen } from "react-icons/fa";

import { updateTitlePage } from "../redux/action.js";
import PopUpDHCP from "./PopUpDHCP.js";
import "./DHCP.css";
import "../global.css";

class DHCP extends Component {
  state = {
    modalVisible: false,
    index: "",
    dhcp: { free: [], fixed: [], staging: [] },
    scope: {},
    delete: false,
  };

  modifyOrDelete(index) {
    if (this.state.delete) {
      const { hostname, mac } = this.state.dhcp.fixed[index];
      return (
        <Button border="none" style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => this.deleteDhcp(hostname, mac)}>
          <MdDelete className="modification" size="20px" />
        </Button>
      );
    } else {
      return (
        <>
          <Button
            border="none"
            style={{ backgroundColor: "#FFFFFF", border: "none" }}
            onClick={() => this.setState({ modalVisible: true, index: index })}
          >
            <FaPen className="modification" size="15px" />
          </Button>

          <PopUpDHCP
            show={this.state.modalVisible}
            onHide={() => {
              this.getDhcpInfos();
              this.setState({ modalVisible: false, index: "" });
            }}
            baux_dhcp_staticList={this.state.dhcp.fixed}
            indexBauxDHCPStatic={this.state.index}
          />
        </>
      );
    }
  }

  addButton() {
    return (
      <>
        <Button className="button button1" onClick={() => this.setState({ modalVisible: true })}>
          <MdAddCircle size="20px" className="add" />
          AJOUTER
        </Button>

        <PopUpDHCP
          show={this.state.modalVisible}
          onHide={() => {
            this.getDhcpInfos();
            this.setState({ modalVisible: false, index: "" });
          }}
          baux_dhcp_staticList={this.state.dhcp.fixed}
          indexBauxDHCPStatic={this.state.index}
        />
      </>
    );
  }

  deleteDhcp = async (hostname, mac) => {
    const response = await fetch("http://192.168.10.151:8080/deletefix", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        hostname: hostname,
        mac: mac,
      }),
    });
    if (response.status === 200) {
      this.getDhcpInfos();
    }
  };

  displayDhcpOptions() {
    const title = ["Sous-réseau", "Adresse IP de début", "Adresse IP de IP fin", "Masque de sous-réseau", "Serveur DNS", "Domaine DNS"];
    return title.map((title, index) => (
      <tr key={title}>
        <td className="data" style={{ backgroundColor: "#679ECB", color: "#FFFFFF" }}>
          {title}
        </td>
        <td className="user">{this.state.scope[index]}</td>
      </tr>
    ));
  }

  displayDhcpStatic() {
    return this.state.dhcp.staging.map((baux_dhcp) => (
      <tr key={baux_dhcp.ip}>
        <td>{baux_dhcp.ip}</td>
        <td>{baux_dhcp.hostname}</td>
        <td className="tel">{baux_dhcp.mac}</td>
        <td className="tel">{baux_dhcp.starts}</td>
        <td className="tel">{baux_dhcp.ends}</td>
        <td></td>
      </tr>
    ));
  }

  displayDhcpDynamic() {
    return this.state.dhcp.fixed.map((baux_dhcp_static, index) => (
      <tr key={baux_dhcp_static.mac}>
        <td>{baux_dhcp_static.ip}</td>
        <td>{baux_dhcp_static.hostname}</td>
        <td className="tel">{baux_dhcp_static.mac}</td>
        <td>{this.modifyOrDelete(index)}</td>
      </tr>
    ));
  }

  getDhcpInfos = async () => {
    const response0 = await fetch("http://192.168.10.151:8080/data");
    let json0 = await response0.json();
    const response1 = await fetch("http://192.168.10.151:8080/scope");
    let json1 = await response1.json();
    if (response0.status === 200 && response1.status === 200) {
      this.setState({ dhcp: json0, scope: Object.values(json1.scope[0]) });
    }
  };

  componentDidMount() {
    this.props.updateTitlePage("DHCP");
    this.getDhcpInfos();
  }

  render() {
    return (
      <Container fluid style={{ marginTop: 100, backgroundColor: "#F2F3F5" }}>
        <Row className="justify-content-center">
          <h2 style={{ marginBottom: "20px" }}>Serveur DHCP</h2>
          <Table responsive className="table" style={{ marginBottom: "100px", width: "40%" }}>
            <tbody>{this.displayDhcpOptions()}</tbody>
          </Table>
        </Row>
        <Row className="justify-content-center">
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Baux DHCP <AiOutlineReload size="30px" style={{ marginLeft:"20px" }} /></h2>
          <Table responsive className="table" style={{ marginBottom: "100px" }}>
            <thead className="head">
              <tr>
                <th>IP</th>
                <th>HOSTNAME</th>
                <th className="tel">MAC</th>
                <th className="tel">START</th>
                <th className="tel">END</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{this.displayDhcpStatic()}</tbody>
          </Table>
        </Row>
        <Row className="justify-content-center">
          <h2 style={{ marginBottom: "20px" }}>Baux DHCP statiques</h2>
          <Table responsive className="table">
            <thead className="head">
              <tr>
                <th>IP</th>
                <th>HOSTNAME</th>
                <th className="tel">MAC</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{this.displayDhcpDynamic()}</tbody>
          </Table>
        </Row>
        <Row style={{ marginTop: 25, justifyContent: "flex-end", marginRight: "23%", marginBottom: "100px" }}>
          {this.addButton()}

          <Button className="button button2" onClick={() => this.setState({ delete: !this.state.delete })}>
            <MdDelete size="20px" className="delete" />
            SUPPRIMER
          </Button>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(DHCP);
