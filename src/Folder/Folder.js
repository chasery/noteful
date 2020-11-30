import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Folder.css";

class Folder extends Component {
  render() {
    return (
      <li className="Folder">
        <Link className="Folder__link" to={`folder/${this.props.id}`}>
          <h2 className="Folder__title">{this.props.name}</h2>
        </Link>
      </li>
    );
  }
}

export default Folder;
