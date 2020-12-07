import React, { Component } from "react";

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

export default NoteError;
