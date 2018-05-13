import axios from "axios";
import { path } from "ramda";
import { api } from "../../../common/env";
import { getEvents } from "./getEvents";
import {
  SHARED_FLAT_NOTIFY_BEGIN,
  SHARED_FLAT_NOTIFY_SUCCESS,
  SHARED_FLAT_NOTIFY_FAILURE,
  SHARED_FLAT_NOTIFY_DISMISS_ERROR,
} from "./constants";

export function notify(
  args = {
    type: "event",
    message: null,
  },
) {
  return (dispatch, getState) => {
    dispatch({ type: SHARED_FLAT_NOTIFY_BEGIN });
    const state = getState();
    const id = path(["authentication", "user", "sharedFlatId"], state);
    const builtEvent = state.sharedFlat.events[state.length - 1];
    const promise = new Promise((resolve, reject) => {
      axios
        .post(`${api}api/shared-flat/${id}/notify`, builtEvent, {
          params: args,
          withCredentials: true,
        })
        .then(
          res => {
            dispatch({ type: SHARED_FLAT_NOTIFY_SUCCESS });
            resolve(res);

            return getEvents();
          },
          err => {
            dispatch({
              type: SHARED_FLAT_NOTIFY_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissNotifyError() {
  return {
    type: SHARED_FLAT_NOTIFY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_NOTIFY_BEGIN:
      return {
        ...state,
        notifyPending: true,
        notifyError: null,
      };

    case SHARED_FLAT_NOTIFY_SUCCESS:
      return {
        ...state,
        draftMode: true, // Show draft editor on success
        notifyPending: false,
        notifyError: null,
      };

    case SHARED_FLAT_NOTIFY_FAILURE:
      return {
        ...state,
        notifyPending: false,
        notifyError: action.data.error,
      };

    case SHARED_FLAT_NOTIFY_DISMISS_ERROR:
      return {
        ...state,
        notifyError: null,
      };

    default:
      return state;
  }
}
