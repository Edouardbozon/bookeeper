import { set, lensProp, prop } from 'ramda';

import {
  LOGIN_TOGGLE_SIGNUP,
} from './constants';

export function toggleSignup() {
  return {
    type: LOGIN_TOGGLE_SIGNUP,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN_TOGGLE_SIGNUP:
      return set(lensProp('showLoginForm'), !prop('showLoginForm', state), state);

    default:
      return state;
  }
}
