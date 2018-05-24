import { path } from "ramda";
import axios from "axios";
import { api } from "../../../common/env";
import {
  SHARED_FLAT_REMOVE_EVENT_BEGIN,
  SHARED_FLAT_REMOVE_EVENT_SUCCESS,
  SHARED_FLAT_REMOVE_EVENT_FAILURE,
  SHARED_FLAT_REMOVE_EVENT_DISMISS_ERROR,
} from "./constants";

export function removeEvent(event) {
  return (dispatch, getState) => {
    dispatch({
      type: SHARED_FLAT_REMOVE_EVENT_BEGIN,
    });

    const state = getState();
    const id = path(["authentication", "user", "sharedFlatId"], state);
    const promise = new Promise((resolve, reject) => {
      axios
        .delete(`${api}api/shared-flat/${id}/event/${event._id}/delete`, {
          withCredentials: true,
        })
        .then(
          res => {
            dispatch({
              type: SHARED_FLAT_REMOVE_EVENT_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: SHARED_FLAT_REMOVE_EVENT_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissRemoveEventError() {
  return {
    type: SHARED_FLAT_REMOVE_EVENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_REMOVE_EVENT_BEGIN:
      return {
        ...state,
        removeEventPending: true,
        removeEventError: null,
      };

    case SHARED_FLAT_REMOVE_EVENT_SUCCESS:
      return {
        ...state,
        removeEventPending: false,
        removeEventError: null,
      };

    case SHARED_FLAT_REMOVE_EVENT_FAILURE:
      return {
        ...state,
        removeEventPending: false,
        removeEventError: action.data.error,
      };

    case SHARED_FLAT_REMOVE_EVENT_DISMISS_ERROR:
      return {
        ...state,
        removeEventError: null,
      };

    default:
      return state;
  }
}
