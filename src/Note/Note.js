import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./Note.css";

class Note extends Component {
  static contextType = NotefulContext;

  deleteNoteRequest(noteId, callback) {
    const noteUrl = `http://localhost:9090/notes/${noteId}`;
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

  render() {
    return (
      <li className="Note">
        <div className="Note__header">
          <div>
            <h2 className="Note__title">
              <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
            </h2>
            <h3 className="Note__modified">
              Date modified on {this.props.modified}
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

export default withRouter(Note);
