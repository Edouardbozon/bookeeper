import moment from "moment";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { LineChart, Line } from "recharts";
import { pathOr, path, last } from "ramda";
import { bindActionCreators } from "redux";
import { WingBlank, WhiteSpace, Card, Tabs, Button } from "antd-mobile";
import { connect } from "react-redux";
import * as actions from "./redux/actions";
import Draft from "./Draft";
import Event from "./Event";

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

  renderTabBar(props) {
    return <Tabs.DefaultTabBar {...props} />;
  }

  renderCharts() {
    const tabs = [
      { title: "Activity" },
      { title: "Expenses" },
      { title: "Members" },
    ];
    const { events } = this.props.sharedFlat;
    const draftModeActivated = this.props.sharedFlat.draftMode === true;

    return (
      <div className={draftModeActivated ? "opacify" : null}>
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
      </div>
    );
  }

  renderEvents() {
    const draftModeActivated = this.props.sharedFlat.draftMode === true;
    const {
      events,
      getDetailPending,
      getEventsPending,
      getJoinRequestsPending,
    } = this.props.sharedFlat;

    if (getDetailPending || getEventsPending || getJoinRequestsPending) {
      return <div className="loader">Loading...</div>;
    }

    if (events.length === 0) {
      return (
        <div className="empty">There is no event, create the first one</div>
      );
    }

    const { residents } = this.props.sharedFlat.data;

    return events.map((event, i) => (
      // eslint-disable-next-line no-underscore-dangle
      <div key={event._id}>
        {i > 0 ? <WhiteSpace /> : null}
        {draftModeActivated && i === 0 ? (
          <Draft
            event={event}
            residents={residents}
            publishDraft={this.props.actions.publishDraft}
            getEvents={this.props.actions.getEvents}>
            <Event
              currency={this.props.sharedFlat.currency}
              event={event}
              removeEvent={this.props.actions.removeEvent}
              getEvents={this.props.actions.getEvents}
            />
          </Draft>
        ) : (
          <div className={draftModeActivated ? "opacify" : null}>
            <Event
              currency={this.props.sharedFlat.currency}
              event={event}
              removeEvent={this.props.actions.removeEvent}
              getEvents={this.props.actions.getEvents}
            />
          </div>
        )}
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

  cancelDraft() {
    const { events } = this.props.sharedFlat;

    this.props.actions
      .removeEvent(last(events))
      .then(() => this.props.actions.getEvents())
      .then(() => this.props.actions.cancelDraft());
  }

  renderActionButton() {
    const draftModeActivated = this.props.sharedFlat.draftMode === true;

    return draftModeActivated ? (
      <Button
        type="warning"
        className="action-button"
        onClick={() => {
          this.cancelDraft();
        }}>
        Cancel
      </Button>
    ) : (
      <Button
        type="primary"
        className="action-button"
        onClick={() => {
          this.props.actions.buildEvent();
          this.props.actions
            .postDraft()
            .then(() => this.props.actions.getEvents());
        }}>
        Notify
      </Button>
    );
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
          <header className="shared-flat-header">
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
          {this.renderActionButton()}
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
