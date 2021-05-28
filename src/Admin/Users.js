import React, { Component } from "react";
import { Button, Container, Table, Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { connect } from "react-redux";

import { updateTitlePage, updateAuth } from "../redux/action.js";
import PopUpUsers from "./PopUpUsers.js";
import { users } from "../Datas.js";
import "./Users.css";

class Users extends Component {
  state = {
    modalVisible: false,
    usersList: [],
    index: "-1",
    delete: false,
  };

  modificationOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button border="none" style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => console.log(this.state.usersList[index])}>
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

          <PopUpUsers
            show={this.state.modalVisible}
            onHide={() => this.setState({ modalVisible: false })}
            usersList={this.state.usersList}
            indexUser={this.state.index}
          />
        </>
      );
    }
  }

  addButton() {
    return <PopUpUsers show={this.state.modalVisible} onHide={() => this.setState({ modalVisible: false })} />;
  }

  getUsersInfo() {
    this.setState({ usersList: users });
  }

  componentDidMount() {
    this.getUsersInfo();
  }

  render() {
    this.props.updateTitlePage("Utilisateurs");
    return (
      <Container fluid style={{ marginTop: 100, backgroundColor: "#F2F3F5" }}>
        <Row className="justify-content-md-center">
          <Table responsive className="table">
            <thead className="head">
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th className="tel">NOM</th>
                <th className="tel">PRENOM</th>
                <th className="tel">GROUPE</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.usersList.map((user, index) => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td className="tel">{user.firstName}</td>
                  <td className="tel">{user.lastName}</td>
                  <td className="tel">
                    <Button variant="outline-dark" disabled>
                      {user.group}
                    </Button>
                  </td>
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

          <Button className="button button2" onClick={() => this.props.updateAuth(false)}>
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
  updateAuth,
})(Users);
