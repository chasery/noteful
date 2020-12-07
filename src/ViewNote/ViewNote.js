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
