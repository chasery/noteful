import React, { Component } from "react";
import "./FolderList.css";

class FolderList extends Component {
  render() {
    return (
      <section className="FolderList">
        <ul>{this.props.children}</ul>
        <button>Add Folder</button>
      </section>
    );
  }
}

export default FolderList;
