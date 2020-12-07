import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import Note from "../Note/Note";
import "./NoteList.css";

class NoteList extends Component {
  static contextType = NotefulContext;
  static defaultProps = {
    notes: [],
  };

  render() {
    const notes = this.context.notes
      .filter(
        (note) =>
          !this.props.match.params.folderId ||
          note.folderId === this.props.match.params.folderId
      )
      .map((note) => {
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
      <section className="NoteList">
        {notes.length > 0 && <ul>{notes}</ul>}
        <div className="AddNote">
          <Link className="AddNote__link" to={`/add-note`}>
            + Add Note
          </Link>
        </div>
      </section>
    );
  }
}

export default withRouter(NoteList);
