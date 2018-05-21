import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { WingBlank, WhiteSpace, Card } from "antd-mobile";
import { Event } from "./Event";

export default class Draft extends Component {
  static propTypes = { event: PropTypes.object.isRequired };

  constructor() {
    super();

    this.state = {
      type: "default",
    };
  }

  onRadioChange = e => {
    this.setState(state => ({
      ...state,
      type: e.target.value,
    }));
  };

  render() {
    const { event } = this.props;
    const { type } = this.state;

    return (
      <Card>
        {this.props.children}
        <Card.Body>
          <div className="type-radio">
            <span>
              <input
                name="type"
                type="radio"
                id="type-default"
                value="default"
                onChange={this.onRadioChange}
              />
              <label htmlFor="type-default">Default</label>
            </span>
            <span>
              <input
                name="type"
                type="radio"
                id="type-expense"
                value="expense"
                onChange={this.onRadioChange}
              />
              <label htmlFor="type-expense">Expense</label>
            </span>
            <span>
              <input
                name="type"
                type="radio"
                id="type-need"
                value="need"
                onChange={this.onRadioChange}
              />
              <label htmlFor="type-need">Need</label>
            </span>
          </div>
          <div>
            <WhiteSpace />
            <label htmlFor="message">Message</label>
            <input id="message" placeholder="A bought toilet paper" />
          </div>
          {type === "expense" ? (
            <div>
              <WhiteSpace />
              <label htmlFor="expense">Expense*</label>
              <input type="number" id="expense" required placeholder="30 €" />
            </div>
          ) : null}
          {type === "need" ? (
            <div>
              <WhiteSpace />
              <label htmlFor="requested">Requested</label>
              <select id="requested">
                <option>Resident 1</option>
                <option>Resident 2</option>
              </select>
            </div>
          ) : null}
        </Card.Body>
      </Card>
    );
  }
}
