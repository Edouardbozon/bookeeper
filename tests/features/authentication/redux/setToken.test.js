import { expect } from 'chai';

import {
  AUTHENTICATION_SET_TOKEN,
} from 'src/features/authentication/redux/constants';

import {
  setToken,
  reducer,
} from 'src/features/authentication/redux/setToken';

describe('authentication/redux/setToken', () => {
  it('returns correct action by setToken', () => {
    expect(setToken()).to.have.property('type', AUTHENTICATION_SET_TOKEN);
  });

  it('handles action type AUTHENTICATION_SET_TOKEN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_SET_TOKEN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
