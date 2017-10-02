import {
  SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getSharedFlatList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a sample which resolves promise in 20ms. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      const doRequest = new Promise((resolve2, reject2) => setTimeout(() => (args.error ? reject2('error') : resolve2('success')), 20));
      doRequest.then(
        (res) => {
          dispatch({
            type: SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetSharedFlatListError() {
  return {
    type: SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getSharedFlatListPending: true,
        getSharedFlatListError: null,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        getSharedFlatListPending: false,
        getSharedFlatListError: null,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getSharedFlatListPending: false,
        getSharedFlatListError: action.data.error,
      };

    case SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getSharedFlatListError: null,
      };

    default:
      return state;
  }
}