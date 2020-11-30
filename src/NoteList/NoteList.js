import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./NoteList.css";

class NoteList extends Component {
  render() {
    let button;
    if (!this.props.match.params.noteId) {
      button = <button disabled>Add Note</button>;
    }

    return (
      <section className="NoteList">
        <ul>{this.props.children}</ul>
        {button}
      </section>
    );
  }
}

export default withRouter(NoteList);
