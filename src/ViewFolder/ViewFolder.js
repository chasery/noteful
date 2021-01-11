import React from "react";
import FolderList from "../FolderList/FolderList";
import NoteListHeader from "../NoteListHeader/NoteListHeader";
import NoteList from "../NoteList/NoteList";
import "./ViewFolder.css";

export default function ViewFolder() {
  return (
    <>
      <div className="FolderListWrapper">
        <h2>Folders</h2>
        <FolderList />
      </div>
      <div className="NoteListWrapper">
        <NoteListHeader />
        <NoteList />
      </div>
    </>
  );
}
