import React from "react";
import { Route, Switch } from "react-router";
import Navigation from "./components/Navigation";
import Users from "./layouts/Users";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import User from "./components/Users/User";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId" component={User} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
}

export default App;
