import { merge } from 'ramda';
import initialState from './initialState';
import { reducer as loginReducer } from './login';
import { reducer as logoutReducer } from './logout';
import { reducer as toggleSignupReducer } from './toggleSignup';
import { reducer as signupReducer } from './signup';

import {
  LOGIN_LOGIN_SUCCESS,
  LOGIN_SIGNUP_SUCCESS,
} from './constants';

const reducers = [
  loginReducer,
  logoutReducer,
  toggleSignupReducer,
  signupReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOGIN_LOGIN_SUCCESS:
    case LOGIN_SIGNUP_SUCCESS:
      newState = merge(action.data.data, state);
      break;

    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
