import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addFolder: () => {},
});

export default NotefulContext;
