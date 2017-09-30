import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  SIGNUP_SIGNUP_BEGIN,
  SIGNUP_SIGNUP_SUCCESS,
  SIGNUP_SIGNUP_FAILURE,
  SIGNUP_SIGNUP_DISMISS_ERROR,
} from 'src/features/signup/redux/constants';

import {
  signup,
  dismissSignupError,
  reducer,
} from 'src/features/signup/redux/signup';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('signup/redux/signup', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when signup succeeds', () => {
    const store = mockStore({});

    return store.dispatch(signup())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SIGNUP_SIGNUP_BEGIN);
        expect(actions[1]).to.have.property('type', SIGNUP_SIGNUP_SUCCESS);
      });
  });

  it('dispatches failure action when signup fails', () => {
    const store = mockStore({});

    return store.dispatch(signup({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', SIGNUP_SIGNUP_BEGIN);
        expect(actions[1]).to.have.property('type', SIGNUP_SIGNUP_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSignupError', () => {
    const expectedAction = {
      type: SIGNUP_SIGNUP_DISMISS_ERROR,
    };
    expect(dismissSignupError()).to.deep.equal(expectedAction);
  });

  it('handles action type SIGNUP_SIGNUP_BEGIN correctly', () => {
    const prevState = { signupPending: false };
    const state = reducer(
      prevState,
      { type: SIGNUP_SIGNUP_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signupPending).to.be.true;
  });

  it('handles action type SIGNUP_SIGNUP_SUCCESS correctly', () => {
    const prevState = { signupPending: true };
    const state = reducer(
      prevState,
      { type: SIGNUP_SIGNUP_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signupPending).to.be.false;
  });

  it('handles action type SIGNUP_SIGNUP_FAILURE correctly', () => {
    const prevState = { signupPending: true };
    const state = reducer(
      prevState,
      { type: SIGNUP_SIGNUP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signupPending).to.be.false;
    expect(state.signupError).to.exist;
  });

  it('handles action type SIGNUP_SIGNUP_DISMISS_ERROR correctly', () => {
    const prevState = { signupError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SIGNUP_SIGNUP_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signupError).to.be.null;
  });
});
