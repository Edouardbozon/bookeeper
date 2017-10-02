import { expect } from 'chai';

import {
  AUTHENTICATION_TOGGLE_SIGNUP,
} from 'src/features/authentication/redux/constants';

import {
  toggleSignup,
  reducer,
} from 'src/features/authentication/redux/toggleSignup';

describe('authentication/redux/toggleSignup', () => {
  it('returns correct action by toggleSignup', () => {
    expect(toggleSignup()).to.have.property('type', AUTHENTICATION_TOGGLE_SIGNUP);
  });

  it('handles action type LOGIN_TOGGLE_SIGNUP correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_TOGGLE_SIGNUP }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
