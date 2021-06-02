import React, { Component } from "react";
import { Container, Row, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { MdDelete, MdAddCircle } from "react-icons/md";
import { FaPen } from "react-icons/fa";

import { updateTitlePage } from "../redux/action.js";
import PopUpDHCP from "./PopUpDHCP.js";
import { dhcp, baux_dhcp, baux_dhcp_static } from "../Datas.js";
import "./DHCP.css";
import "../global.css";

class DHCP extends Component {
  state = {
    modalVisible: false,
    dhcpList: [],
    index: "-1",
    baux_dhcpList: [],
    baux_dhcp_staticList: [],
  }

  modificationOrDelete(index) {
    if (this.state.delete) {
      return (
        <Button border="none" style={{ backgroundColor: "#FFFFFF", border: "none" }} onClick={() => console.log(this.state.baux_dhcp_staticList[index])}>
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

          <PopUpDHCP
            show={this.state.modalVisible}
            onHide={() => this.setState({ modalVisible: false })}
            baux_dhcp_staticList={this.state.baux_dhcp_staticList}
            indexBauxDHCPStatic={this.state.index}
          />
        </>
      );
    }
  }

  addButton() {
    return <PopUpDHCP show={this.state.modalVisible} onHide={() => this.setState({ modalVisible: false })} />;
  }

  getDhcpInfo() {
    this.setState({ dhcpList: dhcp });
  }

  getBauxDhcpInfo() {
    this.setState({ baux_dhcpList: baux_dhcp });
  }

  getBauxDhcpStaticInfo() {
    this.setState({ baux_dhcp_staticList: baux_dhcp_static });
  }

  componentDidMount() {
    this.props.updateTitlePage("DHCP");
    this.getDhcpInfo();
    this.getBauxDhcpInfo();
    this.getBauxDhcpStaticInfo();
  }

  render() {
    return (
      <Container fluid style={{ marginTop: 100, backgroundColor: "#F2F3F5" }}>   
        <Row className="justify-content-center">
        <h2 style={{marginBottom:"20px"}}>Serveur DHCP</h2>
        <Table responsive className="table" style={{marginBottom:"100px", width:"40%"}}>
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
          <Table responsive className="table" style={{marginBottom:"100px"}}>
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
                {this.state.baux_dhcpList.map((baux_dhcp, index) => (
                  <tr key={baux_dhcp.ip}>
                    <td>{baux_dhcp.ip}</td>
                    <td>{baux_dhcp.hostname}</td>
                    <td className="tel">{baux_dhcp.mac}</td>
                    <td className="tel">{baux_dhcp.starts}</td>
                    <td className="tel">{baux_dhcp.ends}</td>
                    <td></td>
                  </tr>
                ))}
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
                {this.state.baux_dhcp_staticList.map((baux_dhcp_static, index) => (
                  <tr key={baux_dhcp_static.ip}>
                    <td>{baux_dhcp_static.ip}</td>
                    <td>{baux_dhcp_static.hostname}</td>
                    <td className="tel">{baux_dhcp_static.mac}</td>
                    <td>{this.modificationOrDelete(index)}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
        <Row style={{ marginTop: 25, justifyContent: "flex-end", marginRight: "23%", marginBottom: "100px" }}>
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
})(DHCP);
