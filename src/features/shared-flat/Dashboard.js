import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    this.props.actions.getDetail();
  }

  renderTabBar(props) {
    return (<Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }

  render() {
    const name = pathOr('Loading', ['sharedFlat', 'collection', 'name'], this.props);
    const countResidents = path(['sharedFlat', 'collection', 'countResidents'], this.props);
    const tabs = [
      { title: 'Activity' },
      { title: 'Second Tab', disabled: true },
      { title: 'Third Tab' },
    ];
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
                  height: '250px',
                  backgroundColor: '#fff'
                }}
                >
                  Content of first tab
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
          </div>
          <WhiteSpace />
          <div>
            yoo
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
