import {
  SHARED_FLAT_CANCEL_DRAFT,
} from './constants';

export function cancelDraft() {
  return {
    type: SHARED_FLAT_CANCEL_DRAFT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_CANCEL_DRAFT:
      return {
        ...state,
        draftMode: false,
      };

    default:
      return state;
  }
}
