import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotefulContext from "../NotefulContext";
import "./AddFolder.css";

class AddFolder extends Component {
  static contextType = NotefulContext;

  state = {
    folderName: "",
  };

  addFolderRequest(e) {
    e.preventDefault();
    const { folderName } = this.state;
    const folderId = uuidv4();
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
        this.context.addFolder(folder);
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
      <form className="Form" onSubmit={(e) => this.addFolderRequest(e)}>
        <h3>Add a folder</h3>
        <div className="Form__group">
          <label htmlFor="Name">
            Folder Name:<span className="Form__required">*</span>
          </label>
          <input
            id="Name"
            type="text"
            value={folderName}
            required
            onChange={(e) => this.updateFolderName(e.target.value)}
          />
        </div>
        <button className="Form__submit" type="submit">
          Add Folder
        </button>
      </form>
    );
  }
}

AddFolder.defaultProps = {
  addFolder: () => {},
};

AddFolder.propTypes = {
  context: PropTypes.shape({
    addFolder: PropTypes.func.isRequired,
  }),
};

export default withRouter(AddFolder);
