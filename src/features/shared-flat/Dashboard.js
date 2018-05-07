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
  Button,
} from "antd-mobile";
import { connect } from "react-redux";
import * as actions from "./redux/actions";

export class Dashboard extends Component {
  static propTypes = {
    sharedFlat: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    console.log(this.props.actions);
    Promise.all([
      this.props.actions.getDetail(),
      this.props.actions.getEvents(),
      this.props.actions.getJoinRequests(),
    ]);
  }

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
        <Tabs tabs={tabs} initalPage={"t2"} renderTabBar={this.renderTabBar}>
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
      <div key={event._id}>
        {i > 0 ? <WhiteSpace /> : null}
        <Card>
          <Card.Body>
            <div className="event-thumbnail">
              <img
                src={event.createdBy.picture}
                alt={`${event.createdBy.name} event`}
              />
            </div>
            <span>
              by <strong>{event.createdBy.name}</strong>
            </span>
            <small>{moment(event.createdAt).fromNow()}</small>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  renderActionSheet() {
    const renderActions = () =>
      this.props.sharedFlat.actions.map(action => ({
        icon: <img src={action.img} alt={action.title} style={{ width: 36 }} />,
        title: action.title,
      }));

    ActionSheet.showShareActionSheetWithOptions({
      options: renderActions(),
      message: "Tell something to your roommates",
      cancelButtonText: "cancel",
    });
  }

  render() {
    const name = pathOr(
      "Loading",
      ["sharedFlat", "collection", "name"],
      this.props,
    );
    const countResidents = path(
      ["sharedFlat", "collection", "countResidents"],
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
            <div className="main">{this.renderCharts()}</div>
            <WhiteSpace />
            <section className="event-list-wrapper">
              {this.renderEvents()}
            </section>
          </WingBlank>
        </div>
        <WhiteSpace />
        <WingBlank size="md" className="main">
          <Button
            type="primary"
            className="action-button"
            onClick={() => this.renderActionSheet()}>
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
