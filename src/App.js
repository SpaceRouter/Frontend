import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import Navigation from "./Navigation";
import Auth from "./Auth";
import Home from "./Home";
import Users from "./Admin/Users";
import Groups from "./Admin/Groups";
import DHCP from "./Network/DHCP";
import DNS from "./Network/DNS";
import Firewall from "./Network/Firewall";
import Marketplace from "./Services/Marketplace";
import AppsInstalled from "./Services/AppsInstalled";
import "./App.css";

class App extends Component {
  isAuthentificated() {
    const cookies = new Cookies();
    if (cookies.get("jwt_token")) {
      return true;
    } else return true; //false
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth) {
      this.isAuthentificated();
    }
  }

  render() {
    return (
      <Router>
        <Route path="/auth" component={Auth} />

        {this.isAuthentificated() ? (
          <div className={"top " + (this.props.isOpenSideBar ? "side" : "")}>
            <Route exact path="/">
              <Navigation />
              <Home />
            </Route>

            <Route exact path="/users">
              <Navigation />
              <Users />
            </Route>
            <Route exact path="/groups">
              <Navigation />
              <Groups />
            </Route>

            <Route exact path="/dhcp">
              <Navigation />
              <DHCP />
            </Route>
            <Route exact path="/dns">
              <Navigation />
              <DNS />
            </Route>
            <Route exact path="/firewall">
              <Navigation />
              <Firewall />
            </Route>

            <Route exact path="/marketplace">
              <Navigation />
              <Marketplace />
            </Route>
            <Route exact path="/appsinstalled">
              <Navigation />
              <AppsInstalled />
            </Route>
          </div>
        ) : (
          <Redirect to="/auth" />
        )}
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpenSideBar: state.isOpenSideBar,
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
