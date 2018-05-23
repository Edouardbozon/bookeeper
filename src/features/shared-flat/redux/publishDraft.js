import axios from "axios";
import { api } from "../../../common/env";
import { path } from "ramda";
import {
  SHARED_FLAT_PUBLISH_DRAFT_BEGIN,
  SHARED_FLAT_PUBLISH_DRAFT_SUCCESS,
  SHARED_FLAT_PUBLISH_DRAFT_FAILURE,
  SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR,
} from "./constants";

export function publishDraft(draft) {
  return (dispatch, getState) => {
    dispatch({
      type: SHARED_FLAT_PUBLISH_DRAFT_BEGIN,
    });
    const state = getState();
    const id = path(["authentication", "user", "sharedFlatId"], state);
    const promise = new Promise((resolve, reject) => {
      axios
        .post(`${api}api/shared-flat/${id}/event/${draft._id}/publish`, draft, {
          withCredentials: true,
        })
        .then(
          res => {
            dispatch({
              type: SHARED_FLAT_PUBLISH_DRAFT_SUCCESS,
              data: res.data,
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
        draftMode: false, // Hide editor
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
