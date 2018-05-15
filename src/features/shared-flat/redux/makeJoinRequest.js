import axios from "axios";
import { api } from "../../../common/env";
import {
  SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN,
  SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS,
  SHARED_FLAT_MAKE_JOIN_REQUEST_FAILURE,
  SHARED_FLAT_MAKE_JOIN_REQUEST_DISMISS_ERROR,
} from "./constants";

export function makeJoinRequest(id) {
  return dispatch => {
    dispatch({
      type: SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios
        .post(`${api}api/shared-flat/${id}/join`, null, {
          withCredentials: true,
        })
        .then(
          res => {
            dispatch({
              type: SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: SHARED_FLAT_MAKE_JOIN_REQUEST_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissMakeJoinRequestError() {
  return {
    type: SHARED_FLAT_MAKE_JOIN_REQUEST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN:
      return {
        ...state,
        makeJoinRequestPending: true,
        makeJoinRequestError: null,
      };

    case SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS:
      return {
        ...state,
        makeJoinRequestPending: false,
        makeJoinRequestError: null,
      };

    case SHARED_FLAT_MAKE_JOIN_REQUEST_FAILURE:
      return {
        ...state,
        makeJoinRequestPending: false,
        makeJoinRequestError: action.data.error,
      };

    case SHARED_FLAT_MAKE_JOIN_REQUEST_DISMISS_ERROR:
      return {
        ...state,
        makeJoinRequestError: null,
      };

    default:
      return state;
  }
}
