import { filter, lensProp, set } from 'ramda';
import {
  SHARED_FLAT_SEARCH,
} from './constants';

export function search(query) {
  return {
    type: SHARED_FLAT_SEARCH,
    data: query
  };
}

export function reducer(state, action) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case SHARED_FLAT_SEARCH:
      const searchQuery = action.data;
      const byName = sharedFlat => sharedFlat.name.indexOf(searchQuery) > -1;
      const filteredList = filter(byName, state.list);

      const filteredListProp = lensProp('filteredList');
      const searchQueryProp = lensProp('searchQuery');

      const newState = set(filteredListProp, filteredList, state);
      return set(searchQueryProp, searchQuery, newState);

    default:
      return state;
  }
}
