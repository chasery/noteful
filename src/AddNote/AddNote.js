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

  addNoteRequest(e) {
    e.preventDefault();
    const { noteName, noteFolderId, noteContent } = this.state;
    const noteId = uuidv4();
    const noteModified = new Date().toISOString();
    const note = {
      id: noteId,
      name: noteName,
      modified: noteModified,
      folderId: noteFolderId,
      content: noteContent,
    };
    const foldersUrl = `http://localhost:9090/notes`;

    fetch(foldersUrl, {
      method: "POST",
      body: JSON.stringify(note),
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
        this.props.history.push(`/folder/${noteFolderId}`);
        this.context.addNote(note);
      })
      .catch((status) => {
        console.log(status);
      });
  }

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
      <form className="Form" onSubmit={(e) => this.addNoteRequest(e)}>
        <h3>Add a note</h3>
        <div className="Form__group">
          <label htmlFor="NoteName">
            Note Name:<span className="Form__required">*</span>
          </label>
          <input
            id="NoteName"
            type="text"
            value={noteName}
            required
            onChange={(e) => this.updateNoteName(e.target.value)}
          />
        </div>
        <div className="Form__group">
          <label htmlFor="NoteFolder">
            Note Folder:<span className="Form__required">*</span>
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
        <div className="Form__group">
          <label htmlFor="NoteContent">
            Note Content:<span className="Form__required">*</span>
          </label>
          <textarea
            id="NoteContent"
            value={noteContent}
            required
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />
        </div>
        <button className="Form__submit" type="submit">
          Add Note
        </button>
      </form>
    );
  }
}

export default withRouter(AddNote);
