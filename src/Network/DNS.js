import React, { Component } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";

import { updateTitlePage } from "../redux/action.js";
import PopUpDNS from "./PopUpDNS.js";
import { DNS_records } from "../Constants";
import "./DNS.css";
import "../global.css";

class DNS extends Component {
  state = {
    modalVisible: false,
    DNSList: [],
    index: "bt",
    delete: false,
    reload: "",
  };

  modificationOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button border="none" className="pen-button" onClick={() => this.deleteDns(this.state.DNSList[index])}>
          <MdDelete className="modification" size="20px" />
        </Button>
      );
    } else {
      return (
        <>
          <Button
            border="none"
            className="pen-button"
            onClick={() => this.setState({ modalVisible: true, index: index })}
          >
            <FaPen className="modification" size="15px" />
          </Button>

          <PopUpDNS
            show={this.state.modalVisible}
            onHide={() => {
              this.getDNSInfo();
              this.setState({ modalVisible: false, index: "" });
            }}
            DNSList={this.state.DNSList}
            indexDns={this.state.index}
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

        <PopUpDNS
          show={this.state.modalVisible}
          onHide={() => {
            this.getDNSInfo();
            this.setState({ modalVisible: false, index: "" });
          }}
          DNSList={this.state.DNSList}
          indexDns={this.state.index}
        />
      </>
    );
  }

  deleteDns = async (DNSInfos) => {
    const response = await fetch("http://192.168.10.151:8090/delete", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Answer: DNSInfos.Answer,
        Hostname: DNSInfos.Hostname + ".opengate.lan",
        RecordType: DNS_records[DNSInfos.RecordType],
      }),
    });
    if (response.status === 200) {
      this.getDNSInfo();
    }
  };

  titleDns() {
    return (
      <Col>
        <Row className="justify-content-center">
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>DNS </h2>
          <AiOutlineReload size="30px" className="reload" onClick={this.reload} />
        </Row>

        {this.state.reload === "ok" && (
          <Alert className="reloadDNS" variant="success">
            Rechargement effectué avec succès.
          </Alert>
        )}
        {this.state.reload === "error" && (
          <Alert className="reloadDNS" variant="danger">
            Erreur lors du rechargement.
          </Alert>
        )}
      </Col>
    );
  }

  reload = async () => {
    const response = await fetch("http://192.168.10.151:8090/zone");
    let json = await response.json();
    if (response.status === 200) {
      this.setState({ DNSList: json["opengate.lan."], reload: "ok" }, () => {
        setTimeout(() => {
          this.setState({ reload: "" });
        }, 2000);
      });
    } else {
      this.setState({ reload: "error" }, () => {
        setTimeout(() => {
          this.setState({ reload: "" });
        }, 2000);
      });
    }
  };

  getDNSInfo = async () => {
    const response = await fetch("http://192.168.10.151:8090/zone");
    let json = await response.json();
    if (response.status === 200) {
      this.setState({ DNSList: json["opengate.lan."] });
    }
  };

  componentDidMount() {
    this.getDNSInfo();
    this.props.updateTitlePage("DNS");
  }

  render() {
    return (
      <Container fluid className="tab-contain">
        <Row className="justify-content-center">
          {this.titleDns()}
          <Table responsive className="table">
            <thead className="head">
              <tr>
                <th>HOSTNAME</th>
                <th>IP</th>
                <th className="tel">TYPE</th>
                <th>TTL</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.DNSList.map((dns, index) => (
                <tr key={dns.Hostname}>
                  <td>{dns.Hostname}</td>
                  <td>{dns.Answer}</td>
                  <td className="tel">{DNS_records[dns.RecordType]}</td>
                  <td>{dns.TTL}</td>
                  <td>{this.modificationOrDelete(index)}</td>
                </tr>
              ))}
            </tbody>
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
})(DNS);
