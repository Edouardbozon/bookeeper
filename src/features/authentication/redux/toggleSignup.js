import { set, lensProp, prop } from 'ramda';

import {
  AUTHENTICATION_TOGGLE_SIGNUP,
} from './constants';

export function toggleSignup() {
  return {
    type: AUTHENTICATION_TOGGLE_SIGNUP,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_TOGGLE_SIGNUP:
      return set(lensProp('showLoginForm'), !prop('showLoginForm', state), state);

    default:
      return state;
  }
}
