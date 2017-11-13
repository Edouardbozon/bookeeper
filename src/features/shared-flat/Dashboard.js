import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line } from 'recharts';
import { pathOr, path } from 'ramda';
import { bindActionCreators } from 'redux';
import { StickyContainer, Sticky } from 'react-sticky';
import { WingBlank, WhiteSpace, Card, Tabs } from 'antd-mobile';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Dashboard extends Component {
  static propTypes = {
    sharedFlat: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    Promise.all([
      this.props.actions.getDetail(),
      this.props.actions.getEvents(),
    ]);
  }

  renderTabBar(props) {
    return (
      <Sticky>
        { ({ style }) => 
            <div style={{ ...style, zIndex: 1 }}>
              <Tabs.DefaultTabBar {...props} />
            </div> }
      </Sticky>
    );
  }

  renderCharts() {
    const tabs = [
      { title: 'Activity' },
      { title: 'Expenses' },
    ];

    const {events} = this.props.sharedFlat;

    return (
      <StickyContainer>
        <Tabs
          tabs={tabs}
          initalPage={'t2'}
          renderTabBar={this.renderTabBar}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff'
          }}
          >
          <LineChart width={300} height={100} data={events}>
            <Line 
              type='monotone' 
              dataKey='monthlyActivityAverage' 
              stroke='#8884d8' 
              strokeWidth={2} 
            />
          </LineChart>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px',
            backgroundColor: '#fff'
          }}
          >
            Content of second tab
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px',
            backgroundColor: '#fff'
          }}
          >
            Content of third tab
          </div>
        </Tabs>
      </StickyContainer>
    );
  }

  renderEvents() {
    return this.props.sharedFlat.events.map(event => 
      (
        <Card>
          <Card.Body>
            { event.createdAt } { event.type }
          </Card.Body>
        </Card>
      )
    );
  }

  render() {
    const name = pathOr('Loading', ['sharedFlat', 'collection', 'name'], this.props);
    const countResidents = path(['sharedFlat', 'collection', 'countResidents'], this.props);
    return (
      <div className="shared-flat-dashboard">
        <header>
          <WingBlank>
            { name } <span>{ countResidents + ' resident' }</span>
          </WingBlank>
        </header>
        <WingBlank size="md">
          <WhiteSpace size="md" />
          <div className="main">
            { this.renderCharts() }
          </div>
          <WhiteSpace />
          <div>
            { this.renderEvents() }
          </div>
        </WingBlank>
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
)(Dashboard);
