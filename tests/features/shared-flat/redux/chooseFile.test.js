import { expect } from 'chai';

import {
  SHARED_FLAT_CHOOSE_FILE,
} from 'src/features/shared-flat/redux/constants';

import {
  chooseFile,
  reducer,
} from 'src/features/shared-flat/redux/chooseFile';

describe('shared-flat/redux/chooseFile', () => {
  it('returns correct action by chooseFile', () => {
    expect(chooseFile()).to.have.property('type', SHARED_FLAT_CHOOSE_FILE);
  });

  it('handles action type SHARED_FLAT_CHOOSE_FILE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SHARED_FLAT_CHOOSE_FILE }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
