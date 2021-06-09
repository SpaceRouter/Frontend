import React, { Component } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";

import { updateTitlePage } from "../redux/action.js";
import PopUpFirewall from "./PopUpFirewall.js";
import "./Firewall.css";
import "../global.css";

class Firewall extends Component {
  state = {
    modalVisible: false,
    NATRules: [],
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

  displayNATRules() {
    return this.state.NATRules.map((NAT, index) => (
      <tr key={NAT.Destination}>
        <td className="tel"><Button variant="outline-dark" disabled>
          {NAT.Protocol}
        </Button></td>
        <td>{NAT.DestinationPort}</td>
        <td className="tel">{NAT.Destination.split(":")[0]}</td>
        <td>{NAT.Destination.split(":")[1]}</td>
        <td>{this.modificationOrDelete(index)}</td>
      </tr>
    ))
  }

  getNATRules = async () => {
    const cookies = new Cookies();
    const token = cookies.get("jwt_token");
    const response = await fetch("http://192.168.10.151:8081/chain/nat/PREROUTING/", {
      method: "GET",
      headers: { "content-type": "application/json", authorization: token },
    });
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      this.setState({ NATRules: json.Chains });
    }
  };

  componentDidMount() {
    this.getNATRules();
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
                {this.displayNATRules()}
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
