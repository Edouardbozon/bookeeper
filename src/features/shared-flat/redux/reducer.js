import { merge, clone } from 'ramda';
import initialState from './initialState';
import { reducer as getSharedFlatListReducer } from './getSharedFlatList';
import { SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS, SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS } from './constants';
import { reducer as makeJoinRequestReducer } from './makeJoinRequest';
import { reducer as searchReducer } from './search';
import { reducer as chooseFileReducer } from './chooseFile';
import { reducer as createSharedFlatReducer } from './createSharedFlat';


const reducers = [
  getSharedFlatListReducer,
  searchReducer,
  makeJoinRequestReducer,
  searchReducer,
  chooseFileReducer,
  createSharedFlatReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // eslint-disable-next-line
    case SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS:
      const list = action.data;
      const listCp = clone(list);
      newState = merge(state, { list, filteredList: listCp });
      break;
    case SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS:
      // @todo set hasSharedFlat user value to true
      break;
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
