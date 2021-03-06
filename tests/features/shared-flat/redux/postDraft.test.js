import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_POST_DRAFT_BEGIN,
  SHARED_FLAT_POST_DRAFT_SUCCESS,
  SHARED_FLAT_POST_DRAFT_FAILURE,
  SHARED_FLAT_POST_DRAFT_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  postDraft,
  dismissPostDraftError,
  reducer,
} from 'src/features/shared-flat/redux/postDraft';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/postDraft', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when postDraft succeeds', () => {
    const store = mockStore({});

    return store.dispatch(postDraft())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_POST_DRAFT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_POST_DRAFT_SUCCESS);
      });
  });

  it('dispatches failure action when postDraft fails', () => {
    const store = mockStore({});

    return store.dispatch(postDraft({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_POST_DRAFT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_POST_DRAFT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissPostDraftError', () => {
    const expectedAction = {
      type: SHARED_FLAT_POST_DRAFT_DISMISS_ERROR,
    };
    expect(dismissPostDraftError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_POST_DRAFT_BEGIN correctly', () => {
    const prevState = { notifyPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_POST_DRAFT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.notifyPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_POST_DRAFT_SUCCESS correctly', () => {
    const prevState = { notifyPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_POST_DRAFT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.notifyPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_POST_DRAFT_FAILURE correctly', () => {
    const prevState = { notifyPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_POST_DRAFT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.notifyPending).to.be.false;
    expect(state.notifyError).to.exist;
  });

  it('handles action type SHARED_FLAT_POST_DRAFT_DISMISS_ERROR correctly', () => {
    const prevState = { notifyError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_POST_DRAFT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.notifyError).to.be.null;
  });
});
