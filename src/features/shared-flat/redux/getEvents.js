import axios from 'axios';
import { path } from 'ramda';
import { api } from '../../../common/env';
import {
  SHARED_FLAT_GET_EVENTS_BEGIN,
  SHARED_FLAT_GET_EVENTS_SUCCESS,
  SHARED_FLAT_GET_EVENTS_FAILURE,
  SHARED_FLAT_GET_EVENTS_DISMISS_ERROR,
} from './constants';

export function getEvents() {
  return (dispatch, getState) => {
    dispatch({
      type: SHARED_FLAT_GET_EVENTS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const sharedFlatId = path(['authentication', 'user', 'sharedFlatId'], getState());
      axios.get(`${api}api/shared-flat/${sharedFlatId}/event`, { withCredentials: true }).then(
        (res) => {
          dispatch({
            type: SHARED_FLAT_GET_EVENTS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SHARED_FLAT_GET_EVENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetEventsError() {
  return {
    type: SHARED_FLAT_GET_EVENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_GET_EVENTS_BEGIN:
      return {
        ...state,
        getEventsPending: true,
        getEventsError: null,
      };

    case SHARED_FLAT_GET_EVENTS_SUCCESS:
    console.log(action.data)
      return {
        ...state,
        getEventsPending: false,
        getEventsError: null,
        events: action.data.data,
      };

    case SHARED_FLAT_GET_EVENTS_FAILURE:
      return {
        ...state,
        getEventsPending: false,
        getEventsError: action.data.error,
      };

    case SHARED_FLAT_GET_EVENTS_DISMISS_ERROR:
      return {
        ...state,
        getEventsError: null,
      };

    default:
      return state;
  }
}
