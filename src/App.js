import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/index";
import CreateBill from "./pages/CreateBill";
import Bill from "./pages/Bill";
import PDF from "./PDF";

const About = () => <h1>About</h1>;
const Post = () => <h1>Post</h1>;
const Project = () => <h1>Project</h1>;
const Errors = () => <h1>404</h1>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/bill" component={Bill} />
          <Route path="/pdf" component={PDF} />
          <Route path="/createbill" component={CreateBill} />
          <Route component={Errors} />
        </Switch>
      </div>
    );
  }
}

export default App;
