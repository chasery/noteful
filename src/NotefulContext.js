import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  addNote: () => {},
  editNote: () => {},
  deleteNote: () => {},
  addFolder: () => {},
  editFolder: () => {},
  deleteFolder: () => {},
});

export default NotefulContext;
