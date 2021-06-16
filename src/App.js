import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
import MarketplaceDetails from "./Services/MarketplaceDetails";
import AppsInstalled from "./Services/AppsInstalled";
import AppsInstalledDetails from "./Services/AppsInstalledDetails";
import { getCookie } from "./Cookies";
import "./App.css";

class App extends Component {
  isAuthentificated() {
    if (getCookie("jwt_token")) {
      return true;
    } else return false; //false
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
            <Navigation />
            <Route exact path="/" component={Home} />

            <Route exact path="/users" component={Users} />
            <Route exact path="/groups" component={Groups} />

            <Route exact path="/dhcp" component={DHCP} />
            <Route exact path="/dns" component={DNS} />
            <Route exact path="/firewall" component={Firewall} />

            <Route exact path="/marketplace" component={Marketplace} />
            <Route exact path="/marketplace-details" component={MarketplaceDetails} />
            <Route exact path="/appsinstalled" component={AppsInstalled} />
            <Route exact path="/appsinstalled-details" component={AppsInstalledDetails} />
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
