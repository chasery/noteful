import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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

        // if (this.props.match.params.folderId) {
        //   return note.folderId === this.props.match.params.folderId;
        // } else {
        //   return note;
        // }
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
        <ul>{notes}</ul>
        <button disabled>Add Note</button>
      </section>
    );
  }
}

export default withRouter(NoteList);
