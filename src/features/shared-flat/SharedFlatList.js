import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdLocationOn from 'react-icons/lib/md/location-on';
import MdCheck from 'react-icons/lib/md/check';
import { bindActionCreators } from 'redux';
import { Card, WhiteSpace, Button, WingBlank, SearchBar } from 'antd-mobile';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SharedFlatList extends Component {
  static propTypes = {
    sharedFlat: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.filters = { offset: 0, limit: 10 };
    this.props.actions.getSharedFlatList();
  }

  search(query) {
    this.props.actions.search(query);
  }

  render() {
    const sharedFlats = this.props.sharedFlat.filteredList || [];
    const getTitle = sharedFlat => (<div>
      <div>{sharedFlat.name}</div>
      {<small>{sharedFlat.countResidents} resident</small>}
      <small>{ ' - '} years rate {sharedFlat.residentsYearsRate}</small>
    </div>);

    const list = sharedFlats.map(sharedFlat =>
      // eslint-disable-next-line no-underscore-dangle
      (<div key={sharedFlat._id}>
        <WhiteSpace size="md" />
        <Card full>
          <Card.Header
            title={getTitle(sharedFlat)}
            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
            extra={
              <Button type="ghost" size="small">
                Join
              </Button>
            }
          />
          <Card.Footer content={
            <div>
              <MdLocationOn />
              <strong>{sharedFlat.location.city}</strong>{' - '}{sharedFlat.location.country}
            </div>}
          />
        </Card>
      </div>)
    );

    return (<div>
      <WhiteSpace size="lg" />
      <WingBlank size="md" className="list-success">
        <SearchBar
          onChange={(e) => { this.search(e); }}
          placeholder="Search by locality, name..."
          cancelText="Cancel"
          autoFocus
        />
      </WingBlank>
      <WhiteSpace size="sm" />
      <WingBlank size="lg" className="list-success">
        <MdCheck /> <span>{list.length} shared flats were found</span>
      </WingBlank>
      <WhiteSpace size="sm" />
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
