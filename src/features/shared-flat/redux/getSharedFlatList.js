import axios from 'axios';
import { api } from '../../../common/env';
import {
  SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR,
} from './constants';

export function getSharedFlatList(filters) {
  return (dispatch) => {
    dispatch({
      type: SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.get(`${api}api/shared-flat`, filters).then(
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
      // Just after a request is sent
      return {
        ...state,
        getSharedFlatListPending: true,
        getSharedFlatListError: null,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        getSharedFlatListPending: false,
        getSharedFlatListError: null,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getSharedFlatListPending: false,
        getSharedFlatListError: action.data.error,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getSharedFlatListError: null,
      };

    default:
      return state;
  }
}
