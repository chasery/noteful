import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./Folder.css";

class Folder extends Component {
  render() {
    return (
      <li className="Folder">
        <NavLink className="Folder__link" to={`/folder/${this.props.id}`}>
          <h2 className="Folder__title">{this.props.name}</h2>
        </NavLink>
      </li>
    );
  }
}

Folder.defaultProps = {
  id: 1,
  name: "Folder",
};

Folder.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Folder;
