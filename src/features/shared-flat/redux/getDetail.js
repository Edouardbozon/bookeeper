import axios from "axios";
import { path } from "ramda";
import { api } from "../../../common/env";
import {
  SHARED_FLAT_GET_DETAIL_BEGIN,
  SHARED_FLAT_GET_DETAIL_SUCCESS,
  SHARED_FLAT_GET_DETAIL_FAILURE,
  SHARED_FLAT_GET_DETAIL_DISMISS_ERROR,
} from "./constants";

export function getDetail() {
  return (dispatch, getState) => {
    dispatch({
      type: SHARED_FLAT_GET_DETAIL_BEGIN,
    });

    const sharedFlatId = path(
      ["authentication", "user", "sharedFlatId"],
      getState(),
    );
    const promise = new Promise((resolve, reject) => {
      axios
        .get(`${api}api/shared-flat/${sharedFlatId}`, { withCredentials: true })
        .then(
          res => {
            dispatch({
              type: SHARED_FLAT_GET_DETAIL_SUCCESS,
              data: res.data,
            });
            resolve(res);
          },
          err => {
            dispatch({
              type: SHARED_FLAT_GET_DETAIL_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissGetDetailError() {
  return {
    type: SHARED_FLAT_GET_DETAIL_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_GET_DETAIL_BEGIN:
      return {
        ...state,
        getDetailPending: true,
        getDetailError: null,
      };

    case SHARED_FLAT_GET_DETAIL_SUCCESS:
      return {
        ...state,
        getDetailPending: false,
        getDetailError: null,
        data: action.data,
      };

    case SHARED_FLAT_GET_DETAIL_FAILURE:
      return {
        ...state,
        getDetailPending: false,
        getDetailError: action.data.error,
      };

    case SHARED_FLAT_GET_DETAIL_DISMISS_ERROR:
      return {
        ...state,
        getDetailError: null,
      };

    default:
      return state;
  }
}
