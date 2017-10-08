import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SharedFlatList extends Component {
  static propTypes = {
    sharedFlat: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.filters = { offset: 0, limit: 10 };
    this.props.actions.getSharedFlatList(this.filters)
      .then((response) => {
        console.log(response)
      })  
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="shared-flat-shared-flat-list">
        Page Content: shared-flat/SharedFlatList
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    sharedFlat: state.sharedFlat,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedFlatList);
