import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import InputError from "../InputError/InputError";
import "./AddNote.css";

class AddNote extends Component {
  static contextType = NotefulContext;

  state = {
    noteName: {
      value: "",
      touched: false,
      error: "",
    },
    noteFolder: {
      value: "",
      id: "",
      touched: false,
      error: "",
    },
    noteContent: {
      value: "",
      touched: false,
      error: "",
    },
  };

  addNoteRequest(e) {
    e.preventDefault();
    const { noteName, noteFolder, noteContent } = this.state;
    // const noteModified = new Date().toISOString();
    const newNote = {
      note_name: noteName.value,
      // modified: noteModified,
      folder_id: noteFolder.id,
      note_content: noteContent.value,
    };
    const foldersUrl = `http://localhost:8000/api/notes`;

    fetch(foldersUrl, {
      method: "POST",
      body: JSON.stringify(newNote),
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
        const { id, note_name, note_content, modified, folder_id } = json;
        this.props.history.push(`/folder/${folder_id}`);
        this.context.addNote({
          id,
          note_name,
          note_content,
          folder_id,
          modified,
        });
      })
      .catch((status) => {
        console.log(status);
      });
  }

  updateNoteName(noteName) {
    this.setState(
      (prevState) => ({
        noteName: {
          ...prevState.noteName,
          value: noteName,
          touched: true,
        },
      }),
      this.validateNoteName
    );
  }

  validateNoteName() {
    const trimmedName = this.state.noteName.value.trim();

    if (trimmedName.length === 0) {
      this.setState((prevState) => ({
        noteName: {
          ...prevState.noteName,
          error: "Note name is required",
        },
      }));
    } else if (trimmedName.length < 2) {
      this.setState((prevState) => ({
        noteName: {
          ...prevState.noteName,
          error: "Note name must be at least 2 characters long",
        },
      }));
    } else {
      this.setState((prevState) => ({
        noteName: {
          ...prevState.noteName,
          error: "",
        },
      }));
    }
  }

  getFolderOptions() {
    return this.context.folders.map((folder) => (
      <option key={folder.id} value={folder.id}>
        {folder.folder_name}
      </option>
    ));
  }

  changeFolder(folderId) {
    const folder = this.context.folders.filter((folder) => {
      return folder.id === parseInt(folderId);
    });
    this.setState(
      (prevState) => ({
        noteFolder: {
          ...prevState.noteFolder,
          value: folderId ? folder[0].folder_name : "",
          id: folderId ? folder[0].id : "",
          touched: true,
        },
      }),
      this.validateNoteFolder
    );
  }

  validateNoteFolder() {
    const trimmedFolder = this.state.noteFolder.value.trim();

    if (trimmedFolder.length === 0) {
      this.setState((prevState) => ({
        noteFolder: {
          ...prevState.noteFolder,
          error: "Note folder is required",
        },
      }));
    } else {
      this.setState((prevState) => ({
        noteFolder: {
          ...prevState.noteFolder,
          error: "",
        },
      }));
    }
  }

  updateNoteContent(noteContent) {
    this.setState(
      (prevState) => ({
        noteContent: {
          ...prevState.noteContent,
          value: noteContent,
          touched: true,
        },
      }),
      this.validateNoteContent
    );
  }

  validateNoteContent() {
    const trimmedContent = this.state.noteContent.value.trim();

    if (trimmedContent.length === 0) {
      this.setState((prevState) => ({
        noteContent: {
          ...prevState.noteContent,
          error: "Note content is required",
        },
      }));
    } else if (trimmedContent.length < 2) {
      this.setState((prevState) => ({
        noteContent: {
          ...prevState.noteContent,
          error: "Note content must be at least 2 characters long",
        },
      }));
    } else {
      this.setState((prevState) => ({
        noteContent: {
          ...prevState.noteContent,
          error: "",
        },
      }));
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
            aria-required="true"
            aria-invalid={noteName.error ? "true" : "false"}
            aria-label="The name of your note"
            aria-describedby={noteName.error ? "NoteNameError" : ""}
          />
          {noteName.error && (
            <InputError id={"NoteNameError"} message={noteName.error} />
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
            aria-required="true"
            aria-invalid={noteFolder.error ? "true" : "false"}
            aria-label="The folder you wish to put your note in"
            aria-describedby={noteFolder.error ? "NoteFolderError" : ""}
          >
            <option value="">Select a Folder</option>
            {this.getFolderOptions()}
          </select>
          {noteFolder.error && (
            <InputError id={"NoteFolderError"} message={noteFolder.error} />
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
            aria-required="true"
            aria-invalid={noteContent.error ? "true" : "false"}
            aria-label="The content of your note"
            aria-describedby={noteContent.error ? "NoteContentError" : ""}
          />
          {noteContent.error && (
            <InputError id={"NoteContentError"} message={noteContent.error} />
          )}
        </div>
        <button
          className="Form__submit"
          type="submit"
          disabled={noteName.error || noteFolder.error || noteContent.error}
        >
          Add Note
        </button>
      </form>
    );
  }
}

// AddNote.defaultProps = {
//   folders: [],
//   addNote: () => {},
// };

AddNote.propTypes = {
  context: PropTypes.shape({
    folders: PropTypes.array.isRequired,
    addNote: PropTypes.func.isRequired,
  }),
};

export default withRouter(AddNote);
