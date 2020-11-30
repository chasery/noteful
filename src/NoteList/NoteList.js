import React, { Component } from "react";
import "./NoteList.css";

class NoteList extends Component {
  render() {
    return (
      <section className="NoteList">
        <ul>{this.props.children}</ul>
        <button>Add Note</button>
      </section>
    );
  }
}

export default NoteList;
