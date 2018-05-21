import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_PUBLISH_DRAFT_BEGIN,
  SHARED_FLAT_PUBLISH_DRAFT_SUCCESS,
  SHARED_FLAT_PUBLISH_DRAFT_FAILURE,
  SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  publishDraft,
  dismissPublishDraftError,
  reducer,
} from 'src/features/shared-flat/redux/publishDraft';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/publishDraft', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when publishDraft succeeds', () => {
    const store = mockStore({});

    return store.dispatch(publishDraft())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_PUBLISH_DRAFT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_PUBLISH_DRAFT_SUCCESS);
      });
  });

  it('dispatches failure action when publishDraft fails', () => {
    const store = mockStore({});

    return store.dispatch(publishDraft({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_PUBLISH_DRAFT_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_PUBLISH_DRAFT_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissPublishDraftError', () => {
    const expectedAction = {
      type: SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR,
    };
    expect(dismissPublishDraftError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_PUBLISH_DRAFT_BEGIN correctly', () => {
    const prevState = { publishDraftPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_PUBLISH_DRAFT_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.publishDraftPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_PUBLISH_DRAFT_SUCCESS correctly', () => {
    const prevState = { publishDraftPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_PUBLISH_DRAFT_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.publishDraftPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_PUBLISH_DRAFT_FAILURE correctly', () => {
    const prevState = { publishDraftPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_PUBLISH_DRAFT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.publishDraftPending).to.be.false;
    expect(state.publishDraftError).to.exist;
  });

  it('handles action type SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR correctly', () => {
    const prevState = { publishDraftError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_PUBLISH_DRAFT_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.publishDraftError).to.be.null;
  });
});
