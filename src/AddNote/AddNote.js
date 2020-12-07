import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotefulContext from "../NotefulContext";
import InputError from "../InputError/InputError";
import "./AddNote.css";

class AddNote extends Component {
  static contextType = NotefulContext;

  state = {
    noteName: {
      value: "",
      touched: false,
    },
    noteFolder: {
      value: "",
      id: "",
      touched: false,
    },
    noteContent: {
      value: "",
      touched: false,
    },
  };

  addNoteRequest(e) {
    e.preventDefault();
    const { noteName, noteFolder, noteContent } = this.state;
    const noteId = uuidv4();
    const noteModified = new Date().toISOString();
    const note = {
      id: noteId,
      name: noteName.value,
      modified: noteModified,
      folderId: noteFolder.id,
      content: noteContent.value,
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
        this.props.history.push(`/folder/${note.folderId}`);
        this.context.addNote(note);
      })
      .catch((status) => {
        console.log(status);
      });
  }

  updateNoteName(noteName) {
    this.setState({
      noteName: {
        value: noteName,
        touched: true,
      },
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
      noteFolder: {
        value: folder.name,
        id: folder.id,
        touched: true,
      },
    });
  }

  updateNoteContent(noteContent) {
    this.setState({
      noteContent: {
        value: noteContent,
        touched: true,
      },
    });
  }

  validateNoteName() {
    const noteName = this.state.noteName.value.trim();
    if (noteName.length === 0) {
      return "Note name is required";
    } else if (noteName.length < 2) {
      return "Note name must be at least 2 characters long";
    }
  }

  validateNoteFolder() {
    const noteFolder = this.state.noteFolder.value.trim();
    if (noteFolder.length === 0) {
      return "Note folder is required";
    }
  }

  validateNoteContent() {
    const noteContent = this.state.noteContent.value.trim();
    if (noteContent.length === 0) {
      return "Note content is required";
    } else if (noteContent.length < 2) {
      return "Note content must be at least 2 characters long";
    }
  }

  render() {
    const { noteName, noteFolder, noteContent } = this.state;

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
            value={noteName.value}
            required
            onChange={(e) => this.updateNoteName(e.target.value)}
          />
          {this.state.noteName.touched && (
            <InputError message={this.validateNoteName()} />
          )}
        </div>
        <div className="Form__group">
          <label htmlFor="NoteFolder">
            Note Folder:<span className="Form__required">*</span>
          </label>
          <select
            id="NoteFolder"
            name="NoteFolder"
            value={noteFolder.id}
            required
            onChange={(e) => this.changeFolder(e.target.value)}
          >
            <option value="">Select a Folder</option>
            {this.getFolderOptions()}
          </select>
          {this.state.noteFolder.touched && (
            <InputError message={this.validateNoteFolder()} />
          )}
        </div>
        <div className="Form__group">
          <label htmlFor="NoteContent">
            Note Content:<span className="Form__required">*</span>
          </label>
          <textarea
            id="NoteContent"
            value={noteContent.value}
            required
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />
          {this.state.noteContent.touched && (
            <InputError message={this.validateNoteContent()} />
          )}
        </div>
        <button
          className="Form__submit"
          type="submit"
          disabled={
            this.validateNoteName() ||
            this.validateNoteFolder() ||
            this.validateNoteContent()
          }
        >
          Add Note
        </button>
      </form>
    );
  }
}

AddNote.defaultProps = {
  folders: [],
  addNote: () => {},
};

AddNote.propTypes = {
  context: PropTypes.shape({
    folders: PropTypes.array.isRequired,
    addNote: PropTypes.func.isRequired,
  }),
};

export default withRouter(AddNote);
