import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import InputError from "../InputError/InputError";
import "./AddFolder.css";

class AddFolder extends Component {
  static contextType = NotefulContext;

  state = {
    folderName: {
      value: "",
      touched: false,
      error: "",
    },
  };

  addFolderRequest(e) {
    e.preventDefault();
    const { folderName } = this.state;
    const foldersUrl = `http://localhost:8000/api/folders`;

    fetch(foldersUrl, {
      method: "POST",
      body: JSON.stringify({ folder_name: folderName.value }),
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
        const { id, folder_name } = json;
        this.props.history.push(`/folder/${id}`);
        this.context.addFolder({
          id,
          folder_name,
        });
      })
      .catch((status) => {
        console.log(status);
      });
  }

  updateFolderName(folderName) {
    this.setState(
      (prevState) => ({
        folderName: {
          ...prevState.folderName,
          value: folderName,
          touched: true,
        },
      }),
      this.validateFolderName
    );
  }

  validateFolderName() {
    const folderName = this.state.folderName.value.trim();

    if (folderName.length === 0) {
      console.log("It's 0...");
      this.setState((prevState) => ({
        folderName: {
          ...prevState.folderName,
          error: "Folder name is required",
        },
      }));
    } else if (folderName.length < 2) {
      this.setState((prevState) => ({
        folderName: {
          ...prevState.folderName,
          error: "Folder name must be at least 2 characters long",
        },
      }));
    } else {
      this.setState((prevState) => ({
        folderName: {
          ...prevState.folderName,
          error: "",
        },
      }));
    }
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
            value={folderName.value}
            onChange={(e) => this.updateFolderName(e.target.value)}
            aria-required="true"
            aria-invalid={folderName.error ? "true" : "false"}
            aria-label="The name of your folder"
            aria-describedby={folderName.error ? "FolderNameError" : ""}
          />
          {folderName.error && (
            <InputError id={"FolderNameError"} message={folderName.error} />
          )}
        </div>
        <button
          className="Form__submit"
          type="submit"
          disabled={folderName.error}
        >
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
