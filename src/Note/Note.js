import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Note.css";

class Note extends Component {
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
          <button className="Note__delete" disabled>
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
