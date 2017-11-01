import axios from 'axios';
import { api } from '../../../common/env';
import { setToken } from './actions';
import {
  AUTHENTICATION_SIGNUP_BEGIN,
  AUTHENTICATION_SIGNUP_SUCCESS,
  AUTHENTICATION_SIGNUP_FAILURE,
  AUTHENTICATION_SIGNUP_DISMISS_ERROR,
} from './constants';

export function signup(credentials) {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATION_SIGNUP_BEGIN,
    });

    dispatch(setToken(credentials));
    const promise = new Promise((resolve, reject) => {
      axios.post(`${api}signup`, credentials, { withCredentials: true }).then(
        (res) => {
          dispatch({
            type: AUTHENTICATION_SIGNUP_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTHENTICATION_SIGNUP_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissSignupError() {
  return {
    type: AUTHENTICATION_SIGNUP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_SIGNUP_BEGIN:
      return {
        ...state,
        signupPending: true,
        signupError: null,
      };

    case AUTHENTICATION_SIGNUP_SUCCESS:
      return {
        ...state,
        signupPending: false,
        signupError: null,
      };
    // eslint-disable-next-line no-case-declarations
    case AUTHENTICATION_SIGNUP_FAILURE:
      let error = action.data.error.response.data;
      if (typeof error === 'object') {
        error = Object.values(error)[0];
        error = Object.values(error)[1];
      }

      return {
        ...state,
        signupPending: false,
        signupError: error,
      };

    case AUTHENTICATION_SIGNUP_DISMISS_ERROR:
      return {
        ...state,
        signupError: null,
      };

    default:
      return state;
  }
}
