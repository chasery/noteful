import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Note.css";

class Note extends Component {
  render() {
    return (
      <li className="Note">
        <div>
          <h2 className="Note__title">
            <Link to={`/note/${this.props.id}`}>{this.props.name}</Link>
          </h2>
          <h3 className="Note__modified">
            Date modified on {this.props.modified}
          </h3>
        </div>
        <button className="Note__delete">Delete Note</button>
      </li>
    );
  }
}

export default Note;
