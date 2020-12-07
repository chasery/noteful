import React, { Component } from "react";
import PropTypes from "prop-types";

class NoteError extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  render() {
    if (this.state.hasError) {
      return <li className="Note">Could not display this note.</li>;
    }
    return this.props.children;
  }
}

NoteError.defaultProps = {
  children: {},
};

NoteError.propTypes = {
  children: PropTypes.object.isRequired,
};

export default NoteError;
