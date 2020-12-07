import React, { Component } from "react";

class FolderError extends Component {
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
      return (
        <li className="Folder">
          <div class="Folder__error">Could not display this folder.</div>
        </li>
      );
    }
    return this.props.children;
  }
}

export default FolderError;
