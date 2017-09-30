import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import commonReducer from '../features/common/redux/reducer';
import loginReducer from '../features/login/redux/reducer';
import profileReducer from '../features/profile/redux/reducer';
import sharedFlatReducer from '../features/shared-flat/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage theme.

const reducerMap = {
  router: routerReducer,
  common: commonReducer,
  login: loginReducer,
  profile: profileReducer,
  sharedFlat: sharedFlatReducer,
};

export default combineReducers(reducerMap);
