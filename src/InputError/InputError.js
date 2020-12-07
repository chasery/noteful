import React from "react";
import PropTypes from "prop-types";
import "./InputError.css";

export default function ValidationError(props) {
  if (props.message) {
    return <div className="Error">{props.message}</div>;
  }
  return <></>;
}

ValidationError.defaultProps = {
  message: "",
};

ValidationError.propTypes = {
  message: PropTypes.string.isRequired,
};
