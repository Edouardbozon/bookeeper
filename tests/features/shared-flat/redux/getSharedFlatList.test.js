import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE,
  SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  getSharedFlatList,
  dismissGetSharedFlatListError,
  reducer,
} from 'src/features/shared-flat/redux/getSharedFlatList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/getSharedFlatList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getSharedFlatList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getSharedFlatList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getSharedFlatList fails', () => {
    const store = mockStore({});

    return store.dispatch(getSharedFlatList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetSharedFlatListError', () => {
    const expectedAction = {
      type: SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR,
    };
    expect(dismissGetSharedFlatListError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN correctly', () => {
    const prevState = { getSharedFlatListPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_SHARED_FLAT_LIST_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSharedFlatListPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS correctly', () => {
    const prevState = { getSharedFlatListPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_SHARED_FLAT_LIST_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSharedFlatListPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE correctly', () => {
    const prevState = { getSharedFlatListPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_SHARED_FLAT_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSharedFlatListPending).to.be.false;
    expect(state.getSharedFlatListError).to.exist;
  });

  it('handles action type SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getSharedFlatListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_SHARED_FLAT_LIST_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSharedFlatListError).to.be.null;
  });
});
