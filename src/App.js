import React, { Component } from "react";
import STORE from "./store";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...STORE,
    };
  }
  render() {
    return <div>App</div>;
  }
}

export default App;
