import { expect } from 'chai';

import {
  SHARED_FLAT_SEARCH,
} from 'src/features/shared-flat/redux/constants';

import {
  search,
  reducer,
} from 'src/features/shared-flat/redux/search';

describe('shared-flat/redux/search', () => {
  it('returns correct action by search', () => {
    expect(search()).to.have.property('type', SHARED_FLAT_SEARCH);
  });

  it('handles action type SHARED_FLAT_SEARCH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_SEARCH }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
