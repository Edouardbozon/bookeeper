import axios from "axios";
import { path } from "ramda";
import { api } from "../../../common/env";
import {
  SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN,
  SHARED_FLAT_GET_JOIN_REQUESTS_SUCCESS,
  SHARED_FLAT_GET_JOIN_REQUESTS_FAILURE,
  SHARED_FLAT_GET_JOIN_REQUESTS_DISMISS_ERROR,
} from "./constants";

export function getJoinRequests(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN,
    });

    const sharedFlatId = path(
      ["authentication", "user", "sharedFlatId"],
      getState(),
    );

    const promise = new Promise((resolve, reject) => {
      axios
        .get(`${api}api/shared-flat/${sharedFlatId}/join`, {
          withCredentials: true,
        })
        .then(
          res => {
            dispatch({
              type: SHARED_FLAT_GET_JOIN_REQUESTS_SUCCESS,
              data: res.data,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: SHARED_FLAT_GET_JOIN_REQUESTS_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissGetJoinRequestsError() {
  return {
    type: SHARED_FLAT_GET_JOIN_REQUESTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN:
      return {
        ...state,
        getJoinRequestsPending: true,
        getJoinRequestsError: null,
      };

    case SHARED_FLAT_GET_JOIN_REQUESTS_SUCCESS:
      return {
        ...state,
        joinRequests: action.data,
        getJoinRequestsPending: false,
        getJoinRequestsError: null,
      };

    case SHARED_FLAT_GET_JOIN_REQUESTS_FAILURE:
      return {
        ...state,
        getJoinRequestsPending: false,
        getJoinRequestsError: action.data.error,
      };

    case SHARED_FLAT_GET_JOIN_REQUESTS_DISMISS_ERROR:
      return {
        ...state,
        getJoinRequestsError: null,
      };

    default:
      return state;
  }
}
