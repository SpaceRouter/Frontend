import React, { Component } from "react";
import { Container, Table, Row, Button } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import { groupsList } from "../Datas.js";
import "./Groups.css";
import "../global.css";

class Groups extends Component {
  state = {
    index: "", 
    delete: false,
  };

  componentDidMount() {
    this.props.updateTitlePage("Groupes");
  }

  modificationOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => console.log(this.state.usersList[index])}>
          <MdDelete className="modification" size="20px" />
        </Button>
      );
    } else {
      return (
        <>
          <Button style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => this.setState({ modalVisible: true, index: index })}>
            <FaPen className="modification" size="15px" />
          </Button>
        </>
      );
    }
  }

  displayGroupOptions() {
    return groupsList.map((groupsList, index) => (
      <tr key={groupsList}>
        <td className="data" style={{ backgroundColor: "#679ECB", color: "#FFFFFF", width: "50%" }}>
          {groupsList}
        </td>
        <td style={{ textAlign: "left" }}>permission1, permission2, permission3, ...</td>
        <td>{this.modificationOrDelete(index)}</td>
      </tr>
    ));
  }

  render() {
    return (
      <Container fluid style={{ marginTop: 100, backgroundColor: "#F2F3F5" }}>
        <Row className="justify-content-center">
          <Table>
            <tbody>{this.displayGroupOptions()}</tbody>
          </Table>
        </Row>
        <Row style={{ marginTop: 25, justifyContent: "flex-end", marginRight: "23%" }}>
          <Button
            className="button button1"
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
})(Groups);
