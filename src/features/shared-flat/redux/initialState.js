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
  events: [],
  joinRequests: [],
  collection: null,
  getDetailPending: false,
  getDetailError: null,
  getEventsPending: false,
  getEventsError: null,
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
  getJoinRequestsPending: false,
  getJoinRequestsError: null,
};

export default initialState;
