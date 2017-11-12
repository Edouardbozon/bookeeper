const initialState = {
  getSharedFlatListPending: false,
  getSharedFlatListError: null,
  makeJoinRequestPending: false,
  makeJoinRequestError: null,
  createSharedFlatPending: false,
  createSharedFlatError: null,
  list: undefined,
  filteredList: undefined,
  searchQuery: undefined,
  files: [],
  collection: null,
  events: [],
  getDetailPending: false,
  getDetailError: null,
  getEventsPending: false,
  getEventsError: null,
};

export default initialState;
