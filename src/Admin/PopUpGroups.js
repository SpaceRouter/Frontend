import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

import { groupsList, permissionsList } from "../Datas.js";
import "../PopUp.css";

const initialState = {
  index: "",
  permissions: [],
};

export default class PopUpGroups extends Component {
  state = initialState;

  handlePermissionsUpdate = (permission) => {
    if (this.state.permissions.includes(permission.target.value)) {
      this.setState({
        permissions: this.state.permissions.filter(function (ele) {
          return ele !== permission.target.value;
        }),
      });
    } else {
      this.setState({ permissions: [...this.state.permissions, permission.target.value] });
    }
  };

  prevPage = () => {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1, permissions: [] });
    }
  };

  nextPage = () => {
    if (this.state.index < this.props.permissionsList.length - 1) {
      this.setState({ index: this.state.index + 1, permissions: [] });
    }
  };

  addGroups = () => {
    console.log(this.state);
    this.setState({ ...initialState });
    this.props.onHide();
  };

  modifyGroups = async () => {
    console.log(this.state.permissions);
  };

  componentDidUpdate(prevProps, prevState) {
    const { indexPermission } = this.props;
    const { index } = this.state;
    if (indexPermission !== "" && indexPermission !== prevProps.indexPermission) {
      this.setState({
        index: indexPermission,
      });
    }
    if (index !== "" && index !== prevState.index) {
      this.setState({
        index: index,
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
          <h3 className="modal-title"> {groupsList[this.state.index]} </h3>
          <Table responsive>
            <tbody>
              <tr>
                <td className="option">PERMISSION</td>
                <td></td>
                <td className="option-value">
                  <Form.Control
                    as="select"
                    multiple
                    style={{ width: "150px" }}
                    value={this.state.permissions}
                    onChange={this.handlePermissionsUpdate}
                  >
                    {permissionsList.map((permission) => (
                      <option key={permission}>{permission}</option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
            </tbody>
          </Table>
          {this.state.index !== "" && (
            <Pagination className="arrow">
              <Pagination.Prev onClick={this.prevPage} />
              <Button className="button-validate" onClick={this.modifyGroups}>
                VALIDER
              </Button>
              <Pagination.Next className="next-arrow" onClick={this.nextPage} />
            </Pagination>
          )}
          {this.state.index === "" && (
            <div className="button-center">
              <Button className="button-add" onClick={this.addGroups}>
                AJOUTER
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}
