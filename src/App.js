import React, { Component } from "react";
import { Route } from "react-router-dom";
import NotefulContext from "./NotefulContext";
import Header from "./Header/Header";
import ViewFolder from "./ViewFolder/ViewFolder";
import AddFolder from "./AddFolder/AddFolder";
import ViewNote from "./ViewNote/ViewNote";
import AddNote from "./AddNote/AddNote";
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
        if (!foldersRes.ok || !notesRes.ok) {
          return Promise.all([foldersRes, notesRes]).then((error) => {
            throw error;
          });
        }
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

  addNote = (newNote) => {
    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  };

  deleteNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);

    this.setState({
      notes: updatedNotes,
    });
  };

  addFolder = (folderId, folderName) => {
    const newFolder = { id: folderId, name: folderName };

    this.setState((prevState) => ({
      folders: [...prevState.folders, newFolder],
    }));
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addNote: this.addNote,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
    };

    return (
      <>
        <Header />
        <main className="App">
          <NotefulContext.Provider value={contextValue}>
            <Route exact path={"/"} component={ViewFolder} />
            <Route path="/folder/:folderId" component={ViewFolder} />
            <Route path="/add-folder/" component={AddFolder} />
            <Route path="/note/:noteId" component={ViewNote} />
            <Route path="/add-note/" component={AddNote} />
          </NotefulContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
