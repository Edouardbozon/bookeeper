import React, { Component } from "react";
import MdMoreHoriz from "react-icons/lib/md/more-horiz";
import MdClear from "react-icons/lib/md/clear";
import moment from "moment";
import { Card, Radio } from "antd-mobile";
import PropTypes from "prop-types";

export default class Draft extends Component {
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
            <span>by me</span>
            <small>{moment(event.createdAt).fromNow()}</small>
          </section>
          <section>
            <div>
              <label htmlFor="type">Type</label>
              <Radio
                className="my-radio"
                onChange={e => console.log("checkbox", e)}>
                Default
              </Radio>
              <Radio
                className="my-radio"
                onChange={e => console.log("checkbox", e)}>
                Expense
              </Radio>
              <Radio
                className="my-radio"
                onChange={e => console.log("checkbox", e)}>
                Need
              </Radio>
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <input id="message" placeholder="A bought toilet paper" />
            </div>
          </section>
        </Card.Body>
      </Card>
    );
  }
}
