import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN,
  SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS,
  SHARED_FLAT_CREATE_SHARED_FLAT_FAILURE,
  SHARED_FLAT_CREATE_SHARED_FLAT_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  createSharedFlat,
  dismissCreateSharedFlatError,
  reducer,
} from 'src/features/shared-flat/redux/createSharedFlat';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/createSharedFlat', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createSharedFlat succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createSharedFlat())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS);
      });
  });

  it('dispatches failure action when createSharedFlat fails', () => {
    const store = mockStore({});

    return store.dispatch(createSharedFlat({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_CREATE_SHARED_FLAT_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissCreateSharedFlatError', () => {
    const expectedAction = {
      type: SHARED_FLAT_CREATE_SHARED_FLAT_DISMISS_ERROR,
    };
    expect(dismissCreateSharedFlatError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN correctly', () => {
    const prevState = { createSharedFlatPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_CREATE_SHARED_FLAT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSharedFlatPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS correctly', () => {
    const prevState = { createSharedFlatPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_CREATE_SHARED_FLAT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSharedFlatPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_CREATE_SHARED_FLAT_FAILURE correctly', () => {
    const prevState = { createSharedFlatPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_CREATE_SHARED_FLAT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSharedFlatPending).to.be.false;
    expect(state.createSharedFlatError).to.exist;
  });

  it('handles action type SHARED_FLAT_CREATE_SHARED_FLAT_DISMISS_ERROR correctly', () => {
    const prevState = { createSharedFlatError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_CREATE_SHARED_FLAT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.createSharedFlatError).to.be.null;
  });
});
