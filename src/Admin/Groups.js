import React, { Component } from "react";
import { Container, Table, Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import PopUpGroups from "./PopUpGroups.js";
import { groupsList, permissionsList } from "../Datas.js";
import "./Groups.css";
import "../global.css";

class Groups extends Component {
  state = {
    modalVisible: false,
    index: "", 
    permissionsList: [],
    delete: false,
  };

  modifyOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button className="pen-button" onClick={() => console.log(this.state.permissionsList[index])}>
          <MdDelete className="modification" size="20px" />
        </Button>
      );
    } else {
      return (
        <>
          <Button className="pen-button" onClick={() => this.setState({ modalVisible: true, index: index })}>
            <FaPen className="modification" size="15px" />
          </Button>

          <PopUpGroups
            show={this.state.modalVisible}
            onHide={() => this.setState({ modalVisible: false, index: "" })}
            permissionsList={this.state.permissionsList}
            indexPermission={this.state.index}
          />
        </>
      );
    }
  }

  addButton() {
    return (
      <PopUpGroups
        show={this.state.modalVisible}
        onHide={() => this.setState({ modalVisible: false, index: "" })}
        permissionsList={this.state.permissionsList}
        indexPermission={this.state.index}
      />
    );
  }

  displayGroupOptions() {
    if ( permissionsList.length > 3) {
      return groupsList.map((groupsList, index) => (
        <tr key={groupsList}>
          <td className="option option-blue">
            {groupsList}
          </td>
          <td style={{ textAlign: "left" }}>
            <OverlayTrigger placement={"right"} overlay={ <Tooltip id={`tooltip`}>{permissionsList} </Tooltip> }>
              <Button className="permission-style">{permissionsList[0]}, {permissionsList[1]}, {permissionsList[2]}, ...</Button>
            </OverlayTrigger></td>
          <td>{this.modifyOrDelete(index)}</td>
        </tr>
      ));
    } else {
      return groupsList.map((groupsList, index) => (
        <tr key={groupsList}>
          <td className="option option-blue">
            {groupsList}
          </td>
          <td style={{ textAlign: "left" }}>
            <OverlayTrigger placement={"right"} overlay={ <Tooltip id={`tooltip`}>{permissionsList} </Tooltip>}>
              <Button className="permission-style">{permissionsList} </Button>
            </OverlayTrigger></td>
          <td>{this.modifyOrDelete(index)}</td>
        </tr>
      ));
    }
  }

  getGroupsInfo() {
    this.setState({ permissionsList });
  }

  componentDidMount() {
    this.props.updateTitlePage("Groupes");
    this.getGroupsInfo();
  }

  render() {
    return (
      <Container fluid className="tab-contain">
        <Row className="justify-content-center">
          <Table style={{ width: "55%" }}>
            <tbody>{this.displayGroupOptions()}</tbody>
          </Table>
        </Row>
        <Row className="add-del">
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
})(Groups);
