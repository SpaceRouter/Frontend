import React, { Component } from "react";
import { Container, Table, Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { MdDelete /*MdAddCircle*/ } from "react-icons/md";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action";
import PopUpGroups from "./PopUpGroups";
import { groupsList, permissionsList } from "../Constants";
import "./Groups.css";
import "../global.css";

class Groups extends Component {
  state = {
    modalVisible: false,
    index: "",
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
    return groupsList.map((groupsList, index) => (
      <tr key={groupsList}>
        <td className="option option-blue">{groupsList}</td>
        <td style={{ textAlign: "left" }}>
          <OverlayTrigger placement={"right"} overlay={<Tooltip id={`tooltip`}>{permissionsList[index]}</Tooltip>}>
            {permissionsList[index].length > 2 ? (
              <Button className="permission-style">
                {permissionsList[index][0] + permissionsList[index][1] + permissionsList[index][2] + "etc."}
              </Button>
            ) : (
              <Button className="permission-style">{permissionsList[index]}</Button>
            )}
          </OverlayTrigger>
        </td>
        <td>{/*this.modifyOrDelete(index)*/}</td>
      </tr>
    ));
  }

  componentDidMount() {
    this.props.updateTitlePage("Groupes");
  }

  render() {
    return (
      <Container fluid className="tab-contain">
        <Row className="justify-content-center">
          <Table style={{ width: "55%" }}>
            <tbody>{this.displayGroupOptions()}</tbody>
          </Table>
        </Row>
        {/*<Row className="add-del">
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
          </Row>*/}
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(Groups);
