import { expect } from 'chai';

import {
  LOGIN_HANDLE_CHANGE,
} from 'src/features/login/redux/constants';

import {
  handleChange,
  reducer,
} from 'src/features/login/redux/handleChange';

describe('login/redux/handleChange', () => {
  it('returns correct action by handleChange', () => {
    expect(handleChange()).to.have.property('type', LOGIN_HANDLE_CHANGE);
  });

  it('handles action type LOGIN_HANDLE_CHANGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOGIN_HANDLE_CHANGE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
