import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN,
  SHARED_FLAT_GET_JOIN_REQUESTS_SUCCESS,
  SHARED_FLAT_GET_JOIN_REQUESTS_FAILURE,
  SHARED_FLAT_GET_JOIN_REQUESTS_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  getJoinRequests,
  dismissGetJoinRequestsError,
  reducer,
} from 'src/features/shared-flat/redux/getJoinRequests';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/getJoinRequests', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getJoinRequests succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getJoinRequests())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_JOIN_REQUESTS_SUCCESS);
      });
  });

  it('dispatches failure action when getJoinRequests fails', () => {
    const store = mockStore({});

    return store.dispatch(getJoinRequests({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_JOIN_REQUESTS_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetJoinRequestsError', () => {
    const expectedAction = {
      type: SHARED_FLAT_GET_JOIN_REQUESTS_DISMISS_ERROR,
    };
    expect(dismissGetJoinRequestsError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN correctly', () => {
    const prevState = { getJoinRequestsPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_JOIN_REQUESTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getJoinRequestsPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_GET_JOIN_REQUESTS_SUCCESS correctly', () => {
    const prevState = { getJoinRequestsPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_JOIN_REQUESTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getJoinRequestsPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_GET_JOIN_REQUESTS_FAILURE correctly', () => {
    const prevState = { getJoinRequestsPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_JOIN_REQUESTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getJoinRequestsPending).to.be.false;
    expect(state.getJoinRequestsError).to.exist;
  });

  it('handles action type SHARED_FLAT_GET_JOIN_REQUESTS_DISMISS_ERROR correctly', () => {
    const prevState = { getJoinRequestsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_JOIN_REQUESTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getJoinRequestsError).to.be.null;
  });
});
