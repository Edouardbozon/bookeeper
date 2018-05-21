import {
  SHARED_FLAT_PUBLISH_DRAFT_BEGIN,
  SHARED_FLAT_PUBLISH_DRAFT_SUCCESS,
  SHARED_FLAT_PUBLISH_DRAFT_FAILURE,
  SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR,
} from "./constants";

export function publishDraft(args = {}) {
  return dispatch => {
    dispatch({
      type: SHARED_FLAT_PUBLISH_DRAFT_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error
        ? Promise.reject(new Error())
        : Promise.resolve();
      doRequest.then(
        res => {
          dispatch({
            type: SHARED_FLAT_PUBLISH_DRAFT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: SHARED_FLAT_PUBLISH_DRAFT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissPublishDraftError() {
  return {
    type: SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_PUBLISH_DRAFT_BEGIN:
      return {
        ...state,
        publishDraftPending: true,
        publishDraftError: null,
      };

    case SHARED_FLAT_PUBLISH_DRAFT_SUCCESS:
      return {
        ...state,
        publishDraftPending: false,
        publishDraftError: null,
      };

    case SHARED_FLAT_PUBLISH_DRAFT_FAILURE:
      return {
        ...state,
        publishDraftPending: false,
        publishDraftError: action.data.error,
      };

    case SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR:
      return {
        ...state,
        publishDraftError: null,
      };

    default:
      return state;
  }
}
