import React, { Component } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";

import { updateTitlePage } from "../redux/action.js";
import PopUpDNS from "./PopUpDNS.js";
import "./DNS.css";
import "../global.css";
import { dns } from "../Datas.js";

class DNS extends Component {
  state = {
    modalVisible: false,
    DNSList: [],
    index: "-1",
    delete: false,
  }

  modificationOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button border="none" style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => console.log(this.state.DNSList[index])}>
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

          <PopUpDNS
            show={this.state.modalVisible}
            onHide={() => this.setState({ modalVisible: false })}
            DNSList={this.state.DNSList}
            indexDns={this.state.index}
          />
        </>
      );
    }
  }

  addButton() {
    return <PopUpDNS show={this.state.modalVisible} onHide={() => this.setState({ modalVisible: false })} />;
  }

  getDNSInfo() {
    this.setState({ DNSList: dns });
  }

  componentDidMount() {
    this.getDNSInfo();
    this.props.updateTitlePage("DNS");
  }

  render() {
    return (
      <Container fluid style={{ marginTop: 100, backgroundColor: "#F2F3F5" }}>       
        <Row className="justify-content-center">
        <h2 style={{marginBottom:"20px", textAlign:"center"}}>DNS</h2>
          <Table responsive className="table">
            <thead className="head">
              <tr>
                <th className="tel">IP</th>
                <th>HOSTNAME</th>
                <th>TTL</th>
                <th>TYPE</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
                {this.state.DNSList.map((dns, index) => (
                  <tr key={dns.Hostname}>
                    <td>{dns.Answer}</td>
                    <td>{dns.Hostname}</td>
                    <td>{dns.TTL}</td>
                    <td  className="tel">{dns.RecordType}</td>
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
})(DNS);
