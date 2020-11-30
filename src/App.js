import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import ViewAll from "./ViewAll/ViewAll";
import ViewFolder from "./ViewFolder/ViewFolder";
import ViewNote from "./ViewNote/ViewNote";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Header />
        <main className="App">
          <Route exact path={"/"} component={ViewAll} />
          <Route path="/folder/:folderId" component={ViewFolder} />
          <Route path="/note/:noteId" component={ViewNote} />
        </main>
      </Fragment>
    );
  }
}

export default App;
