import React, { Component } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";

import { updateTitlePage } from "../redux/action";
import PopUpFirewall from "./PopUpFirewall";
import { getCookie } from "../Cookies";
import "./Firewall.css";
import "../global.css";

class Firewall extends Component {
  state = {
    modalVisible: false,
    NATRules: [],
    index: "",
    delete: false,
  };

  modificationOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button border="none" className="pen-button" onClick={() => this.deleteNat(this.state.NATRules[index])}>
          <MdDelete className="modification" size="20px" />
        </Button>
      );
    } else {
      return (
        <>
          <Button border="none" className="pen-button" onClick={() => this.setState({ modalVisible: true, index: index })}>
            <FaPen className="modification" size="15px" />
          </Button>

          <PopUpFirewall
            show={this.state.modalVisible}
            onHide={() => {
              this.getNATRules();
              this.setState({ modalVisible: false, index: "" });
            }}
            NATRules={this.state.NATRules}
            indexNAT={this.state.index}
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

        <PopUpFirewall
          show={this.state.modalVisible}
          onHide={() => {
            this.getNATRules();
            this.setState({ modalVisible: false, index: "" });
          }}
          NATRules={this.state.NATRules}
          indexNAT={this.state.index}
        />
      </>
    );
  }

  deleteNat = async (NATRule) => {
    const token = getCookie("jwt_token");
    const response = await fetch(
      `http://192.168.10.151:8081/firewall/nat/dnat/PREROUTING/${NATRule.Protocol}/+/0.0.0.0_0/0.0.0.0_0/${NATRule.Destination}/?dport=${NATRule.DestinationPort}`,
      {
        method: "DELETE",
        headers: { authorization: token },
      }
    );
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      this.getNATRules();
    }
  };

  displayNATRules() {
    return this.state.NATRules.map((NAT, index) => (
      <tr key={NAT.Destination}>
        <td className="tel">
          <Button variant="outline-dark" disabled>
            {NAT.Protocol.toUpperCase()}
          </Button>
        </td>
        <td>{NAT.DestinationPort}</td>
        <td className="tel">{NAT.Destination.split(":")[1]}</td>
        <td>{NAT.Destination.split(":")[0]}</td>
        <td>{this.modificationOrDelete(index)}</td>
      </tr>
    ));
  }

  getNATRules = async () => {
    const token = getCookie("jwt_token");
    const response = await fetch("http://192.168.10.151:8081/firewall/chain/nat/PREROUTING/", {
      method: "GET",
      headers: { authorization: token },
    });
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      if (json.Chains) {
        this.setState({ NATRules: json.Chains });
      } else {
        this.setState({ NATRules: [] });
      }
    }
  };

  componentDidMount() {
    this.getNATRules();
    this.props.updateTitlePage("Firewall");
  }

  render() {
    return (
      <Container fluid className="tab-contain">
        <Row className="justify-content-center">
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>NAT / PAT</h2>
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
            <tbody>{this.displayNATRules()}</tbody>
          </Table>
        </Row>
        <Row className="add-del">
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
})(Firewall);
