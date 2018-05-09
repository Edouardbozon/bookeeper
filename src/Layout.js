import React from "react";
import PropTypes from "prop-types";
import { path } from "ramda";
import { NavBar, Toast, Button, Badge, WhiteSpace } from "antd-mobile";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import history from "./common/history";
import * as actions from "./features/authentication/redux/actions";

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
    const hasFbAuth =
      authenticated &&
      typeof path(["authentication", "user", "facebook"], this.props) ===
        "string";

    return (
      <div>
        <NavBar
          leftContent={
            authenticated ? (
              <span style={{ marginRight: "8%" }}>
                {this.props.authentication.user.profile.name}
              </span>
            ) : null
          }
          rightContent={
            hasFbAuth ? (
              <div>
                <Button
                  type="primary"
                  inline
                  size="small"
                  onClick={() => history.goBack()}>
                  Back
                </Button>
                <Badge dot>
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundImage: `url(${
                        this.props.authentication.user.profile.picture
                      })`,
                      backgroundSize: "cover",
                      display: "inline-block",
                    }}
                  />
                </Badge>
              </div>
            ) : (
              <Button
                type="primary"
                inline
                size="small"
                onClick={() => history.goBack()}>
                Back
              </Button>
            )
          }>
          {authenticated ? null : <strong>Bookeeper</strong>}
          {authenticated && !hasFbAuth ? (
            <Button
              inline
              size="small"
              href="http://localhost:3000/auth/facebook">
              Facebook
            </Button>
          ) : null}
        </NavBar>
        <main className="app-wrapper">{this.props.children}</main>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { ...state };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
