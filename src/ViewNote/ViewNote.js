import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import Note from "../Note/Note";
import "./ViewNote.css";

class ViewNote extends Component {
  static contextType = NotefulContext;
  static defaultProps = {
    notes: [],
  };

  render() {
    const note = this.context.notes
      .filter((note) =>
        note.id === this.props.match.params.noteId ? note : ""
      )
      .map((note) => (
        <Note
          key={note.id}
          id={note.id}
          name={note.name}
          modified={note.modified}
          folderId={note.folderId}
          content={note.content}
        />
      ));

    return (
      <>
        <div className="ControlContainer">
          <button onClick={() => this.props.history.goBack()}>Go Back</button>
        </div>
        <div className="NoteContainer">{note}</div>
      </>
    );
  }
}

export default withRouter(ViewNote);
