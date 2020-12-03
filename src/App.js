import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header/Header";
import ViewFolder from "./ViewFolder/ViewFolder";
import ViewNote from "./ViewNote/ViewNote";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="App">
          <Route exact path={"/"} component={ViewFolder} />
          <Route path="/folder/:folderId" component={ViewFolder} />
          <Route path="/note/:noteId" component={ViewNote} />
        </main>
      </>
    );
  }
}

export default App;
