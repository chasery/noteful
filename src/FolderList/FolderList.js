import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./FolderList.css";

class FolderList extends Component {
  render() {
    let button;
    if (this.props.match.params.noteId) {
      button = (
        <button onClick={() => this.props.history.goBack()}>Go Back</button>
      );
    } else {
      button = <button disabled>Add Folder</button>;
    }

    return (
      <section className="FolderList">
        <ul>{this.props.children}</ul>
        {button}
      </section>
    );
  }
}

export default withRouter(FolderList);
