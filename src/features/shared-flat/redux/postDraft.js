import axios from "axios";
import { path } from "ramda";
import { api } from "../../../common/env";
import { getEvents } from "./getEvents";
import {
  SHARED_FLAT_POST_DRAFT_BEGIN,
  SHARED_FLAT_POST_DRAFT_SUCCESS,
  SHARED_FLAT_POST_DRAFT_FAILURE,
  SHARED_FLAT_POST_DRAFT_DISMISS_ERROR,
} from "./constants";

export function postDraft(
  args = {
    type: "event",
    message: null,
  },
) {
  return (dispatch, getState) => {
    dispatch({ type: SHARED_FLAT_POST_DRAFT_BEGIN });
    const state = getState();
    const id = path(["authentication", "user", "sharedFlatId"], state);
    const builtEvent = state.sharedFlat.events[state.length - 1];
    const promise = new Promise((resolve, reject) => {
      axios
        .post(`${api}api/shared-flat/${id}/draft`, builtEvent, {
          params: args,
          withCredentials: true,
        })
        .then(
          res => {
            dispatch({ type: SHARED_FLAT_POST_DRAFT_SUCCESS });
            resolve(res);

            return getEvents();
          },
          err => {
            dispatch({
              type: SHARED_FLAT_POST_DRAFT_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
    });

    return promise;
  };
}

export function dismissPostDraftError() {
  return {
    type: SHARED_FLAT_POST_DRAFT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_POST_DRAFT_BEGIN:
      return {
        ...state,
        postDraftPending: true,
        postDraftError: null,
      };

    case SHARED_FLAT_POST_DRAFT_SUCCESS:
      return {
        ...state,
        draftMode: true, // Show draft editor on success
        postDraftPending: false,
        postDraftError: null,
      };

    case SHARED_FLAT_POST_DRAFT_FAILURE:
      return {
        ...state,
        postDraftPending: false,
        postDraftError: action.data.error,
      };

    case SHARED_FLAT_POST_DRAFT_DISMISS_ERROR:
      return {
        ...state,
        postDraftError: null,
      };

    default:
      return state;
  }
}
