import React, { Component, Fragment } from "react";
import STORE from "../store";
import FolderList from "../FolderList/FolderList";
import Folder from "../Folder/Folder";
import NoteList from "../NoteList/NoteList";
import Note from "../Note/Note";
import "./ViewFolder.css";

class ViewFolder extends Component {
  render() {
    const folders = STORE.folders.map((folder) => {
      return (
        <Folder
          key={folder.id}
          id={folder.id}
          name={folder.name}
          selected={
            folder.id === this.props.match.params.folderId ? true : false
          }
        />
      );
    });
    const notes = STORE.notes.map((note) => {
      return (
        <Note
          key={note.id}
          id={note.id}
          name={note.name}
          modified={note.modified}
          folderId={note.folderId}
        />
      );
    });
    return (
      <Fragment>
        <FolderList>{folders}</FolderList>
        <NoteList>{notes}</NoteList>
      </Fragment>
    );
  }
}

export default ViewFolder;
