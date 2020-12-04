import React, { Component } from "react";
import { Route } from "react-router-dom";
import NotefulContext from "./NotefulContext";
import Header from "./Header/Header";
import ViewFolder from "./ViewFolder/ViewFolder";
import ViewNote from "./ViewNote/ViewNote";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: null,
    };
  }

  componentDidMount() {
    const foldersUrl = "http://localhost:9090/folders/";
    const notesUrl = "http://localhost:9090/notes/";

    Promise.all([fetch(foldersUrl), fetch(notesUrl)])
      .then(([foldersRes, notesRes]) => {
        return Promise.all([foldersRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({
          folders,
          notes,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
    };
    return (
      <>
        <Header />
        <main className="App">
          <NotefulContext.Provider value={contextValue}>
            <Route exact path={"/"} component={ViewFolder} />
            <Route path="/folder/:folderId" component={ViewFolder} />
            <Route path="/note/:noteId" component={ViewNote} />
          </NotefulContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
