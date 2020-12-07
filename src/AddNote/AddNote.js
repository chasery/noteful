import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotefulContext from "../NotefulContext";
import "./AddNote.css";

class AddNote extends Component {
  static contextType = NotefulContext;

  state = {
    noteName: "",
    noteFolderName: "",
    noteFolderId: "",
    noteContent: "",
  };

  // addNoteRequest(e) {
  //   e.preventDefault();
  //   const { noteName: "" } = this.state;
  //   const noteId = uuidv4();
  //   const note = { id: noteId, name: folderName };
  //   const foldersUrl = `http://localhost:9090/folders`;

  //   fetch(foldersUrl, {
  //     method: "POST",
  //     body: JSON.stringify(folder),
  //     headers: {
  //       "content-type": "application/json",
  //       mode: "cors",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw response.status;
  //       }
  //     })
  //     .then((json) => {
  //       this.props.history.push(`/folder/${folderId}`);
  //       this.context.addFolder(folderId, folderName);
  //     })
  //     .catch((status) => {
  //       console.log(status);
  //     });
  // }

  updateNoteName(noteName) {
    this.setState({
      noteName,
    });
  }

  getFolderOptions() {
    return this.context.folders.map((folder) => (
      <option key={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ));
  }

  changeFolder(folderId) {
    const folder = this.context.folders.find(
      (folder) => folderId === folder.id
    );
    console.log(folder);

    this.setState({
      noteFolderName: folder.name,
      noteFolderId: folder.id,
    });
  }

  updateNoteContent(noteContent) {
    this.setState({
      noteContent,
    });
  }

  render() {
    const { noteName, noteFolderId, noteContent } = this.state;

    return (
      <form>
        <div className="FormGroup">
          <label htmlFor="NoteName">
            Note Name:<span className="FormGroup__required">*</span>
          </label>
          <input
            id="NoteName"
            type="text"
            value={noteName}
            onChange={(e) => this.updateNoteName(e.target.value)}
          />
        </div>
        <div className="FormGroup">
          <label htmlFor="NoteFolder">
            Note Folder:<span className="FormGroup__required">*</span>
          </label>
          <select
            id="NoteFolder"
            name="NoteFolder"
            value={noteFolderId}
            required
            onChange={(e) => this.changeFolder(e.target.value)}
          >
            <option value="">Select a Folder</option>
            {this.getFolderOptions()}
          </select>
        </div>
        <div className="FormGroup">
          <label htmlFor="NoteContent">
            Note Content:<span className="FormGroup__required">*</span>
          </label>
          <textarea
            id="NoteContent"
            value={noteContent}
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />
        </div>
        <button type="submit">Add Folder</button>
      </form>
    );
  }
}

export default withRouter(AddNote);
