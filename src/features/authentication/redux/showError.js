import { Toast } from 'antd-mobile';
import {
  AUTHENTICATION_SHOW_ERROR,
} from './constants';

export function showError(error) {
  if (typeof error !== 'string') {
    error = error.error.message;
  }

  Toast.fail(error);
  return {
    type: AUTHENTICATION_SHOW_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_SHOW_ERROR:
      return {
        ...state,
        loginError: null,
        signupError: null,
      };

    default:
      return state;
  }
}
