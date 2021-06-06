import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

const initialState = {
  index: "",
  Hostname: "",
  TTL: "",
  RecordType: "",
  Answer: "",
};

export default class PopUpDHCP extends Component {
  state = initialState;

  handleHostnameUpdate = (Hostname) => {
    this.setState({ Hostname: Hostname.target.value });
  };

  handleTtlUpdate = (TTL) => {
    this.setState({ TTL: TTL.target.value });
  };

  handleTypeUpdate = (RecordType) => {
    this.setState({ RecordType: RecordType.target.value });
  };

  handleIpUpdate = (Answer) => {
    this.setState({ Answer: Answer.target.value });
  };

  prevPage = () => {
    if (this.state.index > 0) {
      console.log(this.state);
      this.setState({ index: this.state.index - 1 });
    }
  };

  nextPage = () => {
    if (this.state.index < this.props.DNSList.length - 1) {
      console.log(this.state);
      this.setState({ index: this.state.index + 1 });
    }
  };

  addDNS = () => {
    console.log(this.state);
    this.setState({ ...initialState });
    this.props.onHide();
  };

  componentDidUpdate(prevProps, prevState) {
    const { DNSList, indexDns } = this.props;
    const { index } = this.state;
    if (indexDns !== prevProps.indexDns) {
      this.setState({
        index: indexDns,
        Hostname: DNSList[indexDns].Hostname,
        TTL: DNSList[indexDns].TTL,
        RecordType: DNSList[indexDns].RecordType,
        Answer: DNSList[indexDns].Answer,
      });
    }
    if (index !== "" && index !== prevState.index) {
      this.setState({
        index: index,
        Hostname: DNSList[index].Hostname,
        TTL: DNSList[index].TTL,
        RecordType: DNSList[index].RecordType,
        Answer: DNSList[index].Answer,
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
          <h3 style={{ textAlign: "center", fontWeight: "lighter", marginBottom: "25px" }}> DNS </h3>
          <Table responsive>
            <tbody>
              <tr>
                <td className="data">IP</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.Answer} onChange={this.handleIpUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">hostname</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.Hostname} onChange={this.handleHostnameUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">ttl</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.TTL} onChange={this.handleTtlUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">type</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.RecordType} onChange={this.handleTypeUpdate} />
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
            <Button className="button-add" onClick={this.addDNS}>
              AJOUTER
            </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}