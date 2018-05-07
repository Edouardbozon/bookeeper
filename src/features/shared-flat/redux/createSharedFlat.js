import axios from "axios";
import { merge } from "ramda";
import { api } from "../../../common/env";
import {
  SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN,
  SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS,
  SHARED_FLAT_CREATE_SHARED_FLAT_FAILURE,
  SHARED_FLAT_CREATE_SHARED_FLAT_DISMISS_ERROR,
} from "./constants";

export function createSharedFlat(formData = {}) {
  return dispatch => {
    dispatch({
      type: SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios
        .post(`${api}api/shared-flat`, formData, { withCredentials: true })
        .then(
          res => {
            dispatch({
              type: SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS,
              data: res.data,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: SHARED_FLAT_CREATE_SHARED_FLAT_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissCreateSharedFlatError() {
  return {
    type: SHARED_FLAT_CREATE_SHARED_FLAT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN:
      return {
        ...state,
        createSharedFlatPending: true,
        createSharedFlatError: null,
      };

    case SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS:
      return merge(
        {
          createSharedFlatPending: false,
          createSharedFlatError: null,
          collection: action.data,
        },
        { ...state },
      );

    case SHARED_FLAT_CREATE_SHARED_FLAT_FAILURE:
      return {
        ...state,
        createSharedFlatPending: false,
        createSharedFlatError: action.data.error,
      };

    case SHARED_FLAT_CREATE_SHARED_FLAT_DISMISS_ERROR:
      return {
        ...state,
        createSharedFlatError: null,
      };

    default:
      return state;
  }
}
