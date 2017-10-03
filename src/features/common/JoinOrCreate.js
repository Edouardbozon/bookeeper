import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button, Card, WhiteSpace, List } from 'antd-mobile';
import { connect } from 'react-redux';
import history from '../../common/history';
import * as actions from './redux/actions';

export class JoinOrCreate extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const style = { margin: '0.1rem 0', backgroundColor: 'white' };
    return (
      <div>
        <WhiteSpace size="lg" />
        <Card className="common-join-or-create">
          <Card.Body>
            <h1>Hi buddy,</h1>
            You looks lonely without shared flat.
          </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
        <List style={style}>
          <List.Item multipleLine>
            Join
            <List.Item.Brief>
              Find an existing shared flat and query to be a member
              <WhiteSpace size="md" />
              <Button type="ghost" size="small" onClick={() => history.push('/shared-flat/list')}>see shared flats</Button>
            </List.Item.Brief>
          </List.Item>
          <List.Item multipleLine>
            Create
            <List.Item.Brief>
              Start by creating your own shared flat
              <WhiteSpace size="md" />
              <Button type="primary" size="small" onClick={() => history.push('/shared-flat/create')}>create a shared flat</Button>
              <WhiteSpace size="md" />
            </List.Item.Brief>
          </List.Item>
        </List>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
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
)(JoinOrCreate);
