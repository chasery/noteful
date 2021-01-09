import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Note.css";

class Note extends Component {
  static contextType = NotefulContext;

  deleteNoteRequest(noteId, callback) {
    const noteUrl = `http://localhost:8000/api/notes/${noteId}`;
    fetch(noteUrl, {
      method: "DELETE",
      "content-type": "application/json",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.status;
        }
      })
      .then((json) => {
        if (this.props.match.params.noteId) {
          this.props.history.push("/");
        }
        callback(noteId);
      })
      .catch((status) => {
        console.log(status);
      });
  }

  noteDate(date) {
    const dateObj = new Date(date);
    return `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
  }

  render() {
    return (
      <li className="Note">
        <div className="Note__header">
          <div>
            <h2 className="Note__title">
              <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
            </h2>
            <h3 className="Note__modified">
              Date modified on {this.noteDate(this.props.modified)}
            </h3>
          </div>
          <button
            className="Note__delete"
            onClick={() =>
              this.deleteNoteRequest(this.props.id, this.context.deleteNote)
            }
          >
            Delete Note
          </button>
        </div>
        {this.props.match.params.noteId && (
          <div className="Note__content">{this.props.content}</div>
        )}
      </li>
    );
  }
}

Note.defaultProps = {
  id: 1,
  name: "",
  modified: "",
  content: "",
  deleteNote: () => {},
};

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: (props, propName, componentName) => {
    const prop = props[propName];

    if (!prop) {
      return new Error(
        `${propName} is required in ${componentName}. Validation Failed`
      );
    }

    if (typeof prop != "string") {
      return new Error(
        `Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`
      );
    }

    if (
      !prop.match(
        new RegExp(
          /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
        )
      )
    ) {
      return new Error(
        `Invalid prop, ${propName} must be a valid complete precision ISO date string. Validation Failed.`
      );
    }
  },
  content: PropTypes.string.isRequired,
  context: PropTypes.shape({
    deleteNote: PropTypes.func.isRequired,
  }),
};

export default withRouter(Note);
