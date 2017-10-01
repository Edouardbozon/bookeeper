import axios from 'axios';
import { api } from '../../../common/env';
import {
  AUTHENTICATION_LOGIN_BEGIN,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGIN_FAILURE,
  AUTHENTICATION_LOGIN_DISMISS_ERROR,
} from './constants';

export function login(credentials = {}) {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATION_LOGIN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      axios.post(`${api}login`, credentials).then(
        (res) => {
          dispatch({
            type: AUTHENTICATION_LOGIN_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTHENTICATION_LOGIN_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoginError() {
  return {
    type: AUTHENTICATION_LOGIN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_LOGIN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loginPending: true,
        loginError: null,
      };

    case AUTHENTICATION_LOGIN_SUCCESS:
      // The request is success
      return {
        ...state,
        loginPending: false,
        loginError: null,
      };

    case AUTHENTICATION_LOGIN_FAILURE:
      // The request is failed
      return {
        ...state,
        loginPending: false,
        loginError: action.data.error,
      };

    case AUTHENTICATION_LOGIN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loginError: null,
      };

    default:
      return state;
  }
}
