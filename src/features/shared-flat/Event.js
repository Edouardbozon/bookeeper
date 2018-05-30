import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import MdMoreHoriz from "react-icons/lib/md/more-horiz";
import MdFiberNew from "react-icons/lib/md/fiber-new";
import MdAssistantPhoto from "react-icons/lib/md/assistant-photo";
import MdDetails from "react-icons/lib/md/details";
import MdCreate from "react-icons/lib/md/create";
import Money from "../../common/money";
import MdClear from "react-icons/lib/md/clear";
import MdAttachMoney from "react-icons/lib/md/attach-money";
import { Card, Popover } from "antd-mobile";

const Item = Popover.Item;

export default class Event extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    removeEvent: PropTypes.func.isRequired,
    getEvents: PropTypes.func.isRequired,
  };

  getIconType() {
    switch (this.props.event.type) {
      case "event":
        return <MdDetails />;
      case "expense":
        return <MdAttachMoney />;
      case "need":
        return <MdAssistantPhoto />;

      default:
        return <MdDetails />;
    }
  }

  getIcons() {
    const { event } = this.props;
    const icons = this.props.event.last ? (
      <span className="icons">
        <span className="new">
          <MdFiberNew />
        </span>
        {this.getIconType()}
        <span className="more">
          <MdMoreHoriz />
        </span>
      </span>
    ) : (
      <span className="icons">
        {this.getIconType()}
        <span className="more">
          <MdMoreHoriz />
        </span>
      </span>
    );

    return (
      <Popover
        mask
        visible={event.popoverVisible}
        overlay={[
          <Item key="remove" value="remove">
            <span>
              <MdClear /> Remove
            </span>
          </Item>,
          <Item key="edit" value="edit">
            <span>
              <MdCreate /> Edit
            </span>
          </Item>,
        ]}
        align={{ overflow: { adjustY: 0, adjustX: 0 }, offset: [-10, 0] }}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.remove}>
        <span>
          <small>{moment(event.createdAt).fromNow()}</small>
          {icons}
        </span>
      </Popover>
    );
  }

  remove = e => {
    if (e.key === "remove") {
      this.props
        .removeEvent(this.props.event)
        .then(() => this.props.getEvents());
    }
  };

  render() {
    const { event, currency } = this.props;
    const style = {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      marginRight: "8px",
    };

    return (
      <Card>
        <Card.Header
          title={<span>{event.createdBy.name}</span>}
          extra={this.getIcons()}
          thumb={event.createdBy.picture}
          thumbStyle={style}
        />
        <Card.Body>
          <div className="amount">
            {event.amount ? new Money(event.amount, currency).toString() : null}
          </div>
          <div>{event.message ? event.message : null}</div>
          <div>{event.requestedResident ? event.requestedResident : null}</div>
        </Card.Body>
      </Card>
    );
  }
}
