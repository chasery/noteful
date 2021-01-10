import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import Note from "../Note/Note";
import "./ViewNote.css";

class ViewNote extends Component {
  static contextType = NotefulContext;

  render() {
    const note = this.context.notes
      .filter((note) =>
        note.id === parseInt(this.props.match.params.noteId) ? note : ""
      )
      .map((note) => (
        <Note
          key={note.id}
          id={note.id}
          name={note.note_name}
          modified={note.modified}
          folderId={note.folder_id}
          content={note.note_content}
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

ViewNote.defaultProps = {
  notes: [],
  match: {
    params: {
      noteId: "1",
    },
  },
};

ViewNote.propTypes = {
  context: PropTypes.shape({
    notes: PropTypes.array.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired,
    }),
  }),
};

export default withRouter(ViewNote);
