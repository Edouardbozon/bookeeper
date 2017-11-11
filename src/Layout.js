import React from "react";
import PropTypes from "prop-types";
import { NavBar, Toast } from "antd-mobile";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    authentication: PropTypes.object.isRequired,
  };

  componentDidMount() {
    Toast.loading("Loading...", 1);
  }

  render() {
    const authenticated = typeof this.props.authentication.user === "object";
    const navRight = authenticated ? this.props.authentication.user.profile.name : null;
    return (
      <div>
        <NavBar rightContent={navRight}>
          { authenticated ? null : <strong>Bookeeper</strong> }
        </NavBar>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { ...state };
}

export default withRouter(connect(mapStateToProps)(Layout));
