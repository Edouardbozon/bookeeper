import axios from 'axios';
import { api } from '../../../common/env';
import {
  SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR,
} from './constants';

export function getSharedFlatList() {
  return (dispatch) => {
    dispatch({
      type: SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.get(`${api}api/shared-flat`, { withCredentials: true }).then(
        (res) => {
          dispatch({
            type: SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS,
            data: res.data,
          });
          resolve(res.data);
        },
        (err) => {
          dispatch({
            type: SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetSharedFlatListError() {
  return {
    type: SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN:
      return {
        ...state,
        getSharedFlatListPending: true,
        getSharedFlatListError: null,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS:
      return {
        ...state,
        getSharedFlatListPending: false,
        getSharedFlatListError: null,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE:
      return {
        ...state,
        getSharedFlatListPending: false,
        getSharedFlatListError: action.data.error,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR:
      return {
        ...state,
        getSharedFlatListError: null,
      };

    default:
      return state;
  }
}
