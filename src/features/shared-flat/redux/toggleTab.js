import { SHARED_FLAT_TOGGLE_TAB } from "./constants";

export function toggleTab(index) {
  return {
    type: SHARED_FLAT_TOGGLE_TAB,
    data: index,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_TOGGLE_TAB:
      return {
        ...state,
        activeTabIndex: action.data,
      };

    default:
      return state;
  }
}
