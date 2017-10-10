import axios from 'axios';
import {
  AUTHENTICATION_DISCARD_TOKEN,
} from './constants';

export function discardToken() {
  window.localStorage.removeItem('token');
  delete axios.defaults.common.Authorization;

  return {
    type: AUTHENTICATION_DISCARD_TOKEN,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_DISCARD_TOKEN:
      return {
        token: undefined,
        ...state,
      };

    default:
      return state;
  }
}
