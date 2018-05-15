import React, { Component } from "react";
import PropTypes from "prop-types";
import MdMoreHoriz from "react-icons/lib/md/more-horiz";
import MdClear from "react-icons/lib/md/clear";
import moment from "moment";
import { Card, Popover } from "antd-mobile";

const Item = Popover.Item;

export default class Event extends Component {
  static propTypes = { event: PropTypes.object.isRequired };

  render() {
    const { event } = this.props;
    return (
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
    );
  }
}
