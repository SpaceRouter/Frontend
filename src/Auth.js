import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { connect } from "react-redux";

import { updateAuth } from "./redux/action.js";
import "./Auth.css";

class Auth extends Component {
  state = {
    username: "",
    password: "",
  };

  handleUsernameUpdate = (username) => {
    this.setState({ username: username.target.value });
  };

  handlePasswordUpdate = (password) => {
    this.setState({ password: password.target.value });
  };

  handleSubmit = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        login: this.state.username,
        password: this.state.password,
      }),
    });
    let json = await response.json();
    if (response.status === 200 && json.Ok) {
      this.props.updateAuth(true);
    }
  };

  render() {
    return (
      <Form className="form">
        {/*Icon user*/}
        <FaUser className="icon" size="100px" />

        {/*Text input username*/}
        <Form.Group style={{ width: 300 }}>
          <Form.Control type="text" placeholder="Nom d'utilisateur" value={this.state.username} onChange={this.handleUsernameUpdate} />
        </Form.Group>

        {/*Text input password*/}
        <Form.Group style={{ width: 300 }}>
          <Form.Control type="password" placeholder="Mot de passe" value={this.state.password} onChange={this.handlePasswordUpdate} />
        </Form.Group>

        {/*Connection button*/}
        <Button style={{ width: 175, backgroundColor: "#679ecb", border: "none" }} onClick={this.handleSubmit}>
          Connexion
        </Button>
        {this.props.auth && < Redirect to="/" />}
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateAuth })(Auth);