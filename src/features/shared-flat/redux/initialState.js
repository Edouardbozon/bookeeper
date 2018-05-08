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
  activeTabIndex: 0, // Dashboard list tab
  list: undefined,
  filteredList: undefined,
  searchQuery: undefined,
  files: [],
  events: [],
  joinRequests: [],
  collection: null,
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
