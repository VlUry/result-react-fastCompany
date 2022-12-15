import React from "react";
import { Route, Switch } from "react-router";
import Navigation from "./components/Navigation";
import Users from "./layouts/Users";
import Login from "./layouts/Login";
import Main from "./layouts/Main";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}

export default App;
