import React, { Component } from "react";
import PropTypes from "prop-types";
import { WhiteSpace, Card, Button } from "antd-mobile";

export default class Draft extends Component {
  static propTypes = {
    publishDraft: PropTypes.func.isRequired,
    getEvents: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    residents: PropTypes.array.isRequired,
  };

  constructor() {
    super();

    this.state = { type: "default" };
  }

  onTypeChange = e => {
    this.setState({ type: e.currentTarget.value || "default" });
  };

  onMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  onExpenseChange = e => {
    this.setState({ amount: e.target.value });
  };

  onRequestedChange = e => {
    this.setState({ requestedResident: e.target.value });
  };

  publishDraft() {
    const { type, message, amount, requestedResident } = this.state;
    const draft = {
      ...this.props.event,
      type,
      amount,
      message,
      requestedResident,
      published: true,
    };

    this.props.publishDraft(draft).then(() => this.props.getEvents());
  }

  renderResidents() {
    return this.props.residents
      ? this.props.residents.map(resident => (
          <option key={resident._id}>{resident.name}</option>
        ))
      : "Chargment...";
  }

  render() {
    const { type } = this.state;

    return (
      <div>
        <Card>
          {this.props.children}
          <Card.Body>
            <form name="event-draft">
              <div className="type-radio">
                <span>
                  <input
                    name="type"
                    type="radio"
                    id="type-default"
                    value="event"
                    checked={type === "event"}
                    onChange={this.onTypeChange}
                  />
                  <label htmlFor="type-default">Default</label>
                </span>
                <span>
                  <input
                    name="type"
                    type="radio"
                    id="type-expense"
                    value="expense"
                    checked={type === "expense"}
                    onChange={this.onTypeChange}
                  />
                  <label htmlFor="type-expense">Expense</label>
                </span>
                <span>
                  <input
                    name="type"
                    type="radio"
                    id="type-need"
                    value="need"
                    checked={type === "need"}
                    onChange={this.onTypeChange}
                  />
                  <label htmlFor="type-need">Need</label>
                </span>
              </div>
              <div>
                <WhiteSpace />
                <label htmlFor="message">Message</label>
                <input
                  id="message"
                  placeholder="Ex: I bought toilet paper"
                  onChange={this.onMessageChange}
                />
              </div>
              {type === "expense" ? (
                <div>
                  <WhiteSpace />
                  <label htmlFor="expense">Expense*</label>
                  <input
                    type="number"
                    id="expense"
                    required
                    placeholder="30.00"
                    onChange={this.onExpenseChange}
                  />
                </div>
              ) : null}
              {type === "need" ? (
                <div>
                  <WhiteSpace />
                  <label htmlFor="requested">Requested*</label>
                  <select id="requested" onChange={this.onRequestedChange}>
                    {this.renderResidents()}
                  </select>
                </div>
              ) : null}
            </form>
            <div>
              {type === "default" ? null : (
                <small className="required">*required</small>
              )}
            </div>
            <WhiteSpace />
            <div>
              <Button
                className="publish"
                size="sm"
                inline="false"
                type="primary"
                onClick={() => {
                  this.publishDraft();
                }}>
                Publish
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
