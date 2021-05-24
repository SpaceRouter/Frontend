import React, { Component } from "react";
import { Table, Modal, Pagination, Button } from "react-bootstrap";

import "./PopUpUsers.css";

export default class PopUpUsers extends Component {
    state = {
        listUsers : this.props.users,
        page : this.props.nbuser,
    }
    
    render(){
        const {listUsers, page } = this.state; 
        return (
      <Modal
        {...this.props}
        size="576px"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
            <h3 style={{textAlign:"center", fontWeight:"lighter", marginBottom:"25px"}}> Utilisateur </h3>
        <Table responsive>
              <tbody>
                <tr style={{borderWidth:0}}>
                  <td className="data">ID</td>
                  <td> </td>
                  <td className="user">{listUsers[page].id}</td>
                </tr>
                <tr>
                  <td className="data">EMAIL</td>
                  <td> </td>
                  <td className="user">{listUsers[page].email}</td>
                </tr>
                <tr>
                  <td className="data">NOM</td>
                  <td> </td>
                  <td className="user">{listUsers[page].nom}</td>
                </tr>
                <tr>
                  <td className="data">PRENOM</td>
                  <td> </td>
                  <td className="user">{listUsers[page].prenom}</td>
                </tr>
                <tr>
                  <td className="data">GROUPES</td>
                  <td></td>
                  <td className="user"><Button variant="outline-dark" disabled>{listUsers[page].groupes}</Button></td>
                </tr>
              </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={() => this.setState({page: page-1})}/>
            <Pagination.Next onClick={() => this.setState({page: page+1})}/>
          </Pagination> 
        </Modal.Body>
      </Modal>
    );
}
}