import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Folder from "../Folder/Folder";
import NotefulContext from "../NotefulContext";
import "./FolderList.css";

class FolderList extends Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders.map((folder) => {
      return <Folder key={folder.id} id={folder.id} name={folder.name} />;
    });

    return (
      <section className="FolderList">
        <ul>{folders}</ul>
        <div className="AddFolder">
          <Link className="AddFolder__link" to={"/add-folder"}>
            + Add Folder
          </Link>
        </div>
      </section>
    );
  }
}

FolderList.defaultProps = {
  folders: [],
};

FolderList.propTypes = {
  context: PropTypes.shape({
    folders: PropTypes.array.isRequired,
  }),
};

export default withRouter(FolderList);
