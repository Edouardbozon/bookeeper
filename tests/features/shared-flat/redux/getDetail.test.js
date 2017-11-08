import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_GET_DETAIL_BEGIN,
  SHARED_FLAT_GET_DETAIL_SUCCESS,
  SHARED_FLAT_GET_DETAIL_FAILURE,
  SHARED_FLAT_GET_DETAIL_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  getDetail,
  dismissGetDetailError,
  reducer,
} from 'src/features/shared-flat/redux/getDetail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/getDetail', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getDetail succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getDetail())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_DETAIL_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_DETAIL_SUCCESS);
      });
  });

  it('dispatches failure action when getDetail fails', () => {
    const store = mockStore({});

    return store.dispatch(getDetail({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_DETAIL_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_DETAIL_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetDetailError', () => {
    const expectedAction = {
      type: SHARED_FLAT_GET_DETAIL_DISMISS_ERROR,
    };
    expect(dismissGetDetailError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_GET_DETAIL_BEGIN correctly', () => {
    const prevState = { getDetailPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_DETAIL_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getDetailPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_GET_DETAIL_SUCCESS correctly', () => {
    const prevState = { getDetailPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_DETAIL_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getDetailPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_GET_DETAIL_FAILURE correctly', () => {
    const prevState = { getDetailPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_DETAIL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getDetailPending).to.be.false;
    expect(state.getDetailError).to.exist;
  });

  it('handles action type SHARED_FLAT_GET_DETAIL_DISMISS_ERROR correctly', () => {
    const prevState = { getDetailError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_DETAIL_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getDetailError).to.be.null;
  });
});
