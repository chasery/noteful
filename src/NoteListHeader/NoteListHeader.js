import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import "./NoteListHeader.css";

class NoteListHeader extends Component {
  static contextType = NotefulContext;

  handleDelete(folderId, callback) {
    const folderUrl = `http://localhost:8000/api/folders/${folderId}`;
    fetch(folderUrl, {
      method: "DELETE",
      "content-type": "application/json",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.status;
        } else {
          throw response.status;
        }
      })
      .then((json) => {
        this.props.history.push("/");
        callback(folderId);
      })
      .catch((status) => {
        console.log(status);
      });
  }

  render() {
    const { folderId } = this.props.match.params;
    const folder = this.context.folders.find(
      (folder) => folder.id === parseInt(folderId)
    );
    const folderHasNotes = this.context.notes.filter(
      (note) => note.folder_id === parseInt(folderId)
    );

    return (
      <>
        {folder ? (
          <div className="NoteListHeader">
            <h2>{folder.folder_name} Notes</h2>
            <div className="NoteListHeader__folderControls">
              <Link to={`/edit-folder/${folderId}`}>
                <button>Edit Folder</button>
              </Link>
              <button
                onClick={() =>
                  this.handleDelete(folder.id, this.context.deleteFolder)
                }
                disabled={folderHasNotes.length !== 0}
              >
                Delete Folder
              </button>
            </div>
          </div>
        ) : (
          <div className="NoteListHeader">
            <h2>All Notes</h2>
          </div>
        )}
      </>
    );
  }
}

NoteListHeader.propTypes = {
  context: PropTypes.shape({
    editFolder: PropTypes.func.isRequired,
    deleteFolder: PropTypes.func.isRequired,
  }),
};

export default withRouter(NoteListHeader);
