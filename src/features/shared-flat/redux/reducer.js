import initialState from './initialState';
import { reducer as getSharedFlatListReducer } from './getSharedFlatList';
import { SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS } from './constants';

const reducers = [
  getSharedFlatListReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS:
      newState = Object.assign(state, { list: action.data });
      break;
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
