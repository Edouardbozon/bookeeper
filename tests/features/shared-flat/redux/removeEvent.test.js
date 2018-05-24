import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_REMOVE_EVENT_BEGIN,
  SHARED_FLAT_REMOVE_EVENT_SUCCESS,
  SHARED_FLAT_REMOVE_EVENT_FAILURE,
  SHARED_FLAT_REMOVE_EVENT_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  removeEvent,
  dismissRemoveEventError,
  reducer,
} from 'src/features/shared-flat/redux/removeEvent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/removeEvent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when removeEvent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(removeEvent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_REMOVE_EVENT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_REMOVE_EVENT_SUCCESS);
      });
  });

  it('dispatches failure action when removeEvent fails', () => {
    const store = mockStore({});

    return store.dispatch(removeEvent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_REMOVE_EVENT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_REMOVE_EVENT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRemoveEventError', () => {
    const expectedAction = {
      type: SHARED_FLAT_REMOVE_EVENT_DISMISS_ERROR,
    };
    expect(dismissRemoveEventError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_REMOVE_EVENT_BEGIN correctly', () => {
    const prevState = { removeEventPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_REMOVE_EVENT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.removeEventPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_REMOVE_EVENT_SUCCESS correctly', () => {
    const prevState = { removeEventPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_REMOVE_EVENT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.removeEventPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_REMOVE_EVENT_FAILURE correctly', () => {
    const prevState = { removeEventPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_REMOVE_EVENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.removeEventPending).to.be.false;
    expect(state.removeEventError).to.exist;
  });

  it('handles action type SHARED_FLAT_REMOVE_EVENT_DISMISS_ERROR correctly', () => {
    const prevState = { removeEventError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_REMOVE_EVENT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.removeEventError).to.be.null;
  });
});
