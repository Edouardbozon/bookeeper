import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import MdMoreHoriz from "react-icons/lib/md/more-horiz";
import MdFiberNew from "react-icons/lib/md/fiber-new";
import MdAssistantPhoto from "react-icons/lib/md/assistant-photo";
import MdDetails from "react-icons/lib/md/details";
import MdClear from "react-icons/lib/md/clear";
import MdAttachMoney from "react-icons/lib/md/attach-money";
import { Card, Popover, WingBlank, WhiteSpace } from "antd-mobile";

const Item = Popover.Item;

export default class Event extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
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
      <span>
        <span className="new">
          <MdFiberNew />
        </span>
        {this.getIconType()}
        <span className="more">
          <MdMoreHoriz />
        </span>
      </span>
    ) : (
      <span>
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
        ]}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-10, 0],
        }}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.remove}>
        {icons}
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
    const { event } = this.props;
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
          <WhiteSpace />
          <section>{event.message ? <p>{event.message}</p> : null}</section>
        </Card.Body>
      </Card>
    );
  }
}

// <header className="event-header">
//   <div>
//     <img
//       src={event.createdBy.picture}
//       alt={`${event.createdBy.name} event`}
//     />
//   </div>
//   <div>
//     <div>
//       <Popover
//         mask
//         visible={event.popoverVisible}
//         overlay={[
//           <Item key="remove" value="remove">
//             <span>
//               <MdClear /> Remove
//                       </span>
//           </Item>,
//         ]}
//         align={{
//           overflow: { adjustY: 0, adjustX: 0 },
//           offset: [-10, 0],
//         }}
//         onVisibleChange={this.handleVisibleChange}
//         onSelect={this.remove}>
//         <MdMoreHoriz />
//       </Popover>
//     </div>
//     <span>n°&nbsp;{event.number}</span>
//     <br />
//     <small>{moment(event.createdAt).fromNow()}</small>
//   </div>
// </header>
