import axios from 'axios';
import { api } from '../../../common/env';
import {
  LOGIN_SIGNUP_BEGIN,
  LOGIN_SIGNUP_SUCCESS,
  LOGIN_SIGNUP_FAILURE,
  LOGIN_SIGNUP_DISMISS_ERROR,
} from './constants';

export function signup(formData = {}) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_SIGNUP_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      axios.post(`${api}signup`, formData).then(
        (res) => {
          dispatch({
            type: LOGIN_SIGNUP_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: LOGIN_SIGNUP_FAILURE,
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
export function dismissSignupError() {
  return {
    type: LOGIN_SIGNUP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN_SIGNUP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signupPending: true,
        signupError: null,
      };

    case LOGIN_SIGNUP_SUCCESS:
      // The request is success
      return {
        ...state,
        signupPending: false,
        signupError: null,
      };

    case LOGIN_SIGNUP_FAILURE:
      // The request is failed
      return {
        ...state,
        signupPending: false,
        signupError: action.data.error,
      };

    case LOGIN_SIGNUP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signupError: null,
      };

    default:
      return state;
  }
}
