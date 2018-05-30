import { expect } from 'chai';

import {
  SHARED_FLAT_CANCEL_DRAFT,
} from 'src/features/shared-flat/redux/constants';

import {
  cancelDraft,
  reducer,
} from 'src/features/shared-flat/redux/cancelDraft';

describe('shared-flat/redux/cancelDraft', () => {
  it('returns correct action by cancelDraft', () => {
    expect(cancelDraft()).to.have.property('type', SHARED_FLAT_CANCEL_DRAFT);
  });

  it('handles action type SHARED_FLAT_CANCEL_DRAFT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_CANCEL_DRAFT }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
