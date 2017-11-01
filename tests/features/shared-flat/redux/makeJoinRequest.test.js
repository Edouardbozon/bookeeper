import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN,
  SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS,
  SHARED_FLAT_MAKE_JOIN_REQUEST_FAILURE,
  SHARED_FLAT_MAKE_JOIN_REQUEST_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  makeJoinRequest,
  dismissMakeJoinRequestError,
  reducer,
} from 'src/features/shared-flat/redux/makeJoinRequest';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/makeJoinRequest', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when makeJoinRequest succeeds', () => {
    const store = mockStore({});

    return store.dispatch(makeJoinRequest())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS);
      });
  });

  it('dispatches failure action when makeJoinRequest fails', () => {
    const store = mockStore({});

    return store.dispatch(makeJoinRequest({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_MAKE_JOIN_REQUEST_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissMakeJoinRequestError', () => {
    const expectedAction = {
      type: SHARED_FLAT_MAKE_JOIN_REQUEST_DISMISS_ERROR,
    };
    expect(dismissMakeJoinRequestError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN correctly', () => {
    const prevState = { makeJoinRequestPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_MAKE_JOIN_REQUEST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.makeJoinRequestPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS correctly', () => {
    const prevState = { makeJoinRequestPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_MAKE_JOIN_REQUEST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.makeJoinRequestPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_MAKE_JOIN_REQUEST_FAILURE correctly', () => {
    const prevState = { makeJoinRequestPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_MAKE_JOIN_REQUEST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.makeJoinRequestPending).to.be.false;
    expect(state.makeJoinRequestError).to.exist;
  });

  it('handles action type SHARED_FLAT_MAKE_JOIN_REQUEST_DISMISS_ERROR correctly', () => {
    const prevState = { makeJoinRequestError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_MAKE_JOIN_REQUEST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.makeJoinRequestError).to.be.null;
  });
});
