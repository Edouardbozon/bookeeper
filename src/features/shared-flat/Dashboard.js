import moment from "moment";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { LineChart, Line } from "recharts";
import { pathOr, path } from "ramda";
import { bindActionCreators } from "redux";
import { StickyContainer, Sticky } from "react-sticky";
import {
  WingBlank,
  WhiteSpace,
  Card,
  Tabs,
  ActionSheet,
  Icon,
  Popover,
  Button,
} from "antd-mobile";
import { connect } from "react-redux";
import MdMoreHoriz from "react-icons/lib/md/more-horiz";
import MdClear from "react-icons/lib/md/clear";
import * as actions from "./redux/actions";

const Item = Popover.Item;
export class Dashboard extends Component {
  static propTypes = {
    sharedFlat: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    Promise.all([
      this.props.actions.getDetail(),
      this.props.actions.getEvents(),
      this.props.actions.getJoinRequests(),
    ]);
  }

  onTabChange = (tab, index) => {
    this.props.actions.toggleTab(index);
  };

  onEventSelect = opt => {
    // dispatch
  };

  renderTabBar(props) {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    );
  }

  renderCharts() {
    const tabs = [
      { title: "Activity" },
      { title: "Expenses" },
      { title: "Members" },
    ];

    const { events } = this.props.sharedFlat;

    return (
      <StickyContainer>
        <Tabs
          tabs={tabs}
          renderTabBar={this.renderTabBar}
          onChange={this.onTabChange}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff",
            }}>
            <LineChart width={300} height={100} data={events}>
              <Line
                type="monotone"
                dataKey="monthlyActivityAverage"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff",
            }}>
            Content of second tab
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff",
            }}>
            Content of thirb tab
          </div>
        </Tabs>
      </StickyContainer>
    );
  }

  renderEvents() {
    return this.props.sharedFlat.events.map((event, i) => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={event._id}>
        {i > 0 ? <WhiteSpace /> : null}
        <Card>
          <Card.Body>
            <section>
              <div className="event-thumbnail">
                <img
                  src={event.createdBy.picture}
                  alt={`${event.createdBy.name} event`}
                />
              </div>
              <div>
                <Popover
                  mask
                  visible={event.popoverVisible}
                  overlay={[
                    <Item key="0" value="remove">
                      <span>
                        <MdClear /> Remove
                      </span>
                    </Item>,
                  ]}
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                  }}
                  onVisibleChange={this.handleVisibleChange}
                  onSelect={this.onSelect}>
                  <MdMoreHoriz />
                </Popover>
              </div>
              <span>
                by <strong>{event.createdBy.name}</strong>
              </span>
              <small>{moment(event.createdAt).fromNow()}</small>
            </section>
            <section>{event.message}</section>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  renderJoinRequests() {
    return this.props.sharedFlat.joinRequests.map((joinRequest, i) => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={joinRequest._id}>
        {i > 0 ? <WhiteSpace /> : null}
        <Card>
          <Card.Body>
            <strong>En attente</strong>
            <small>{moment(joinRequest.doAt).fromNow()}</small>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  renderResidents() {
    return this.props.sharedFlat.data.residents.map((resident, i) => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={resident._id}>
        {i > 0 ? <WhiteSpace /> : null}
        <Card>
          <Card.Body>
            <div className="event-thumbnail">
              <img src={resident.picture} alt={`${resident.name} resident`} />
            </div>
            <strong>{resident.name}</strong>
            <small>{moment(resident.joinAt).fromNow()}</small>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  renderTabs() {
    const { activeTabIndex } = this.props.sharedFlat;
    switch (activeTabIndex) {
      case 0:
        return (
          <section className="event-list-wrapper">
            {this.renderEvents()}
          </section>
        );
      case 1:
        return <section />;
      case 2:
        return (
          <div>
            <WhiteSpace />
            <h4>Residents</h4>
            <WhiteSpace />
            <section>{this.renderResidents()}</section>
            {this.props.sharedFlat.joinRequests.length > 0 ? (
              <div>
                <WhiteSpace />
                <h4>Requests</h4>
                <WhiteSpace />
                <section className="event-list-wrapper">
                  {this.renderJoinRequests()}
                </section>
              </div>
            ) : null}
          </div>
        );

      default:
        return <section />;
    }
  }

  render() {
    const name = pathOr("Loading", ["sharedFlat", "data", "name"], this.props);
    const countResidents = path(
      ["sharedFlat", "data", "countResidents"],
      this.props,
    );

    return (
      <div>
        <div className="shared-flat-dashboard">
          <header>
            <WingBlank>
              {name} <span>{`${countResidents} resident`}</span>
            </WingBlank>
          </header>
          <WingBlank size="md" className="main">
            <WhiteSpace size="md" />
            <div className="main">
              {this.renderCharts()}
              <WhiteSpace size="md" />
              {this.renderTabs()}
            </div>
          </WingBlank>
        </div>
        <WhiteSpace />
        <WingBlank size="md" className="main">
          <Button
            type="primary"
            className="action-button"
            onClick={() => {
              this.props.actions.buildEvent();
              this.props.actions.notify();
            }}>
            Notify
          </Button>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
