import { combineReducers } from 'redux';
import { assocPath, compose } from 'ramda';
import { routerReducer } from 'react-router-redux';
import commonReducer from '../features/common/redux/reducer';
import authenticationReducer from '../features/authentication/redux/reducer';
import sharedFlatReducer from '../features/shared-flat/redux/reducer';
import {
  SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS,
  SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS
} from '../features/shared-flat/redux/constants';
import {AUTHENTICATION_LOGIN_SUCCESS, AUTHENTICATION_SIGNUP_SUCCESS} from "../features/authentication/redux/constants";

const reducerMap = {
  router: routerReducer,
  common: commonReducer,
  authentication: authenticationReducer,
  sharedFlat: sharedFlatReducer,
};

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}

export default reduceReducers(
  combineReducers(reducerMap),
  // here `state` is the whole state tree
  (state, action) => {
    switch (action.type) {
      case AUTHENTICATION_LOGIN_SUCCESS:
      case AUTHENTICATION_SIGNUP_SUCCESS:
        return assocPath(['authentication', 'authenticated'], true, state);
      case SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS:
        return compose(
          assocPath(['authentication', 'user', 'hasSharedFlat'], true),
          assocPath(['authentication', 'user', 'sharedFlatId'], action.data._id),
        )(state);
      case SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS:
        return assocPath(['authentication', 'user', 'joinRequestPending'], true, state);
      default:
        return state;
    }
  }
);
