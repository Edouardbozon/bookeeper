import {
  AUTHENTICATION_SET_TOKEN,
} from './constants';

export function setToken(credentials) {
  const { email, password } = credentials;
  const token = window.btoa(`${email}:${password}`);
  window.localStorage.setItem('token', token);

  return {
    type: AUTHENTICATION_SET_TOKEN,
    data: token
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATION_SET_TOKEN:
      return {
        token: action.data,
        ...state
      };

    default:
      return state;
  }
}
