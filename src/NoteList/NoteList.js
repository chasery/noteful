import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import Note from "../Note/Note";
import "./NoteList.css";

class NoteList extends Component {
  static contextType = NotefulContext;

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

NoteList.defaultProps = {
  notes: [],
};

NoteList.propTypes = {
  context: PropTypes.shape({
    notes: PropTypes.array.isRequired,
  }),
};

export default withRouter(NoteList);
