import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

import { domainName, DNS_records_supported} from "../Constants"

const initialState = {
  index: "",
  answer: "",
  hostname: "",
  recordType: "A",
  ttl: "",
};

export default class PopUpDNS extends Component {
  state = initialState;

  handleIpUpdate = (answer) => {
    this.setState({ answer: answer.target.value });
  };

  handleHostnameUpdate = (hostname) => {
    this.setState({ hostname: hostname.target.value });
  };

  handleTypeUpdate = (recordType) => {
    this.setState({ recordType: recordType.target.value });
  };

  handleTtlUpdate = (ttl) => {
    this.setState({ ttl: ttl.target.value });
  };

  prevPage = () => {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1 });
    }
  };

  nextPage = () => {
    if (this.state.index < this.props.DNSList.length - 1) {
      this.setState({ index: this.state.index + 1 });
    }
  };

  addDns = async () => {
    const response = await fetch(`${domainName}/add`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Answer: this.state.answer,
        Hostname: this.state.hostname + ".opengate.lan",
        RecordType: this.state.recordType,
        TTL: this.state.ttl,
      }),
    });
    if (response.status === 200) {
      this.props.onHide();
    }
  };

  modifyDns = async () => {
    await fetch(`${domainName}/update`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        Answer: this.state.answer,
        Hostname: this.state.hostname + ".opengate.lan",
        RecordType: this.state.recordType,
        TTL: this.state.ttl,
      }),
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { DNSList, indexDns } = this.props;
    const { index } = this.state;
    if (indexDns !== "" && indexDns !== prevProps.indexDns) {
      this.setState({
        index: indexDns,
        hostname: DNSList[indexDns].Hostname,
        ttl: DNSList[indexDns].TTL,
        recordType: DNSList[indexDns].RecordType,
        answer: DNSList[indexDns].Answer,
      });
    }
    if (index !== "" && index !== prevState.index) {
      const response = await fetch(`${domainName}/zone`);
      let json = await response.json();
      if (response.status === 200) {
        this.setState({
          hostname: json["opengate.lan."][index].Hostname,
          ttl: json["opengate.lan."][index].TTL,
          recordType: json["opengate.lan."][index].RecordType,
          answer: json["opengate.lan."][index].Answer,
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
          <h3 className="modal-title"> DNS </h3>
          <Table responsive>
            <tbody>
              <tr>
                <td className="option">IP</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.answer} onChange={this.handleIpUpdate} />
                </td>
              </tr>
              <tr>
                <td className="option">Hostname</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control
                    style={{ width: "auto" }}
                    disabled={this.state.index !== ""}
                    type="text"
                    value={this.state.hostname}
                    onChange={this.handleHostnameUpdate}
                  />
                </td>
              </tr>
              <tr>
                <td className="option">TTL</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.ttl} onChange={this.handleTtlUpdate} />
                </td>
              </tr>
              <tr>
                <td className="option">Type</td>
                <td> </td>
                <td className="option-value">
                  <Form.Control as="select" value={this.state.recordType} onChange={this.handleTypeUpdate}>
                    {DNS_records_supported.map((recordType) => (
                      <option key={recordType}>{recordType}</option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
            </tbody>
          </Table>
          {this.state.index !== "" && (
            <Pagination className="arrow">
              <Pagination.Prev onClick={this.prevPage} />
              <Button className="button-validate" onClick={this.modifyDns}>
                VALIDER
              </Button>
              <Pagination.Next className="next-arrow" onClick={this.nextPage} />
            </Pagination>
          )}
          {this.state.index === "" && (
            <div className="button-center">
              <Button className="button-add" onClick={this.addDns}>
                AJOUTER
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}
