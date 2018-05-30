const initialState = {
  // Async requests status
  getSharedFlatListPending: false,
  getSharedFlatListError: null,
  makeJoinRequestPending: false,
  makeJoinRequestError: null,
  createSharedFlatPending: false,
  createSharedFlatError: null,
  getDetailPending: false,
  getDetailError: null,
  getEventsPending: false,
  getEventsError: null,
  getJoinRequestsPending: false,
  getJoinRequestsError: null,
  draftMode: false, // Toggle the event draft mode in the view
  list: undefined, // Complete list of joinable Shared Flat
  filteredList: undefined, // Filtered list of joinable Shared Flat
  activeTabIndex: 0, // Dashboard list tab
  data: null, // Shared flat details
  searchQuery: undefined, // search query in shared flat list
  files: [], // files uploaded for create shared flat page
  events: [], // Shared flat event list
  joinRequests: [], // Join requests list
  postDraftPending: false,
  postDraftError: null,
  publishDraftPending: false,
  publishDraftError: null,
  removeEventPending: false,
  removeEventError: null,
  currency: "EUR",
};

export default initialState;
