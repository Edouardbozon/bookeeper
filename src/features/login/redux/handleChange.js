import { set, lensProp, prop } from 'ramda';
import {
  LOGIN_HANDLE_CHANGE,
} from './constants';

export function handleChange(payload) {
  return {
    type: LOGIN_HANDLE_CHANGE,
    payload
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LOGIN_HANDLE_CHANGE:
      if (!state.payload) {
        return state;
      }

      return set(
        lensProp(action.payload.prop), prop(action.payload.prop, action.payload.value),
        state
      );

    default:
      return state;
  }
}
