import { expect } from 'chai';

import {
  SHARED_FLAT_TOGGLE_TAB,
} from 'src/features/shared-flat/redux/constants';

import {
  toggleTab,
  reducer,
} from 'src/features/shared-flat/redux/toggleTab';

describe('shared-flat/redux/toggleTab', () => {
  it('returns correct action by toggleTab', () => {
    expect(toggleTab()).to.have.property('type', SHARED_FLAT_TOGGLE_TAB);
  });

  it('handles action type SHARED_FLAT_TOGGLE_TAB correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_TOGGLE_TAB }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
