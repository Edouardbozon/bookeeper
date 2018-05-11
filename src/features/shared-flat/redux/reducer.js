import { merge, clone } from 'ramda';
import initialState from './initialState';
import { reducer as getSharedFlatListReducer } from './getSharedFlatList';
import { SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS, SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS } from './constants';
import { reducer as makeJoinRequestReducer } from './makeJoinRequest';
import { reducer as searchReducer } from './search';
import { reducer as chooseFileReducer } from './chooseFile';
import { reducer as createSharedFlatReducer } from './createSharedFlat';
import { reducer as getDetailReducer } from './getDetail';
import { reducer as getEventsReducer } from './getEvents';
import { reducer as getJoinRequestsReducer } from './getJoinRequests';
import { reducer as toggleTabReducer } from './toggleTab';
import { reducer as notifyReducer } from './notify';


const reducers = [
  getSharedFlatListReducer,
  searchReducer,
  makeJoinRequestReducer,
  searchReducer,
  chooseFileReducer,
  createSharedFlatReducer,
  getDetailReducer,
  getEventsReducer,
  getJoinRequestsReducer,
  toggleTabReducer,
  notifyReducer,
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
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
