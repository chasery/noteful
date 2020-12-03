import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Folder from "../Folder/Folder";
import "./FolderList.css";

class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [
        {
          id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          name: "Important",
        },
        {
          id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          name: "Super",
        },
        {
          id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
          name: "Spangley",
        },
      ],
    };
  }
  render() {
    const folders = this.state.folders.map((folder) => {
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
