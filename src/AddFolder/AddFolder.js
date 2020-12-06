import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotefulContext from "../NotefulContext";
import "./AddFolder.css";

class AddFolder extends Component {
  static contextType = NotefulContext;

  state = {
    folderName: "",
    folderId: uuidv4(),
  };

  addFolderRequest(e) {
    e.preventDefault();
    const { folderName, folderId } = this.state;
    const folder = { id: folderId, name: folderName };
    const foldersUrl = `http://localhost:9090/folders`;

    fetch(foldersUrl, {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json",
        mode: "cors",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.status;
        }
      })
      .then((json) => {
        this.props.history.push(`/folder/${folderId}`);
        this.context.addFolder(folderId, folderName);
      })
      .catch((status) => {
        console.log(status);
      });
  }

  updateFolderName(folderName) {
    this.setState({
      folderName,
    });
  }

  render() {
    const { folderName } = this.state;

    return (
      <form onSubmit={(e) => this.addFolderRequest(e)}>
        <label htmlFor="Name">Folder Name</label>
        <input
          id="Name"
          type="text"
          value={folderName}
          onChange={(e) => this.updateFolderName(e.target.value)}
        />
        <button type="submit">Add Folder</button>
      </form>
    );
  }
}

export default withRouter(AddFolder);
