import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Folder from "../Folder/Folder";
import NotefulContext from "../NotefulContext";
import "./FolderList.css";

class FolderList extends Component {
  static contextType = NotefulContext;
  static defaultDrops = {
    folders: [],
  };
  render() {
    const folders = this.context.folders.map((folder) => {
      return <Folder key={folder.id} id={folder.id} name={folder.name} />;
    });

    return (
      <section className="FolderList">
        <ul>{folders}</ul>
        <button disabled>Add Folder</button>
      </section>
    );
  }
}

export default withRouter(FolderList);
