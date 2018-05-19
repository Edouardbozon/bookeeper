import { set, lensProp } from "ramda";
import { SHARED_FLAT_BUILD_EVENT } from "./constants";

export function buildEvent() {
  return {
    type: SHARED_FLAT_BUILD_EVENT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_BUILD_EVENT: {
      const number = state.events.length > 0 ? state.events.length : 0;
      // eslint-disable-next-line no-underscore-dangle
      const sharedFlatId = state.data._id;
      const events = [
        ...state.events,
        {
          _id: new Date().getTime(),
          number,
          sharedFlatId,
          createdAt: new Date(),
          message: null,
          createdBy: null, // <-- provided in the root reducer
          monthlyActivityAverage: 0,
          last: true,
          type: "event",
        },
      ];

      return set(lensProp("events"), events)(state);
    }

    default:
      return state;
  }
}
