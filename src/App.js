import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import withAuth from "./AuthenticateRoute.js";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Meals from "./components/Meals/Meals";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/meals" component={withAuth(Meals)} />
      </Switch>
    );
  }
}

export default App;
