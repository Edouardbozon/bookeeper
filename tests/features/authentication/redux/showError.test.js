import { expect } from 'chai';

import {
  AUTHENTICATION_SHOW_ERROR,
} from 'src/features/authentication/redux/constants';

import {
  showError,
  reducer,
} from 'src/features/authentication/redux/showError';

describe('authentication/redux/showError', () => {
  it('returns correct action by showError', () => {
    expect(showError()).to.have.property('type', AUTHENTICATION_SHOW_ERROR);
  });

  it('handles action type AUTHENTICATION_SHOW_ERROR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AUTHENTICATION_SHOW_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
