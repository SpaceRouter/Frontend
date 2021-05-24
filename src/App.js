import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Navigation from "./Navigation";
import Home from "./Home";
import Auth from "./Auth";
import Users from "./Users";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/auth" component={Auth} />
        <div className={"top " + (this.props.isOpenSideBar ? "side" : "")}>
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpenSideBar: state.isOpenSideBar,
});

export default connect(mapStateToProps)(App);