import React, { Component, Fragment } from "react";
import STORE from "../store";
import FolderList from "../FolderList/FolderList";
import NoteList from "../NoteList/NoteList";
import Note from "../Note/Note";
import "./ViewNote.css";

class ViewNote extends Component {
  render() {
    const note = STORE.notes.find(
      (note) => note.id === this.props.match.params.noteId
    );
    return (
      <Fragment>
        <FolderList></FolderList>
        <NoteList>
          <Note
            key={note.id}
            id={note.id}
            name={note.name}
            modified={note.modified}
            folderId={note.folderId}
            content={note.content}
          />
        </NoteList>
      </Fragment>
    );
  }
}

export default ViewNote;
