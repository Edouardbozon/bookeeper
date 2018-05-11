import {
  SHARED_FLAT_NOTIFY_BEGIN,
  SHARED_FLAT_NOTIFY_SUCCESS,
  SHARED_FLAT_NOTIFY_FAILURE,
  SHARED_FLAT_NOTIFY_DISMISS_ERROR,
} from './constants';

export function notify(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: SHARED_FLAT_NOTIFY_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: SHARED_FLAT_NOTIFY_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: SHARED_FLAT_NOTIFY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissNotifyError() {
  return {
    type: SHARED_FLAT_NOTIFY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_NOTIFY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        notifyPending: true,
        notifyError: null,
      };

    case SHARED_FLAT_NOTIFY_SUCCESS:
      // The request is success
      return {
        ...state,
        notifyPending: false,
        notifyError: null,
      };

    case SHARED_FLAT_NOTIFY_FAILURE:
      // The request is failed
      return {
        ...state,
        notifyPending: false,
        notifyError: action.data.error,
      };

    case SHARED_FLAT_NOTIFY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        notifyError: null,
      };

    default:
      return state;
  }
}
