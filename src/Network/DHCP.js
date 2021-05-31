import React, { Component } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";

import { updateTitlePage } from "../redux/action.js";
import { dhcp } from "../Datas.js";
import "./DHCP.css";
import "../global.css";

class DHCP extends Component {
  state = {
    dhcpList: [],
    index: "-1",

  }

  getDhcpInfo() {
    this.setState({ dhcpList: dhcp });
  }

  componentDidMount() {
    this.props.updateTitlePage("DHCP");
    this.getDhcpInfo();
  }

  render() {
    return (
      <Container fluid style={{ marginTop: 100, backgroundColor: "#F2F3F5" }}>   
        <Row className="justify-content-center">
        <h2 style={{marginBottom:"20px"}}>Serveur DHCP</h2>
        <Table responsive className="table" style={{marginBottom:"25px", width:"40%"}}>
        {this.state.dhcpList.map((dhcp, index) => (
        <tbody key={dhcp.sous_reseau}>
              <tr>
                <td className="data" style={{backgroundColor:"#679ECB", color:"#FFFFFF"}}>Sous-réseau</td>
                <td className="user">{dhcp.sous_reseau}</td>
              </tr>
              <tr>
                <td className="data" style={{backgroundColor:"#679ECB", color:"#FFFFFF"}}>Masque</td>
                <td className="user">{dhcp.masque}</td>
              </tr>
              <tr>
                <td className="data" style={{backgroundColor:"#679ECB", color:"#FFFFFF"}}>IP début</td>
                <td className="user">{dhcp.ip_debut}</td>
              </tr>
              <tr>
                <td className="data" style={{backgroundColor:"#679ECB", color:"#FFFFFF"}}>IP fin</td>
                <td className="user">{dhcp.ip_fin}</td>
              </tr>
            </tbody>
            ))}
        </Table>
        </Row>    
        <Row className="justify-content-center">
        <h2 style={{marginBottom:"20px", textAlign:"center"}}>Baux DHCP</h2>
          <Table responsive className="table" style={{marginBottom:"25px"}}>
            <thead className="head">
              <tr>
                <th >IP</th>
                <th>HOSTNAME</th>
                <th className="tel">MAC</th>
                <th className="tel">START</th>
                <th className="tel">END</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
                
            </tbody>
          </Table>
        </Row>
        <Row className="justify-content-center">
        <h2 style={{marginBottom:"20px"}}>Baux DHCP statiques</h2>
          <Table responsive className="table">
            <thead className="head">
              <tr>
                <th >IP</th>
                <th>HOSTNAME</th>
                <th className="tel">MAC</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
                
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

export default connect(null, {
  updateTitlePage,
})(DHCP);
