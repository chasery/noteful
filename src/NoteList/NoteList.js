import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import Note from "../Note/Note";
import NoteError from "../NoteError/NoteError";
import "./NoteList.css";

class NoteList extends Component {
  static contextType = NotefulContext;

  render() {
    const notes = this.context.notes
      .filter(
        (note) =>
          !this.props.match.params.folderId ||
          note.folder_id === parseInt(this.props.match.params.folderId)
      )
      .map((note) => {
        return (
          <NoteError key={note.id}>
            <Note
              id={note.id}
              name={note.note_name}
              modified={note.modified}
              folderId={note.folder_id}
            />
          </NoteError>
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

NoteList.propTypes = {
  context: PropTypes.shape({
    notes: PropTypes.array.isRequired,
  }),
};

export default withRouter(NoteList);
