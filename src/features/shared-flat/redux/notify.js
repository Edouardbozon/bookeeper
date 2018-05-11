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
    const id = path(["authentication", "user", "sharedFlatId"], getState());
    const promise = new Promise((resolve, reject) => {
      axios.get(`${api}api/shared-flat/${id}/notify`, { params: args }).then(
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
