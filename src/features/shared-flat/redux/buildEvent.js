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
      // eslint-disable-next-line no-underscore-dangle
      const sharedFlatId = state.data._id;
      const events = [
        ...state.events,
        {
          _id: new Date().getTime(),
          number: state.events.length + 1,
          sharedFlatId,
          createdAt: new Date(),
          published: false,
          message: null,
          createdBy: null, // <-- provided in the root reducer
          monthlyActivityAverage: 0,
          last: true,
          type: "event",
        },
      ].map((event, i) =>
        set(lensProp("last"), i === state.events.length)(event),
      );

      return set(lensProp("events"), events)(state);
    }

    default:
      return state;
  }
}
