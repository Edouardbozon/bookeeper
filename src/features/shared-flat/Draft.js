import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Draft extends Component {
  static propTypes = { event: PropTypes.object.isRequired };

  render() {
    return <div className="shared-flat-draft">draft</div>;
  }
}
