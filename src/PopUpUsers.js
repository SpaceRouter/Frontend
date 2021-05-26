import React, { Component } from "react";
import { Table, Modal, Pagination, Form, Button } from "react-bootstrap";

import { groupsList } from "./Datas.js";
import "./PopUpUsers.css";

const initialState = {
  index: "",
  username: "",
  email: "",
  lastName: "",
  firstName: "",
  group: "ADMIN",
};

export default class PopUpUsers extends Component {
  state = initialState;

  handleUsernameUpdate = (username) => {
    this.setState({ username: username.target.value });
  };

  handleEmailUpdate = (email) => {
    this.setState({ email: email.target.value });
  };

  handleFirstNameUpdate = (firstName) => {
    this.setState({ firstName: firstName.target.value });
  };

  handleLastNameUpdate = (lastName) => {
    this.setState({ lastName: lastName.target.value });
  };

  handleGroupUpdate = (group) => {
    this.setState({ group: group.target.value });
  };

  prevPage = () => {
    if (this.state.index > 0) {
      console.log(this.state);
      this.setState({ index: this.state.index - 1 });
    }
  };

  nextPage = () => {
    if (this.state.index < this.props.usersList.length - 1) {
      console.log(this.state);
      this.setState({ index: this.state.index + 1 });
    }
  };

  addUser = () => {
    console.log(this.state);
    this.setState({ ...initialState });
    this.props.onHide();
  };

  componentDidUpdate(prevProps, prevState) {
    const { usersList, indexUser } = this.props;
    const { index } = this.state;
    if (indexUser !== prevProps.indexUser) {
      this.setState({
        index: indexUser,
        username: usersList[indexUser].username,
        email: usersList[indexUser].email,
        firstName: usersList[indexUser].firstName,
        lastName: usersList[indexUser].lastName,
        group: usersList[indexUser].group,
      });
    }
    if (index !== "" && index !== prevState.index) {
      this.setState({
        index: index,
        username: usersList[index].username,
        email: usersList[index].email,
        firstName: usersList[index].firstName,
        lastName: usersList[index].lastName,
        group: usersList[index].group,
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
          <h3 style={{ textAlign: "center", fontWeight: "lighter", marginBottom: "25px" }}> Utilisateur </h3>
          <Table responsive>
            <tbody>
              <tr>
                <td className="data">ID</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.username} onChange={this.handleUsernameUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">EMAIL</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.email} onChange={this.handleEmailUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">PRENOM</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.firstName} onChange={this.handleFirstNameUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">NOM</td>
                <td> </td>
                <td className="user">
                  <Form.Control style={{ width: "auto" }} type="text" value={this.state.lastName} onChange={this.handleLastNameUpdate} />
                </td>
              </tr>
              <tr>
                <td className="data">GROUPES</td>
                <td></td>
                <td className="user">
                  <Form.Control as="select" value={this.state.group} onChange={this.handleGroupUpdate}>
                    {groupsList.map((group) => (
                      <option key={group}>{group}</option>
                    ))}
                  </Form.Control>
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
            <Button className="button-add" onClick={this.addUser}>
              AJOUTER
            </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}
