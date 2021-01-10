import React, { Component } from "react";
import { Route } from "react-router-dom";
import NotefulContext from "./NotefulContext";
import Header from "./Header/Header";
import ViewFolder from "./ViewFolder/ViewFolder";
import AddFolder from "./AddFolder/AddFolder";
import EditFolder from "./EditFolder/EditFolder";
import ViewNote from "./ViewNote/ViewNote";
import AddNote from "./AddNote/AddNote";
import EditNote from "./EditNote/EditNote";
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
    const foldersUrl = "http://localhost:8000/api/folders/";
    const notesUrl = "http://localhost:8000/api/notes/";

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

  // Note operations

  addNote = (newNote) => {
    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  };

  editNote = () => {};

  deleteNote = (noteId) => {
    const updatedNotes = this.state.notes.filter(
      (note) => parseInt(note.id) !== noteId
    );

    this.setState({
      notes: updatedNotes,
    });
  };

  // Folder operations

  addFolder = (newFolder) => {
    this.setState((prevState) => ({
      folders: [...prevState.folders, newFolder],
    }));
  };

  editFolder = (id, folderName) => {
    this.setState((prevState) => ({
      folders: prevState.folders.map((folder) =>
        folder.id === parseInt(id)
          ? { ...folder, folder_name: folderName }
          : folder
      ),
    }));
  };

  deleteFolder = (folderId) => {
    const updatedFolders = this.state.folders.filter(
      (folder) => parseInt(folder.id) !== folderId
    );

    this.setState({
      folders: updatedFolders,
    });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addNote: this.addNote,
      editNote: this.editNote,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      editFolder: this.editFolder,
      deleteFolder: this.deleteFolder,
    };

    return (
      <>
        <Header />
        <main className="App">
          <NotefulContext.Provider value={contextValue}>
            <Route exact path={"/"} component={ViewFolder} />
            <Route path="/folder/:folderId" component={ViewFolder} />
            <Route path="/add-folder/" component={AddFolder} />
            <Route path="/edit-folder/:folderId" component={EditFolder} />
            <Route path="/note/:noteId" component={ViewNote} />
            <Route path="/add-note/" component={AddNote} />
            <Route path="/edit-note/:noteId" component={EditNote} />
          </NotefulContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
