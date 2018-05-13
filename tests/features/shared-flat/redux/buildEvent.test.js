import { expect } from 'chai';

import {
  SHARED_FLAT_BUILD_EVENT,
} from 'src/features/shared-flat/redux/constants';

import {
  buildEvent,
  reducer,
} from 'src/features/shared-flat/redux/buildEvent';

describe('shared-flat/redux/buildEvent', () => {
  it('returns correct action by buildEvent', () => {
    expect(buildEvent()).to.have.property('type', SHARED_FLAT_BUILD_EVENT);
  });

  it('handles action type SHARED_FLAT_BUILD_EVENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_BUILD_EVENT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
