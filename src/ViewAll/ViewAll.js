import React, { Component, Fragment } from "react";
import STORE from "../store";
import FolderList from "../FolderList/FolderList";
import Folder from "../Folder/Folder";
import NoteList from "../NoteList/NoteList";
import Note from "../Note/Note";
import "./ViewAll.css";

class ViewAll extends Component {
  render() {
    return (
      <Fragment>
        <FolderList>
          <Folder id="test" name="Test Folder" />
          <Folder id="test" name="Test Folder" />
          <Folder id="test" name="Test Folder" />
        </FolderList>
        <NoteList>
          <Note id="test" name="Test Note" modified="10/10/2020" />
          <Note id="test" name="Test Note" modified="10/10/2020" />
          <Note id="test" name="Test Note" modified="10/10/2020" />
        </NoteList>
      </Fragment>
    );
  }
}

export default ViewAll;
