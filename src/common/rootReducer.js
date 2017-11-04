import { combineReducers } from 'redux';
import { assocPath } from 'ramda';
import { routerReducer } from 'react-router-redux';
import commonReducer from '../features/common/redux/reducer';
import authenticationReducer from '../features/authentication/redux/reducer';
import sharedFlatReducer from '../features/shared-flat/redux/reducer';
import { SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS } from '../features/shared-flat/redux/constants';

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
      case SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS:
        return assocPath(['authentication', 'user', 'hasSharedFlat'], true, state);
      default:
        return state;
    }
  }
);
