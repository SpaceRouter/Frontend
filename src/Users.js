import React, { Component } from "react";
import { Button, Container, Table, Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { MdDelete, MdAddCircle } from "react-icons/md";

import PopUpUsers from "./PopUpUsers.js"
import {users} from "./Datas.js";
import "./Users.css";

export default class Users extends Component {
  state = {
    modalVisible: false,
    usersFromServers: [],
  }

  modal(index){
    return (
      <>
        <Button border="none" style={{backgroundColor:"#FFFFFF", border:"none"}} onClick={() => this.setState({modalVisible: true})}> 
          <FaPen className="modification" size="15px" />
        </Button>
  
        <PopUpUsers
          show={this.state.modalVisible}
          onHide={() => this.setState({modalVisible: false})}
          users={this.state.usersFromServers}
          nbuser={index}
        />
      </>
    );
  }
  
  getUsersInfo() {
    this.setState({usersFromServers: users});
  }

  componentDidMount(){
    this.getUsersInfo();
  }

    render() {
        return(
        <Container fluid style={{ marginTop:"50px", backgroundColor:"#F2F3F5"}}>
        <Row className="justify-content-md-center">
        <Table responsive className="table">
            <thead className="head">
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th className="tel">NOM</th>
                <th className="tel">PRENOM</th>
                <th className="tel">GROUPES</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.usersFromServers.map((user, index) => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td className="tel">{user.nom}</td>
                <td className="tel">{user.prenom}</td>
                <td className="tel"><Button variant="outline-dark" disabled>{user.groupes}</Button></td>
                <td>{this.modal(index)}</td>
              </tr>
              ))}
            </tbody>
        </Table>
        </Row>
        <Row style={{marginTop: 25, justifyContent:"flex-end", marginRight: "23%" }}>

            <Button type="submit" className="bttn btn1" >
              <MdAddCircle size="20px" className="add"/>  
                AJOUTER
            </Button>

            <Button type="submit" className="bttn btn2" >
              <MdDelete size="20px" className="delete"/>
                SUPPRIMER
            </Button>

        </Row>
        </Container>
        );
    }
}