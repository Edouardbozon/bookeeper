import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SHARED_FLAT_GET_EVENTS_BEGIN,
  SHARED_FLAT_GET_EVENTS_SUCCESS,
  SHARED_FLAT_GET_EVENTS_FAILURE,
  SHARED_FLAT_GET_EVENTS_DISMISS_ERROR,
} from 'src/features/shared-flat/redux/constants';

import {
  getEvents,
  dismissGetEventsError,
  reducer,
} from 'src/features/shared-flat/redux/getEvents';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('shared-flat/redux/getEvents', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getEvents succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getEvents())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_EVENTS_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_EVENTS_SUCCESS);
      });
  });

  it('dispatches failure action when getEvents fails', () => {
    const store = mockStore({});

    return store.dispatch(getEvents({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SHARED_FLAT_GET_EVENTS_BEGIN);
        expect(actions[1]).to.have.property('type', SHARED_FLAT_GET_EVENTS_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetEventsError', () => {
    const expectedAction = {
      type: SHARED_FLAT_GET_EVENTS_DISMISS_ERROR,
    };
    expect(dismissGetEventsError()).to.deep.equal(expectedAction);
  });

  it('handles action type SHARED_FLAT_GET_EVENTS_BEGIN correctly', () => {
    const prevState = { getEventsPending: false };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_EVENTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getEventsPending).to.be.true;
  });

  it('handles action type SHARED_FLAT_GET_EVENTS_SUCCESS correctly', () => {
    const prevState = { getEventsPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_EVENTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getEventsPending).to.be.false;
  });

  it('handles action type SHARED_FLAT_GET_EVENTS_FAILURE correctly', () => {
    const prevState = { getEventsPending: true };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_EVENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getEventsPending).to.be.false;
    expect(state.getEventsError).to.exist;
  });

  it('handles action type SHARED_FLAT_GET_EVENTS_DISMISS_ERROR correctly', () => {
    const prevState = { getEventsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_GET_EVENTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getEventsError).to.be.null;
  });
});
