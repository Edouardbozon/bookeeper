import { set, lensProp } from 'ramda';
import initialState from './initialState';
import { reducer as loginReducer } from './login';
import { reducer as logoutReducer } from './logout';
import { reducer as toggleSignupReducer } from './toggleSignup';
import { reducer as signupReducer } from './signup';

import {
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_SIGNUP_SUCCESS,
} from './constants';
import { reducer as setTokenReducer } from './setToken';
import { reducer as discardTokenReducer } from './discardToken';
import { reducer as showErrorReducer } from './showError';

const reducers = [
  loginReducer,
  logoutReducer,
  toggleSignupReducer,
  signupReducer,
  setTokenReducer,
  discardTokenReducer,
  showErrorReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case AUTHENTICATION_LOGIN_SUCCESS:
    case AUTHENTICATION_SIGNUP_SUCCESS:
      newState = set(lensProp('user'), action.data.data, state);
      break;

    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
