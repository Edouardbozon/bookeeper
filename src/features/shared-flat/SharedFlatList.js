import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Card, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import MdLocationOn from 'react-icons/lib/md/location-on';
import MdCheck from 'react-icons/lib/md/check';

export class SharedFlatList extends Component {
  static propTypes = {
    sharedFlat: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.filters = { offset: 0, limit: 10 };
    this.props.actions.getSharedFlatList();
  }

  render() {
    const sharedFlats = this.props.sharedFlat.list || [];
    const list = sharedFlats.map(sharedFlat =>
      (<div key={sharedFlat._id}>
        <WhiteSpace size="md" />
        <Card full>
          <Card.Header
            title={<div><div>{sharedFlat.name}</div>  <small>Years rate {sharedFlat.residentsYearsRate}</small></div>}
            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
            extra={<span>{sharedFlat.countResidents } resident</span>}
          />
          <Card.Body>
            <div>
              <MdLocationOn />
              <strong>{sharedFlat.location.city}</strong>{ ' - ' }
              {sharedFlat.location.country}
            </div>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>
      </div>)
    );

    return (<div>
      <WhiteSpace size="md" />
      <Card>
        <Card.Body className="list-success">
          <MdCheck /> <span>Found {list.length} shared flats</span>
        </Card.Body>
      </Card>
      {list}
    </div>);
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
