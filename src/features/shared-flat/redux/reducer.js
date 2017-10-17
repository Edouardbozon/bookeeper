import { merge, clone } from 'ramda';
import initialState from './initialState';
import { reducer as getSharedFlatListReducer } from './getSharedFlatList';
import { SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS } from './constants';
import { reducer as searchReducer } from './search';
import { reducer as makeJoinRequestReducer } from './makeJoinRequest';
import { reducer as searchReducer } from './search';


const reducers = [
  getSharedFlatListReducer,
  searchReducer,
  makeJoinRequestReducer,
  searchReducer,
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
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
