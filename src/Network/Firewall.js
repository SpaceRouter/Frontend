import React, { Component } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";

import { updateTitlePage } from "../redux/action.js";
import PopUpFirewall from "./PopUpFirewall.js";
import "./Firewall.css";
import "../global.css";
import { firewall } from "../Datas.js";

class Firewall extends Component {
  state = {
    modalVisible: false,
    firewallList: [],
    index: "-1",
    delete: false,
  }

  modificationOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button border="none" style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => console.log(this.state.firewallList[index])}>
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

          <PopUpFirewall
            show={this.state.modalVisible}
            onHide={() => this.setState({ modalVisible: false })}
            firewallList={this.state.firewallList}
            indexFirewall={this.state.index}
          />
        </>
      );
    }
  }

  addButton() {
    return <PopUpFirewall show={this.state.modalVisible} onHide={() => this.setState({ modalVisible: false })} />;
  }

  getFirewallInfo() {
    this.setState({ firewallList: firewall });
  }

  componentDidMount() {
    this.getFirewallInfo();
    this.props.updateTitlePage("Firewall");
  }

  render() {
    return (
      <Container fluid style={{ marginTop: 100, backgroundColor: "#F2F3F5" }}>       
        <Row className="justify-content-center">
        <h2 style={{marginBottom:"20px", textAlign:"center"}}>NAT / PAT</h2>
          <Table responsive className="table">
            <thead className="head">
              <tr>
                <th className="tel">PROTOCOLES</th>
                <th>PORT ENTREE</th>
                <th className="tel">PORT DESTINATION</th>
                <th>IP</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
                {this.state.firewallList.map((firewall, index) => (
                  <tr key={firewall.ip}>
                    <td className="tel"><Button variant="outline-dark" disabled>
                      {firewall.protocoles}
                    </Button></td>
                    <td>{firewall.port_entree}</td>
                    <td className="tel">{firewall.port_destination}</td>
                    <td>{firewall.ip}</td>
                    <td>{this.modificationOrDelete(index)}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
        <Row style={{ marginTop: 25, justifyContent: "flex-end", marginRight: "23%" }}>
          <Button
            className="button button1"
            onClick={() => {
              this.setState({ modalVisible: true });
              this.addButton();
            }}
          >
            <MdAddCircle size="20px" className="add" />
            AJOUTER
          </Button>

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
})(Firewall);
