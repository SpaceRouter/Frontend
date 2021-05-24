import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import Navigation from "./Navigation";
import Home from "./Home";
import Auth from "./Auth";
import Users from "./Users";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/auth" component={Auth} />
        <div className={"top " + (this.props.isOpenSideBar ? "side" : "")}>
          <Route exact path="/">
            <Navigation />
            <Home />{" "}
          </Route>
          <Route exact path="/users">
            <Navigation />
            <Users />{" "}
          </Route>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpenSideBar: state.isOpenSideBar,
});

export default connect(mapStateToProps)(App);
