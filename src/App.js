import React from "react";
import { Route, Switch } from "react-router";
import Navigation from "./components/Navigation";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import UsersLayout from "./layouts/UsersLayout";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={UsersLayout} />
      </Switch>
    </>
  );
}

export default App;
