import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar>
          <strong>Bookkeeper</strong>
        </NavBar>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
