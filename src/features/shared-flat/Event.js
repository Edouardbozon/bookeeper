import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import MdMoreHoriz from "react-icons/lib/md/more-horiz";
import MdClear from "react-icons/lib/md/clear";
import { Card, Popover } from "antd-mobile";

const Item = Popover.Item;

export default class Event extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    removeEvent: PropTypes.func.isRequired,
    getEvent: PropTypes.func.isRequired,
  };

  remove = e => {
    if (e.key === "remove") {
      this.props
        .removeEvent(this.props.event)
        .then(() => this.props.getEvents());
    }
  };

  render() {
    const { event } = this.props;

    return (
      <Card>
        <Card.Body>
          <header className="event-header">
            <div>
              <img
                src={event.createdBy.picture}
                alt={`${event.createdBy.name} event`}
              />
            </div>
            <div>
              <div>
                <Popover
                  mask
                  visible={event.popoverVisible}
                  overlay={[
                    <Item key="remove" value="remove">
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
                  onSelect={this.remove}>
                  <MdMoreHoriz />
                </Popover>
              </div>
              <span>
                by <strong>{event.createdBy.name}</strong>
              </span>
              <br />
              <small>
                {moment(event.createdAt).fromNow()} - n {event.number}
              </small>
            </div>
          </header>
          {event.message ? <section>{event.message}</section> : null}
        </Card.Body>
      </Card>
    );
  }
}
