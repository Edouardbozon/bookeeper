import { expect } from 'chai';

import {
  AUTHENTICATION_DISCARD_TOKEN,
} from 'src/features/authentication/redux/constants';

import {
  discardToken,
  reducer,
} from 'src/features/authentication/redux/discardToken';

describe('authentication/redux/discardToken', () => {
  it('returns correct action by discardToken', () => {
    expect(discardToken()).to.have.property('type', AUTHENTICATION_DISCARD_TOKEN);
  });

  it('handles action type AUTHENTICATION_DISCARD_TOKEN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_DISCARD_TOKEN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
