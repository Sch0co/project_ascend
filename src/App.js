// import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import React from "react";
import Main from "./view/Main/";
import Init from "./view/Init/index";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Init} />
      <Route exact path="/main" component={Main} />
      {/* <LoginForm /> */}
    </Switch>
  );
}

export default App;
