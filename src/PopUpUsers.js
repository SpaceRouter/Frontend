import React, { Component } from "react";
import { Table, Modal, Pagination, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { updateIndexUser } from "./redux/action.js";
import "./PopUpUsers.css";

class PopUpUsers extends Component {
  prevPage = () => {
    if (this.props.indexUser > 0) {
      this.props.updateIndexUser(this.props.indexUser - 1);
    }
  };

  nextPage = () => {
    if (this.props.indexUser < this.props.users.length - 1) {
      this.props.updateIndexUser(this.props.indexUser + 1);
    }
  };

  render() {
    const { users, indexUser } = this.props;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} size="576px" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <h3 style={{ textAlign: "center", fontWeight: "lighter", marginBottom: "25px" }}> Utilisateur </h3>
          <Table responsive>
            <tbody>
              <tr style={{ borderWidth: 0 }}>
                <td className="data">ID</td>
                <td> </td>
                <td className="user">{users[indexUser].id}</td>
              </tr>
              <tr>
                <td className="data">EMAIL</td>
                <td> </td>
                <td className="user">{users[indexUser].email}</td>
              </tr>
              <tr>
                <td className="data">NOM</td>
                <td> </td>
                <td className="user">{users[indexUser].nom}</td>
              </tr>
              <tr>
                <td className="data">PRENOM</td>
                <td> </td>
                <td className="user">{users[indexUser].prenom}</td>
              </tr>
              <tr>
                <td className="data">GROUPES</td>
                <td></td>
                <td className="user">
                  <Button variant="outline-dark" disabled>
                    {users[indexUser].groupes}
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={this.prevPage} />
            <Pagination.Next className="next-arrow" onClick={this.nextPage} />
          </Pagination>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  indexUser: state.indexUser,
  users: state.users,
});

export default connect(mapStateToProps, {
  updateIndexUser,
})(PopUpUsers);
