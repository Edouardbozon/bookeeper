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
  getDetailPending: false,
  getDetailError: null,
};

export default initialState;
