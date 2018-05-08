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
  list: undefined, // Complete list of joinable Shared Flat
  filteredList: undefined, // Filtered list of joinable Shared Flat
  activeTabIndex: 0, // Dashboard list tab
  data: null, // Shared flat details
  searchQuery: undefined,
  files: [],
  events: [], // Shared flat event list
  joinRequests: [], // Join requests list
  // actions displayed in the notify action tab
  actions: [
    {
      title: "create event",
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png",
    },
    {
      title: "create need event",
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png",
    },
    {
      title: "create expense event",
      img:
        "https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png",
    },
  ],
};

export default initialState;
