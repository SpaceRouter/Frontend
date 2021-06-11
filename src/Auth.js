import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { connect } from "react-redux";

import { updateAuth } from "./redux/action.js";
import { setCookie } from "./Cookies";
import "./Auth.css";

class Auth extends Component {
  state = {
    username: "",
    password: "",
    error: false,
  };

  handleUsernameUpdate = (username) => {
    this.setState({ username: username.target.value });
  };

  handlePasswordUpdate = (password) => {
    this.setState({ password: password.target.value });
  };

  handleSubmit = async () => {
    const response = await fetch("http://192.168.10.151:8085/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        login: this.state.username,
        password: this.state.password,
      }),
    });
    let json = await response.json();
    if (response.status === 200 && json.ok) {
      setCookie("jwt_token", json.token);
      this.props.updateAuth(1);
      this.props.history.push("/");
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <Form className="auth">
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

        {this.state.error && (
          <Alert className="error" variant="danger">
            Identifiants non corrects.
          </Alert>
        )}
      </Form>
    );
  }
}

export default connect(null, { updateAuth })(Auth);
