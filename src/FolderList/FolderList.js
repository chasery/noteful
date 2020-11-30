import React, { Component } from "react";
import "./FolderList.css";

class FolderList extends Component {
  render() {
    return (
      <section className="FolderList">
        <ul>{this.props.children}</ul>
      </section>
    );
  }
}

export default FolderList;
